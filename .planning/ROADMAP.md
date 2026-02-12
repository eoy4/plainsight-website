# Roadmap: Front Page Bold Redesign

## Milestones

- ✅ **v1.0 Front Page Bold Redesign** - Phases 1-3 (shipped 2026-02-12)
- 🚧 **v1.1 Aurora Hero Background** - Phase 4 (in progress)

## Phases

<details>
<summary>✅ v1.0 Front Page Bold Redesign (Phases 1-3) - SHIPPED 2026-02-12</summary>

### Phase 1: Typography Foundation & Container Architecture
**Goal**: Implement 8rem hero typography with proper semantic HTML
**Plans**: 1 plan

Plans:
- [x] 01-01: Hero typography scaling and container structure

### Phase 2: Font Loading Optimization
**Goal**: Eliminate CLS on viewport-scale typography
**Plans**: 1 plan

Plans:
- [x] 02-01: Preload hero font and optimize loading strategy

### Phase 3: Visual Effects & Section Polish
**Goal**: Scale all homepage sections to match bold hero aesthetic
**Plans**: 2 plans

Plans:
- [x] 03-01: Section heading scale and scroll animations
- [x] 03-02: Proportional body text and content scaling

</details>

### 🚧 v1.1 Aurora Hero Background (In Progress)

**Milestone Goal:** Add an animated aurora gradient background to the hero section with theme-aware colors and full accessibility compliance.

#### Phase 4: Aurora Background Implementation
**Goal**: Hero section displays a living, animated aurora gradient that adapts to theme
**Depends on**: Phase 3 (hero typography foundation)
**Requirements**: AURA-01, AURA-02, AURA-03, THEME-01, THEME-02, THEME-03, HERO-01, HERO-02, HERO-03, HERO-04, A11Y-01, PERF-01, PERF-02
**Success Criteria** (what must be TRUE):
  1. User sees animated aurora gradient behind hero content with natural color shifts over 60-second loop
  2. Aurora colors change when toggling light/dark theme (warm oranges/ambers in light, teals/limes in dark)
  3. Existing hero grid pattern and text remain visible and readable over aurora background
  4. Aurora animation pauses completely when user has prefers-reduced-motion enabled
  5. Hero section renders with zero layout shift and smooth 60fps animation on modern browsers
**Plans**: TBD

Plans:
- [ ] 04-01: TBD (to be planned)

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1. Typography Foundation | v1.0 | 1/1 | Complete | 2026-02-11 |
| 2. Font Loading Optimization | v1.0 | 1/1 | Complete | 2026-02-11 |
| 3. Visual Effects & Section Polish | v1.0 | 2/2 | Complete | 2026-02-11 |
| 4. Aurora Background Implementation | v1.1 | 0/TBD | Not started | - |

---
*Last updated: 2026-02-11 after v1.1 roadmap creation*
