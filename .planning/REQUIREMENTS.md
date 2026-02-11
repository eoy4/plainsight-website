# Requirements: Front Page Bold Redesign

**Defined:** 2026-02-10
**Core Value:** The hero headline must feel massive, confident, and impossible to ignore — dominating the viewport with sheer typographic scale.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Typography

- [ ] **TYPO-01**: Hero headline uses viewport-filling fluid typography via `clamp()` with vw + rem bounds (target ~10vw range, up from current 4.5rem max)
- [ ] **TYPO-02**: Hero headline remains accessible — rem bounds in clamp enable user zoom per WCAG 1.4.4
- [ ] **TYPO-03**: Hero headline scales responsively from mobile to ultra-wide without breaking
- [ ] **TYPO-04**: Darker Grotesque switched to variable font (single file, weight 300-900)

### Layout

- [ ] **LAYO-01**: Hero text container expanded beyond current `max-w-[900px]` to allow headline to breathe at full width
- [ ] **LAYO-02**: Hero uses `svh` viewport units instead of `vh` for correct mobile height
- [ ] **LAYO-03**: Tagline and CTA are clearly secondary to the massive headline (visual hierarchy)
- [ ] **LAYO-04**: Hero layout uses asymmetric, editorial-style composition (text positioned off-center)

### Effects

- [ ] **EFCT-01**: Existing gradient text treatment and glow background preserved
- [ ] **EFCT-02**: Subtle scroll-driven animations added to hero or page sections
- [ ] **EFCT-03**: Other front page sections' type hierarchy adjusted to feel cohesive with bolder hero

### Performance

- [ ] **PERF-01**: Hero display font preloaded to prevent layout shift during load

## v2 Requirements

### Typography

- **TYPO-05**: Variable font weight animation on hover/scroll for dynamic feel

### Effects

- **EFCT-04**: Layered depth effects in hero section

## Out of Scope

| Feature | Reason |
|---------|--------|
| Other pages redesign | Front page only — services, work, contact, blog unchanged |
| New sections or content restructuring | Existing section layout stays the same |
| Content changes | Same headline, tagline, CTA text from CMS |
| CLS optimization target | Font preloading covers the main risk; full CLS audit deferred |
| Component extraction (Hero.astro) | Architecture improvement but not a user-facing requirement |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| TYPO-01 | — | Pending |
| TYPO-02 | — | Pending |
| TYPO-03 | — | Pending |
| TYPO-04 | — | Pending |
| LAYO-01 | — | Pending |
| LAYO-02 | — | Pending |
| LAYO-03 | — | Pending |
| LAYO-04 | — | Pending |
| EFCT-01 | — | Pending |
| EFCT-02 | — | Pending |
| EFCT-03 | — | Pending |
| PERF-01 | — | Pending |

**Coverage:**
- v1 requirements: 12 total
- Mapped to phases: 0
- Unmapped: 12

---
*Requirements defined: 2026-02-10*
*Last updated: 2026-02-10 after initial definition*
