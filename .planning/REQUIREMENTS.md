# Requirements: Front Page Bold Redesign

**Defined:** 2026-02-11
**Core Value:** The hero headline must feel massive, confident, and impossible to ignore — dominating the viewport with sheer typographic scale and a living, animated background.

## v1.1 Requirements

Requirements for milestone v1.1: Aurora Hero Background.

### Aurora Animation

- [ ] **AURA-01**: Hero section displays an animated aurora gradient background using CSS keyframe animation (60s infinite loop)
- [ ] **AURA-02**: Aurora uses repeating linear gradients with blend modes to create the shifting color effect
- [ ] **AURA-03**: Aurora effect includes a radial gradient mask (ellipse at top-right) for natural fade-out

### Theme Integration

- [ ] **THEME-01**: Light mode aurora uses warm oranges/ambers derived from site accent palette (#D97642, #E07A5F)
- [ ] **THEME-02**: Dark mode aurora uses teals/limes derived from site accent palette (#0D7377, #B8F545)
- [ ] **THEME-03**: Aurora colors transition smoothly when toggling between light/dark themes

### Hero Composition

- [ ] **HERO-01**: Aurora replaces existing `.hero-bg-glow` radial gradient
- [ ] **HERO-02**: Grid pattern (`.hero-grid-pattern`) preserved and layered above aurora
- [ ] **HERO-03**: Existing hero text (headline, tagline, CTA) remains readable over aurora background
- [ ] **HERO-04**: Aurora implemented as pure CSS in `.astro` component — zero JavaScript runtime

### Accessibility & Performance

- [ ] **A11Y-01**: Aurora animation paused/hidden when `prefers-reduced-motion: reduce` is active
- [ ] **PERF-01**: Aurora uses `will-change: transform` and GPU-composited properties for smooth animation
- [ ] **PERF-02**: No layout shift from aurora (absolute positioned, `pointer-events: none`)

## Future Requirements

None — v1.1 is tightly scoped.

## Out of Scope

| Feature | Reason |
|---------|--------|
| React integration | Aurora is pure CSS; no interactivity requires React runtime |
| framer-motion | Demo fade-in effect; existing fadeInUp CSS handles this |
| shadcn/cn utility | Not needed without React component architecture |
| Aurora on other pages | Front page hero only for v1.1 |
| Interactive aurora controls | No user-facing toggles for aurora parameters |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| AURA-01 | Phase 4 | Pending |
| AURA-02 | Phase 4 | Pending |
| AURA-03 | Phase 4 | Pending |
| THEME-01 | Phase 4 | Pending |
| THEME-02 | Phase 4 | Pending |
| THEME-03 | Phase 4 | Pending |
| HERO-01 | Phase 4 | Pending |
| HERO-02 | Phase 4 | Pending |
| HERO-03 | Phase 4 | Pending |
| HERO-04 | Phase 4 | Pending |
| A11Y-01 | Phase 4 | Pending |
| PERF-01 | Phase 4 | Pending |
| PERF-02 | Phase 4 | Pending |

**Coverage:**
- v1.1 requirements: 13 total
- Mapped to phases: 13
- Unmapped: 0 ✓

---
*Requirements defined: 2026-02-11*
*Last updated: 2026-02-11 after v1.1 roadmap creation*
