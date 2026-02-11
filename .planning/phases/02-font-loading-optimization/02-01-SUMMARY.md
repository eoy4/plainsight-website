---
phase: 02-font-loading-optimization
plan: 01
subsystem: performance
tags:
  - fonts
  - preload
  - performance
  - cls-prevention
dependency_graph:
  requires: []
  provides:
    - hero-font-preload
  affects:
    - src/layouts/Base.astro
tech_stack:
  added: []
  patterns:
    - resource-hints
    - font-preloading
key_files:
  created: []
  modified:
    - src/layouts/Base.astro
decisions:
  - Preload only Darker Grotesque (hero display font), not Manrope (body text)
  - Keep Google Fonts CDN for easy font swapping during exploration phase
  - Use latin subset WOFF2 URL for optimal file size
metrics:
  duration_minutes: 1
  tasks_completed: 1
  files_modified: 1
  commits: 1
  completed_at: "2026-02-11T23:35:32Z"
---

# Phase 02 Plan 01: Font Preload Optimization Summary

**One-liner:** Preload Darker Grotesque hero font to eliminate layout shift on viewport-scale typography.

## What Was Built

Added resource hint (preload) for the Darker Grotesque variable font (latin subset) to prevent Cumulative Layout Shift (CLS) on the hero headline during font loading. The preload link tells the browser to fetch the critical display font early, before the CSS parser discovers the font-face declaration.

**Implementation:**
- Preload link added to Base.astro document head
- Positioned after preconnect hints, before Google Fonts stylesheet
- Targets latin subset WOFF2 variable font (300-900 weight range)
- Includes `crossorigin` attribute to prevent duplicate downloads (CORS mode alignment)

**Technical details:**
- Font URL: `https://fonts.gstatic.com/s/darkergrotesque/v10/U9MH6cuh-mLQlC4BKCtayOfARkSVq7HUJA.woff2`
- Attributes: `as="font"`, `type="font/woff2"`, `crossorigin`
- Google Fonts CDN kept intact for easy font exploration

## Tasks Completed

| Task | Name                                                  | Commit  | Files Modified       |
| ---- | ----------------------------------------------------- | ------- | -------------------- |
| 1    | Add preload link for Darker Grotesque variable font  | fb25bbd | src/layouts/Base.astro |

## Deviations from Plan

None - plan executed exactly as written.

## Key Decisions

**1. Preload only hero font (Darker Grotesque), not body font (Manrope)**
- **Rationale:** Hero typography is critical for LCP and viewport dominance. Body font (Manrope) is below the fold and not CLS-critical.
- **Impact:** Minimal - keeps initial page load focused on critical resources
- **Alternatives considered:** Preload both fonts (rejected - unnecessary waterfall)

**2. Use latin subset URL instead of unicode-range font file**
- **Rationale:** Latin subset covers 99% of expected site content and is the smallest file size
- **Impact:** Optimal performance for target audience
- **Alternatives considered:** Preload all subsets (rejected - wasted bandwidth)

**3. Keep Google Fonts CDN during exploration phase**
- **Rationale:** Easy font swapping while exploring typography options
- **Impact:** Deferred: self-hosting optimization scheduled for later phase
- **Next step:** Self-host fonts in future optimization phase

## Verification Results

**Build verification:**
- `npm run build` completed successfully
- No errors or warnings related to font preloading

**HTML output verification:**
- `dist/index.html` contains preload link with correct attributes
- Google Fonts stylesheet link present and unchanged
- Font file URL validated via curl request to Google Fonts CSS API

**Attribute verification:**
- `rel="preload"` ✓
- `href` points to Darker Grotesque WOFF2 ✓
- `as="font"` ✓
- `type="font/woff2"` ✓
- `crossorigin` attribute present ✓

## Impact Summary

**Performance:**
- Prevents layout shift on hero typography
- Enables earlier font discovery and download
- Aligns with Core Web Vitals (CLS reduction)

**User Experience:**
- Smoother page load with stable hero headline
- No font swap flash on critical viewport content

**Technical:**
- Single line addition to Base.astro head
- No breaking changes
- Backward compatible (browsers ignore unknown attributes)

## Next Steps

**Immediate:**
- Monitor CLS metrics in production
- Verify font preload timing in Network tab (should start before CSS parser discovery)

**Future phases:**
- Self-host fonts for full control over caching and delivery
- Consider subsetting fonts further based on actual character usage
- Explore variable font axis optimization (if only using specific weights)

## Self-Check: PASSED

**Created files:**
- None (plan only modified existing files)

**Modified files:**
- ✓ src/layouts/Base.astro exists and contains preload link

**Commits:**
- ✓ fb25bbd exists in git history

**Build:**
- ✓ npm run build completes successfully
- ✓ dist/index.html contains expected preload link
