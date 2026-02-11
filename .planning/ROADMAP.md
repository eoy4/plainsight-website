# Roadmap: Front Page Bold Redesign

## Overview

This roadmap delivers viewport-dominating hero typography for the Plain Sight agency homepage through three phases: establishing accessibility-compliant fluid typography with container architecture (Phase 1), optimizing variable font loading to prevent layout shift at viewport scale (Phase 2), and adding visual effects and section polish to match the bold hero aesthetic (Phase 3). The structure prioritizes foundational safety before visual iteration to prevent performance rework.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Typography Foundation & Container Architecture** - Viewport-filling hero typography with accessibility and layout constraints
- [ ] **Phase 2: Font Loading Optimization** - Variable font implementation with preloading to prevent CLS
- [ ] **Phase 3: Visual Effects & Section Polish** - Gradient optimization, animations, and cohesive page hierarchy

## Phase Details

### Phase 1: Typography Foundation & Container Architecture
**Goal**: Hero headline scales to viewport-filling size with accessibility compliance and container adjustments to prevent overflow.

**Depends on**: Nothing (first phase)

**Requirements**: TYPO-01, TYPO-02, TYPO-03, LAYO-01, LAYO-02, LAYO-03, LAYO-04

**Success Criteria** (what must be TRUE):
  1. User sees hero headline at approximately 10vw scale on desktop (dramatically larger than current 4.5rem max)
  2. User can zoom browser to 200% and headline remains readable without breaking layout or overflowing containers
  3. User on mobile sees hero content without vertical scroll cutoff or viewport resizing when address bar expands/collapses
  4. User sees clear visual hierarchy with tagline and CTA clearly secondary to the massive headline

**Plans:** 1 plan

Plans:
- [x] 01-01-PLAN.md — Fluid typography tokens, expanded container, svh height, editorial layout

### Phase 2: Font Loading Optimization
**Goal**: Display font loads without layout shift or FOIT, especially critical at viewport scale where shifts are amplified.

**Depends on**: Phase 1

**Requirements**: TYPO-04, PERF-01

**Success Criteria** (what must be TRUE):
  1. User sees final hero typography immediately on page load with no text reflow or size jumps (CLS < 0.1)
  2. User on slow 3G connection sees fallback font or no text (never mid-render font swap causing visible layout shift)
  3. Variable font file loads 55% faster than previous static fonts (376KB to 89KB payload reduction)

**Plans**: TBD

Plans:
- [ ] 02-01: TBD

### Phase 3: Visual Effects & Section Polish
**Goal**: Hero and page sections match bold aesthetic with optimized gradients, animations, and cohesive typography.

**Depends on**: Phase 2

**Requirements**: EFCT-01, EFCT-02, EFCT-03

**Success Criteria** (what must be TRUE):
  1. User sees preserved gradient text treatment on hero headline without performance degradation or GPU overhead
  2. User scrolls page and sees subtle animations on hero or sections (fade, scale, or parallax-free motion)
  3. User views other homepage sections and sees typography hierarchy that feels cohesive with the bolder hero

**Plans**: TBD

Plans:
- [ ] 03-01: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Typography Foundation & Container Architecture | 1/1 | Complete | 2026-02-11 |
| 2. Font Loading Optimization | 0/TBD | Not started | - |
| 3. Visual Effects & Section Polish | 0/TBD | Not started | - |
