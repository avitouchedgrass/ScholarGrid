import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Sparkles, RefreshCw, Eye, EyeOff } from 'lucide-react';

/**
 * WAYPOINTS: alternating RIGHT ↔ LEFT ↔ CENTER milestones.
 * 'right' and 'left' dock at the screen-edge gutter rails.
 * 'center' waypoints are mid-crossing recede points (tiny, far back)
 * so the cap shrinks away and re-emerges on the other side
 * without dragging visibly through content.
 */
const WAYPOINTS = [
  // 0. Hero — RIGHT, elevated, proud
  { progress: 0.00, side: 'right', y:  2.0, z: 0.80, rot: [0.28, -0.55, 0.08], scale: 1.00, mob: [ 0.0,  2.2, -0.2] },
  // 1. Hero cards — RIGHT, dips to peek
  { progress: 0.12, side: 'right', y:  0.55, z: 0.90, rot: [0.48, -0.38, 0.10], scale: 0.90, mob: [ 0.0,  1.9, -0.3] },
  // cross — recede far
  { progress: 0.20, side: 'cross', y:  0.20, z:-0.50, rot: [0.40,  0.0,  0.0],  scale: 0.28, mob: [ 0.0,  1.8, -0.6] },
  // 2. Match Simulator — LEFT, swoops low
  { progress: 0.30, side: 'left',  y: -0.55, z: 1.00, rot: [0.55,  0.50, 0.08], scale: 1.05, mob: [ 0.0,  1.7, -0.3] },
  // cross — recede far
  { progress: 0.38, side: 'cross', y:  0.40, z:-0.50, rot: [0.38,  0.0,  0.0],  scale: 0.28, mob: [ 0.0,  1.8, -0.6] },
  // 3. Benefits ticker — RIGHT, rises back up
  { progress: 0.46, side: 'right', y:  0.75, z: 0.75, rot: [0.22, -0.58,-0.08], scale: 0.90, mob: [ 0.0,  1.9, -0.35] },
  // cross — recede far
  { progress: 0.54, side: 'cross', y:  0.10, z:-0.50, rot: [0.32,  0.0,  0.0],  scale: 0.28, mob: [ 0.0,  1.8, -0.6] },
  // 4. Bento features — LEFT, mid-height inspection
  { progress: 0.62, side: 'left',  y: -0.20, z: 0.92, rot: [0.42,  0.30, 0.06], scale: 0.96, mob: [ 0.0,  1.65,-0.35] },
  // cross — recede far
  { progress: 0.69, side: 'cross', y: -0.40, z:-0.50, rot: [0.32,  0.0,  0.0],  scale: 0.28, mob: [ 0.0,  1.8, -0.6] },
  // 5. Essay Preview — RIGHT, dips close
  { progress: 0.77, side: 'right', y: -0.80, z: 1.10, rot: [0.60, -0.20, 0.04], scale: 1.08, mob: [ 0.0,  1.55,-0.20] },
  // cross — recede far
  { progress: 0.84, side: 'cross', y:  0.30, z:-0.50, rot: [0.28,  0.0,  0.0],  scale: 0.28, mob: [ 0.0,  1.8, -0.6] },
  // 6. Comparison/FAQ — LEFT, climbs back up
  { progress: 0.91, side: 'left',  y:  0.45, z: 0.72, rot: [0.24,  0.48,-0.06], scale: 0.92, mob: [ 0.0,  1.7, -0.35] },
  // 7. Final CTA — CENTER, celebration
  { progress: 1.00, side: 'center',y:  1.70, z: 1.20, rot: [0.18,  0.0,  0.0],  scale: 1.30, mob: [ 0.0,  2.0,  0.4] },
];

/**
 * Returns the signed world-space X position for a given side.
 * Uses 87% of the visible half-width so the cap sits comfortably
 * near the screen edge on any 16:9-ish display. Clamped against
 * the actual screen boundary so it never clips.
 */
function getSideX(side, aspect) {
  if (side === 'center' || side === 'cross') return 0.0;
  const halfW = Math.tan(THREE.MathUtils.degToRad(21)) * 8.5 * aspect;
  const rail = Math.min(halfW * 0.87, halfW - 0.78);
  return side === 'left' ? -rail : rail;
}

function interpolateWaypoints(progress, isMobile, aspect = 1.777) {
  const p = Math.max(0, Math.min(1, progress));
  let idx = 0;
  for (let i = 0; i < WAYPOINTS.length - 1; i++) {
    if (p >= WAYPOINTS[i].progress && p <= WAYPOINTS[i + 1].progress) {
      idx = i;
      break;
    }
  }

  const w0 = WAYPOINTS[idx];
  const w1 = WAYPOINTS[idx + 1] || w0;
  const range = (w1.progress - w0.progress) || 1;
  const rawU = (p - w0.progress) / range;
  // Smooth cubic ease-in-out
  const u = rawU * rawU * (3 - 2 * rawU);

  if (isMobile) {
    return {
      x: w0.mob[0] + (w1.mob[0] - w0.mob[0]) * u,
      y: w0.mob[1] + (w1.mob[1] - w0.mob[1]) * u,
      z: w0.mob[2] + (w1.mob[2] - w0.mob[2]) * u,
      rotX: w0.rot[0] + (w1.rot[0] - w0.rot[0]) * u,
      rotY: w0.rot[1] + (w1.rot[1] - w0.rot[1]) * u,
      rotZ: w0.rot[2] + (w1.rot[2] - w0.rot[2]) * u,
      scale: w0.scale + (w1.scale - w0.scale) * u
    };
  }

  const x0 = getSideX(w0.side, aspect);
  const x1 = getSideX(w1.side, aspect);

  return {
    x: x0 + (x1 - x0) * u,
    y: w0.y + (w1.y - w0.y) * u,
    z: w0.z + (w1.z - w0.z) * u,
    rotX: w0.rot[0] + (w1.rot[0] - w0.rot[0]) * u,
    rotY: w0.rot[1] + (w1.rot[1] - w0.rot[1]) * u,
    rotZ: w0.rot[2] + (w1.rot[2] - w0.rot[2]) * u,
    scale: w0.scale + (w1.scale - w0.scale) * u
  };
}

export default function VoxelCapGuide({ theme }) {
  const canvasRef = useRef(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hasTossed, setHasTossed] = useState(false);

  const tossTriggerRef = useRef(null);
  const lightsRef = useRef({ ambient: null, key: null, fill: null, rim: null, particleMat: null });

  const triggerToss = useCallback(() => {
    if (tossTriggerRef.current) {
      tossTriggerRef.current();
      setHasTossed(true);
    }
  }, []);

  // Dynamic lighting update on theme switch without reloading model
  useEffect(() => {
    const { ambient, key, fill, rim, particleMat } = lightsRef.current;
    if (ambient) {
      ambient.color.setHex(theme === 'dark' ? 0x24324a : 0xf8fafc);
      ambient.intensity = theme === 'dark' ? 1.0 : 1.6;
    }
    if (key) {
      key.color.setHex(theme === 'dark' ? 0xdbeafe : 0xfffbeb);
      key.intensity = theme === 'dark' ? 2.6 : 3.2;
    }
    if (fill) {
      fill.color.setHex(theme === 'dark' ? 0x60a5fa : 0xfde68a);
      fill.intensity = theme === 'dark' ? 1.4 : 1.8;
    }
    if (rim) {
      rim.color.setHex(theme === 'dark' ? 0x818cf8 : 0xf59e0b);
      rim.intensity = theme === 'dark' ? 3.4 : 2.4;
    }
    if (particleMat) {
      particleMat.color.setHex(theme === 'dark' ? 0x38bdf8 : 0xf59e0b);
    }
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animationFrameId;
    let isDestroyed = false;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 8.5);

    // 2. High-Performance Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    // 3. Dynamic Lighting Rig
    const ambientLight = new THREE.AmbientLight(
      theme === 'dark' ? 0x24324a : 0xf8fafc,
      theme === 'dark' ? 1.0 : 1.6
    );
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(
      theme === 'dark' ? 0xdbeafe : 0xfffbeb,
      theme === 'dark' ? 2.6 : 3.2
    );
    keyLight.position.set(4, 6, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(
      theme === 'dark' ? 0x60a5fa : 0xfde68a,
      theme === 'dark' ? 1.4 : 1.8
    );
    fillLight.position.set(-4, 3, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(
      theme === 'dark' ? 0x818cf8 : 0xf59e0b,
      theme === 'dark' ? 3.4 : 2.4
    );
    rimLight.position.set(-3, -2, -3);
    scene.add(rimLight);

    // 4. Model Root Group
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    let capMesh = null;

    // 5. Subtle Academic Voxel Particle Aura
    const PARTICLE_COUNT = 24;
    const particleGeometry = new THREE.BoxGeometry(0.032, 0.032, 0.032);
    const particleMaterial = new THREE.MeshStandardMaterial({
      color: theme === 'dark' ? 0x38bdf8 : 0xf59e0b,
      roughness: 0.4,
      metalness: 0.2
    });
    const particles = new THREE.InstancedMesh(
      particleGeometry,
      particleMaterial,
      PARTICLE_COUNT
    );
    particles.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(particles);

    lightsRef.current = {
      ambient: ambientLight,
      key: keyLight,
      fill: fillLight,
      rim: rimLight,
      particleMat: particleMaterial
    };

    const particleData = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      orbitRadius: 0.42 + (i % 5) * 0.14,
      angle: (i / PARTICLE_COUNT) * Math.PI * 2,
      speed: 0.35 + (i % 4) * 0.15,
      verticalPhase: i * 0.4,
      bobSpeed: 0.7 + (i % 3) * 0.3,
      scale: 0.45 + (i % 3) * 0.2
    }));

    const dummyMatrix = new THREE.Matrix4();
    const dummyPos = new THREE.Vector3();
    const dummyScale = new THREE.Vector3();
    const dummyQuat = new THREE.Quaternion();

    // 6. GLTF Model Loading
    const loader = new GLTFLoader();
    loader.load(
      '/models/voxel_cap.glb',
      (gltf) => {
        if (isDestroyed) return;

        const sceneModel = gltf.scene;

        const box = new THREE.Box3().setFromObject(sceneModel);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        sceneModel.position.sub(center);

        const maxDim = Math.max(size.x, size.y, size.z) || 1;
        const scaleFactor = 1.7 / maxDim;
        sceneModel.scale.set(scaleFactor, scaleFactor, scaleFactor);

        sceneModel.traverse((child) => {
          if (child.isMesh) {
            capMesh = child;
            if (child.material) {
              if (child.material.map) {
                child.material.map.magFilter = THREE.NearestFilter;
                child.material.map.minFilter = THREE.NearestMipmapLinearFilter;
                child.material.map.needsUpdate = true;
              }
              child.material.roughness = 0.55;
              child.material.metalness = 0.15;
            }
          }
        });

        modelGroup.add(sceneModel);
        setIsLoaded(true);
      },
      (xhr) => {
        if (xhr.lengthComputable) {
          const pct = Math.round((xhr.loaded / xhr.total) * 100);
          setLoadProgress(pct);
        }
      },
      () => {
        setLoadError(true);
      }
    );

    // 7. Interactive Physics & Toss State
    const tossState = {
      active: false,
      progress: 0,
      duration: 1.5
    };

    tossTriggerRef.current = () => {
      tossState.active = true;
      tossState.progress = 0;
    };

    // 8. Motion & Mouse Tracking
    let targetScroll = 0;
    let currentScroll = 0;
    let scrollVelocity = 0;
    let mouseX = 0;
    let mouseY = 0;
    let smoothMouseX = 0;
    let smoothMouseY = 0;
    let isMobile = window.innerWidth < 1024;

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      targetScroll = docHeight > 0 ? Math.max(0, Math.min(1, scrollY / docHeight)) : 0;
    };

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;

      if (capMesh && camera) {
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), camera);
        const hits = raycaster.intersectObject(capMesh, true);
        setIsHovered(hits.length > 0);
      }
    };

    const handlePointerDown = () => {
      if (isHovered) {
        triggerToss();
      }
    };

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      isMobile = width < 1024;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('resize', handleResize);

    handleScroll();

    // 9. Smooth Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      if (isDestroyed) return;

      const delta = Math.min(0.05, clock.getDelta());
      const time = clock.getElapsedTime();

      // Responsive, jitter-free exponential scroll tracking.
      // 5.5 = noticeably tracks scroll while staying smooth (not twitchy)
      const scrollLerp = 1 - Math.exp(-5.5 * delta);
      currentScroll += (targetScroll - currentScroll) * scrollLerp;

      // Velocity for aerodynamic attitude effects
      const rawVelTarget = (targetScroll - currentScroll) * 6.0;
      const velLerp = 1 - Math.exp(-8.0 * delta);
      scrollVelocity += (rawVelTarget - scrollVelocity) * velLerp;
      const clampedVelocity = Math.max(-1.8, Math.min(1.8, scrollVelocity));

      // Calm mouse parallax gaze
      smoothMouseX += (mouseX - smoothMouseX) * (1 - Math.exp(-4.0 * delta));
      smoothMouseY += (mouseY - smoothMouseY) * (1 - Math.exp(-4.0 * delta));

      // Waypoint base transform located exclusively in the unobstructed right gutter rail
      const wp = interpolateWaypoints(currentScroll, isMobile, camera.aspect);

      // Subtle aerodynamic attitude: nose-down when scrolling down, nose-up when up
      const aeroPitch = clampedVelocity * 0.14;
      const bankAngle = -clampedVelocity * 0.09;

      // Alive breathing motion — slightly larger so it reads as floating
      const bobY = Math.sin(time * 1.4) * 0.06 + Math.cos(time * 0.7) * 0.03;
      const bobRotX = Math.cos(time * 1.1) * 0.025;
      const bobRotZ = Math.sin(time * 0.9) * 0.02;

      // Final CTA celebratory celebration
      let ctaSpinY = 0;
      let ctaFlipX = 0;
      if (currentScroll > 0.94) {
        const ctaProgress = (currentScroll - 0.94) / 0.06;
        ctaSpinY = ctaProgress * Math.PI * 4;
        ctaFlipX = Math.sin(ctaProgress * Math.PI) * 0.6;
      }

      // User-triggered celebratory toss physics
      let tossY = 0;
      let tossRotY = 0;
      let tossRotX = 0;

      if (tossState.active) {
        tossState.progress += delta / tossState.duration;
        if (tossState.progress >= 1) {
          tossState.active = false;
          tossState.progress = 1;
        }

        const tp = tossState.progress;
        tossY = Math.sin(tp * Math.PI) * 1.8;
        tossRotY = tp * Math.PI * 4;
        tossRotX = Math.sin(tp * Math.PI) * 0.6;
      }

      // Apply coordinates: ALWAYS in clear view, never hiding behind cards
      modelGroup.position.set(
        wp.x,
        wp.y + bobY + tossY,
        wp.z
      );

      modelGroup.rotation.set(
        wp.rotX + aeroPitch + smoothMouseY * 0.12 + ctaFlipX + tossRotX + bobRotX,
        wp.rotY + smoothMouseX * 0.18 + ctaSpinY + tossRotY,
        wp.rotZ + bankAngle + bobRotZ
      );

      const targetScale = wp.scale * (1 + (tossState.active ? Math.sin(tossState.progress * Math.PI) * 0.15 : 0));
      modelGroup.scale.set(targetScale, targetScale, targetScale);

      // Subtle particle aura
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = particleData[i];
        const currentAngle = p.angle + time * p.speed;
        const rad = p.orbitRadius;

        dummyPos.set(
          modelGroup.position.x + Math.cos(currentAngle) * rad,
          modelGroup.position.y + Math.sin(time * p.bobSpeed + p.verticalPhase) * 0.3,
          modelGroup.position.z + Math.sin(currentAngle) * rad * 0.6
        );

        dummyQuat.setFromEuler(
          new THREE.Euler(time * p.speed * 1.5, currentAngle, time)
        );

        const s = p.scale * (wp.scale / 0.86) * (tossState.active ? 1.4 : 1.0);
        dummyScale.set(s, s, s);

        dummyMatrix.compose(dummyPos, dummyQuat, dummyScale);
        particles.setMatrixAt(i, dummyMatrix);
      }
      particles.instanceMatrix.needsUpdate = true;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      isDestroyed = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('resize', handleResize);

      if (capMesh && capMesh.geometry) {
        capMesh.geometry.dispose();
      }
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  if (loadError) {
    return null;
  }

  return (
    <>
      {/* 3D WebGL Canvas Layer - Always visible in the clear right gutter corridor */}
      <div
        className={`fixed inset-0 pointer-events-none z-10 transition-opacity duration-700 ${
          isLoaded && isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      >
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* Floating Interactive Guide Pill / Controls */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2 pointer-events-auto">
        {!isLoaded && (
          <div className="px-3 py-1.5 arch-panel bg-[var(--surface-bg)] text-[var(--text-secondary)] font-mono text-xs flex items-center gap-2 shadow-lg animate-pulse">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-ping" />
            <span>Loading 3D Guide ({loadProgress}%)</span>
          </div>
        )}

        {isLoaded && isVisible && (
          <div className="flex items-center gap-1.5 arch-panel bg-[var(--surface-bg)]/95 backdrop-blur-md px-3 py-1.5 border border-[var(--border)] shadow-xl transition-all">
            <button
              type="button"
              onClick={triggerToss}
              className="flex items-center gap-1.5 text-xs font-mono text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors"
              title="Celebrate: Toss graduation cap!"
            >
              <Sparkles className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
              <span className="font-semibold">Toss Cap</span>
            </button>

            <span className="text-[var(--border)]">|</span>

            <button
              type="button"
              onClick={() => setIsVisible(false)}
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] p-1 transition-colors"
              title="Hide 3D Guide"
              aria-label="Hide 3D Guide"
            >
              <EyeOff className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {isLoaded && !isVisible && (
          <button
            type="button"
            onClick={() => setIsVisible(true)}
            className="arch-panel bg-[var(--surface-bg)]/90 backdrop-blur-md p-2.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)] shadow-lg transition-colors"
            title="Show 3D Voxel Guide"
            aria-label="Show 3D Voxel Guide"
          >
            <Eye className="w-4 h-4 text-[var(--accent-primary)]" />
          </button>
        )}
      </div>

      {/* Cursor tooltip when hovering directly over the cap */}
      {isHovered && isVisible && (
        <div className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-8 px-2.5 py-1 bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--text-primary)] font-mono text-[10px] tracking-wider rounded-sm shadow-md">
          Click to toss 🎓
        </div>
      )}
    </>
  );
}
