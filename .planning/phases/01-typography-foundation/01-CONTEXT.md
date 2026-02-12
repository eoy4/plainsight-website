# Phase 1: Typography Foundation & Container Architecture - Context

**Gathered:** 2026-02-11
**Status:** Ready for planning

<domain>
## Phase Boundary

Hero headline scales to viewport-filling size (~10vw on desktop) with accessibility compliance (200% zoom without overflow), mobile viewport stability (address bar collapse handling), and clear visual hierarchy with tagline and CTA clearly secondary to the massive headline.

</domain>

<decisions>
## Implementation Decisions

### Headline scale & feel
- Mixed case (sentence case), not uppercase
- Large with breathing room — bold but with comfortable margins, not edge-to-edge
- Allow natural wrapping — headline wraps to 2-3 lines on narrower viewports to keep font size larger
- Font weight: Black / Extra Bold (800-900) for maximum visual commanding presence

### Hero layout & spacing
- Full viewport height (100vh) — hero section takes the full screen, scroll to see next section
- Left-aligned text — strong editorial feel, content anchored to the left
- Tight grouping between headline, tagline, and CTA — unified block where headline dominates by size contrast
- Vertical positioning: Claude's discretion (see below)

### Mobile viewport behavior
- Full viewport on mobile — hero fills mobile screen, handle address bar quirks with dvh/svh
- Stay left-aligned on mobile — consistent with desktop
- Headline still dominant on mobile — scaled proportionally, biggest element on screen
- No special landscape treatment — responsive scaling handles it naturally

### Accessibility & overflow
- At 200% zoom: headline shrinks to fit container (prevent overflow, not maintain scale)
- Long word overflow: break anywhere (force break mid-word without hyphens if needed)
- Tagline and CTA also scale fluidly with viewport (proportionally smaller than headline)

### Claude's Discretion
- Vertical positioning of hero content within viewport (centered vs upper third)
- Minimum headline font size at extreme zoom/narrow viewports
- Exact spacing values between headline, tagline, and CTA within the tight grouping
- Fluid type scale calculations and clamp() breakpoints

</decisions>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-typography-foundation*
*Context gathered: 2026-02-11*
