---
name: ScholarGrid
description: Precision Application Command & Scholarship Matching Engine
colors:
  primary: "#EDEDED"
  canvas-dark: "#0D0D0E"
  surface-dark: "#131315"
  surface-elevated-dark: "#1A1A1D"
  surface-hover-dark: "#202024"
  canvas-light: "#F8FAFC"
  surface-light: "#FFFFFF"
  surface-elevated-light: "#F1F5F9"
  surface-hover-light: "#E2E8F0"
  border-subtle: "rgba(255, 255, 255, 0.05)"
  border: "rgba(255, 255, 255, 0.09)"
  border-hover: "rgba(255, 255, 255, 0.18)"
  border-active: "rgba(255, 255, 255, 0.35)"
  text-primary: "#EDEDED"
  text-secondary: "#A0A0A5"
  text-muted: "#82828B"
  accent-dark: "#FFFFFF"
  accent-light: "#0F172A"
typography:
  scale:
    micro: "10px"
    caption: "11px"
    label: "12px"
    body: "15px"
    title: "18px"
  display:
    fontFamily: "'Host Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 4.25rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "'Host Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 2.25rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  title:
    fontFamily: "'Host Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "1.125rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "-0.015em"
  body:
    fontFamily: "'Host Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  label:
    fontFamily: "'Azeret Mono', ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.03em"
rounded:
  xs: "2px"
  sm: "4px"
  md: "4px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.accent-dark}"
    textColor: "{colors.canvas-dark}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
  button-primary-hover:
    backgroundColor: "#E0E0E0"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
  card:
    backgroundColor: "{colors.surface-dark}"
    rounded: "{rounded.sm}"
    padding: "24px"
---

# Design System: ScholarGrid

## Overview

**Creative North Star: "The Architectural Terminal"**

ScholarGrid is built as a high-density, mathematical command ledger for ambitious students navigating complex scholarship opportunities. Rejecting the rounded, pastel, gamified aesthetics typical of consumer EdTech, ScholarGrid approaches scholarship hunting as an auditable allocation problem. The visual language evokes precision laboratory instrumentation, architectural blueprints, and high-frequency financial workstations.

Every layout is anchored in an intentional coordinate framework. Structural surfaces are rendered with razor-sharp 4px corner radii and 1px hairline borders (`rgba(255, 255, 255, 0.09)` in dark mode, `rgba(0, 0, 0, 0.09)` in light mode). Depth is conveyed through tonal layering and hairline delineation rather than diffuse drop shadows. Both light mode ("Engineered Paper") and dark mode ("Obsidian Grid") are strictly neutral-dominant monochrome systems designed to maximize contrast, density, and reading endurance.

**Key Characteristics:**
- **Strict Monochrome Discipline:** High-contrast neutral spectrum (deep obsidian `#0D0D0E` and engineered paper `#F8FAFC`); zero neon, zero synthetic glow.
- **Micro-Metric Typographic Hierarchy:** Host Grotesk for architectural titles and proportional prose, Azeret Mono with tabular numerals for all telemetry.
- **Razor Corner Radii:** Uniform 4px boundaries on all cards, inputs, and interactive surfaces.
- **Coordinate Framework:** Architectural hairline panel layout creating spatial grounding without artificial repeating gradient backgrounds.

## Colors

The ScholarGrid palette is an uncompromising dual-state architectural monochrome system built on absolute neutrals.

### Primary
- **Obsidian Dark / Crisp White** (`#0D0D0E` / `#FFFFFF`): The primary foreground/background polarity. In dark mode, `#FFFFFF` serves as high-emphasis accent and action trigger against `#0D0D0E`. In light mode, `#0F172A` anchors against `#F8FAFC`.

### Neutral
- **Canvas Background** (`#0D0D0E` dark, `#F8FAFC` light): The primary viewport foundation.
- **Surface Layer 1** (`#131315` dark, `#FFFFFF` light): Primary container and bento-cell background.
- **Surface Layer 2 (Elevated)** (`#1A1A1D` dark, `#F1F5F9` light): Secondary panels, interactive inputs, and modal backgrounds.
- **Border Subtle** (`rgba(255, 255, 255, 0.05)` dark, `rgba(0, 0, 0, 0.04)` light): Interior grid divisions.
- **Border Default** (`rgba(255, 255, 255, 0.09)` dark, `rgba(0, 0, 0, 0.09)` light): Standard structural boundaries.
- **Border Active** (`rgba(255, 255, 255, 0.35)` dark, `rgba(0, 0, 0, 0.35)` light): Focus rings and active interaction states.
- **Text Primary** (`#EDEDED` dark, `#0F172A` light): Maximum legibility content headers and focal copy.
- **Text Secondary** (`#A0A0A5` dark, `#475569` light): Descriptive body prose and supportive descriptions.
- **Text Muted** (`#82828B` dark, `#64748B` light): Auxiliary labels, ticker timestamps, and technical metadata.

### Named Rules
**The Zero-Neon Rule.** No saturated cyan, purple, or green accents. Statuses (pass, fail, pending) are communicated via typographic weight, structural icons, and mono labels, never colored pills or glowing halos.
**The Hairline Structure Rule.** Borders are always 1px with crisp opacity, establishing spatial rhythm cleanly.

## Typography

**Display Font:** Host Grotesk (with `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `sans-serif`)  
**Body Font:** Host Grotesk  
**Label/Mono Font:** Azeret Mono (with `ui-monospace`, `SFMono-Regular`, `Menlo`, `monospace`)  
**Editorial Accent Font:** Georgia, Cambria (with `Times New Roman`, `serif`)  

**Character:** Technical, confident, and unapologetically Swiss. The pairing of Host Grotesk's geometric clarity with Azeret Mono's industrial spacing creates a workstation atmosphere.

### Hierarchy
- **Display** (SemiBold 600, `clamp(2.5rem, 6vw, 4.25rem)`, line-height 1.05, tracking -0.03em): Hero headlines and major thematic declarations. Always paired with `text-wrap: balance`.
- **Headline** (SemiBold 600, `clamp(1.5rem, 3vw, 2.25rem)`, line-height 1.15, tracking -0.025em): Bento section headers and feature titles.
- **Title** (Medium 500, `1.125rem`, line-height 1.3, tracking -0.015em): Opportunity titles and modal section headers.
- **Body** (Regular 400, `0.9375rem`, line-height 1.55, tracking normal): Explanatory descriptions and documentation text. Constrained to `max-w-2xl` for optimal reading flow.
- **Label / Telemetry** (Medium 500, `0.75rem`, letter-spacing 0.03em, uppercase): Match scores, word counts, timestamps, and architectural tags. Always rendered in `Azeret Mono` with `font-feature-settings: "tnum" 1`.

### Named Rules
**The Tabular Numerals Rule.** Every quantity, currency value, percentage, date, and metric MUST render in `Azeret Mono` with `font-variant-numeric: tabular-nums` (`font-feature-settings: "tnum" 1, "zero" 1`) to guarantee column alignment across states.

## Layout

ScholarGrid uses a disciplined 12-column coordinate framework centered inside a `max-w-6xl` architectural envelope (`px-4 sm:px-6 lg:px-8`). 

The baseline rhythm is based on an 8px grid (`gap-4`, `gap-6`, `gap-8`). Bento grids use equal-height hairline cells (`arch-panel`). Interactive widgets—such as the Match Simulator and Essay Diff Preview—use fixed split-pane topologies that preserve vertical alignment across desktop screens and collapse gracefully to single-column stacks on viewports `<768px`.

## Elevation & Depth

ScholarGrid is flat-by-construction. Depth is achieved via tonal surface stepping and 1px hairline boundaries rather than blurry box-shadows.

Surfaces step from Canvas (`--canvas-bg`) to Base Surface (`--surface-bg`) to Elevated Toolbars (`--surface-elevated`). 

### Named Rules
**The Ambient-Only Elevation Rule.** Blurry drop shadows (`box-shadow`) are prohibited on cards and inline widgets. Shadows are reserved exclusively for floating modal scrim overlays and dropdown flyouts (`0 20px 40px -15px rgba(0, 0, 0, 0.5)`).

## Shapes

- **Corner Radius:** Hard 4px (`--radius: 4px`) across all cards, buttons, inputs, badges, and modals. 2px (`--radius-xs`) on internal indicators. Pill buttons (`rounded-full`) are strictly forbidden.
- **Borders:** Consistent 1px solid hairline (`var(--border)`) on all containers and dividers.
- **Dividers:** 1px hairline lines; no bevels, embosses, or dashed styling unless representing a diff deletion.

## Components

### Buttons
- **Shape:** 4px radius (`border-radius: 4px`), compact architectural padding (`px-4 py-2`).
- **Primary:** High-contrast solid background (`var(--accent-primary)`), contrasting text (`var(--accent-text)`), font-weight 600, 12px mono tracking or 14px sans.
- **Ghost / Minimal:** Transparent background, 1px hairline border (`var(--border)`), text `var(--text-secondary)`, hover background `var(--surface-hover)`.
- **Focus:** Crisp 1px outline with 2px offset (`outline: 1px solid var(--border-active)`).

### Cards / Containers
- **Corner Style:** 4px radius (`border-radius: var(--radius)`).
- **Background:** `var(--surface-bg)`.
- **Border:** 1px solid `var(--border)`.
- **Hover:** Hairline border transition to `var(--border-hover)`; zero Y-axis bounce or float.

### Inputs / Fields
- **Style:** 1px hairline stroke (`var(--border)`), background `var(--surface-elevated)`, 4px radius.
- **Focus:** Border transitions to `var(--border-active)`, 1px outline offset 2px.

### Badges / Telemetry Chips
- **Style:** Compact padding (`px-2 py-0.5`), font `Azeret Mono`, 11px (`0.72rem`), background `var(--badge-bg)`, border 1px solid `var(--badge-border)`.

## Do's and Don'ts

### Do:
- **Do** format all numerical data, match percentages, GPA values, and deadlines in `Azeret Mono` with tabular numbers.
- **Do** keep corner radius at exactly 4px for all cards, containers, buttons, and inputs.
- **Do** preserve the ultra-minimalist header: Logo + Glyph (left), Theme Toggle + Start Matching CTA (right).
- **Do** present all opportunities and pipeline entries as seamless, authentic production records.
- **Do** verify both Light ("Engineered Paper") and Dark ("Obsidian Grid") themes maintain strict WCAG AA contrast.

### Don't:
- **Don't** introduce rounded-full pill buttons or soft, bubble-like container corners.
- **Don't** add colored neon glows (no cyan, purple, or green halos).
- **Don't** use generic browser fonts or uncurated sans-serif stacks.
- **Don't** reintroduce synthetic demo tags or `[DEMO SPECIMEN]` labels on records.
- **Don't** clutter the primary header with secondary navigation links or sandbox buttons.
