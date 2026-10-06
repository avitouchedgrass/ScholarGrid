import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Module-level GLTF promise cache to avoid re-downloading or re-parsing the 15MB GLB model
let sharedModelPromise = null;

function loadSharedVoxelCap() {
  if (!sharedModelPromise) {
    const loader = new GLTFLoader();
    sharedModelPromise = new Promise((resolve, reject) => {
      loader.load(
        '/models/voxel_cap.glb',
        (gltf) => resolve(gltf),
        undefined,
        (err) => {
          sharedModelPromise = null;
          reject(err);
        }
      );
    });
  }
  return sharedModelPromise;
}

export default function VoxelCapLogo({ className = "w-full h-full", theme = "dark", interactive = true }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const isHoveredRef = useRef(false);
  const spinBoostRef = useRef(0);
  const lightsRef = useRef({ ambient: null, key: null, fill: null, rim: null });

  // Update lighting dynamically when theme changes
  useEffect(() => {
    const { ambient, key, fill, rim } = lightsRef.current;
    if (ambient) {
      ambient.color.setHex(theme === 'dark' ? 0x2e3c54 : 0xf1f5f9);
      ambient.intensity = theme === 'dark' ? 1.4 : 2.0;
    }
    if (key) {
      key.color.setHex(theme === 'dark' ? 0xbfdbfe : 0xffedd5);
      key.intensity = theme === 'dark' ? 3.5 : 3.8;
    }
    if (fill) {
      fill.color.setHex(theme === 'dark' ? 0x60a5fa : 0xfde68a);
      fill.intensity = theme === 'dark' ? 1.8 : 2.2;
    }
    if (rim) {
      rim.color.setHex(theme === 'dark' ? 0xa855f7 : 0xf59e0b);
      rim.intensity = theme === 'dark' ? 3.8 : 2.8;
    }
  }, [theme]);

  const handlePointerEnter = () => {
    if (interactive) isHoveredRef.current = true;
  };

  const handlePointerLeave = () => {
    if (interactive) isHoveredRef.current = false;
  };

  const handleClick = () => {
    if (interactive) spinBoostRef.current += Math.PI * 2;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let animationFrameId;
    let isDestroyed = false;

    const initialW = container.clientWidth || 56;
    const initialH = container.clientHeight || 56;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, initialW / initialH, 0.1, 50);
    camera.position.set(0, 0.28, 3.8);
    camera.lookAt(0, 0, 0);

    // 2. High-Performance Micro WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(initialW, initialH, false);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // 3. Dynamic Lighting Rig
    const ambientLight = new THREE.AmbientLight(
      theme === 'dark' ? 0x2e3c54 : 0xf1f5f9,
      theme === 'dark' ? 1.4 : 2.0
    );
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(
      theme === 'dark' ? 0xbfdbfe : 0xffedd5,
      theme === 'dark' ? 3.5 : 3.8
    );
    keyLight.position.set(3, 5, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(
      theme === 'dark' ? 0x60a5fa : 0xfde68a,
      theme === 'dark' ? 1.8 : 2.2
    );
    fillLight.position.set(-3, 2, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(
      theme === 'dark' ? 0xa855f7 : 0xf59e0b,
      theme === 'dark' ? 3.8 : 2.8
    );
    rimLight.position.set(-2, -2, -3);
    scene.add(rimLight);

    lightsRef.current = {
      ambient: ambientLight,
      key: keyLight,
      fill: fillLight,
      rim: rimLight
    };

    // 4. Model Pivot Hierarchy
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    let clonedMeshList = [];

    // 5. Load Shared 3D GLTF Model & Clone Instance
    loadSharedVoxelCap()
      .then((gltf) => {
        if (isDestroyed) return;

        // Clone hierarchy so transformations and material tweaks don't mutate shared asset
        const sceneModel = gltf.scene.clone(true);

        const box = new THREE.Box3().setFromObject(sceneModel);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        // Exact origin centering
        sceneModel.position.set(-center.x, -center.y, -center.z);

        // Scale to fill badge viewport prominently without clipping corners during 360 spin
        const maxDim = Math.max(size.x, size.y, size.z) || 1;
        const scaleFactor = 1.62 / maxDim;
        sceneModel.scale.set(scaleFactor, scaleFactor, scaleFactor);

        // Ensure crisp pixelated voxel textures & calibrated shading
        sceneModel.traverse((child) => {
          if (child.isMesh) {
            clonedMeshList.push(child);
            if (child.material) {
              child.material = child.material.clone();
              if (child.material.map) {
                child.material.map.magFilter = THREE.NearestFilter;
                child.material.map.minFilter = THREE.NearestMipmapLinearFilter;
                child.material.map.needsUpdate = true;
              }
              child.material.roughness = 0.42;
              child.material.metalness = 0.18;
            }
          }
        });

        modelGroup.add(sceneModel);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.error('Failed to load 3D voxel cap logo:', err);
      });

    // 6. Resize Observer for dynamic container flexibility
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || !entries[0]) return;
      const { width: newW, height: newH } = entries[0].contentRect;
      if (newW > 0 && newH > 0) {
        camera.aspect = newW / newH;
        camera.updateProjectionMatrix();
        renderer.setSize(newW, newH, false);
      }
    });
    resizeObserver.observe(container);

    // 7. Animation Loop with Real-time 3D Rotation
    let clock = new THREE.Clock();
    let currentAngle = 0.45;
    let boostAngle = 0;

    const animate = () => {
      if (isDestroyed) return;

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Ambient idle rotation speed, accelerates on hover
      const baseSpeed = isHoveredRef.current ? 2.4 : 0.82;
      currentAngle += delta * baseSpeed;

      // Handle click spin boost with damping
      boostAngle += (spinBoostRef.current - boostAngle) * 0.15;
      if (spinBoostRef.current > 0) {
        spinBoostRef.current *= 0.92;
        if (spinBoostRef.current < 0.01) spinBoostRef.current = 0;
      }

      // Slightly tilted isometric perspective showcasing top diamond + front voxel facets + tassel
      modelGroup.rotation.x = 0.34 + Math.sin(time * 2.0) * 0.035;
      modelGroup.rotation.y = currentAngle + boostAngle;
      modelGroup.rotation.z = Math.cos(time * 1.6) * 0.025;

      // Gentle floating bob
      modelGroup.position.y = Math.sin(time * 2.2) * 0.04;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      isDestroyed = true;
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();

      clonedMeshList.forEach((mesh) => {
        if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => m.dispose());
          } else {
            mesh.material.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
      className={`relative flex items-center justify-center select-none ${className}`}
      title="ScholarGrid 3D Voxel Graduation Cap (Click to spin!)"
      role="img"
      aria-label="ScholarGrid 3D Voxel Graduation Cap Logo"
    >
      <canvas
        ref={canvasRef}
        className={`w-full h-full block transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-5 h-5 rounded-sm border-2 border-[var(--accent-primary)] border-t-transparent animate-spin" />
        </div>
      )}
    </div>
  );
}
