# Feature Research

**Domain:** Bold Typography-Driven Agency Hero Sections
**Researched:** 2026-02-11
**Confidence:** HIGH

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist. Missing these = product feels incomplete.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Oversized headline typography | Core defining characteristic of bold typography heroes; 2026 trend where "large, expressive fonts instantly capture attention" | MEDIUM | Requires viewport-based sizing (clamp() with vw/vh units), careful font loading to prevent FOIT/layout shift, fallback font matching |
| Strong typographic hierarchy | Headline → subheading → CTA creates scannable structure users expect | LOW | Already present in current design; needs amplification with size contrast |
| Clear call-to-action | Every hero section needs actionable next step | LOW | Already implemented; may need repositioning for bolder layout |
| Mobile responsiveness | Typography must scale gracefully across viewports without breaking | MEDIUM | Critical with large type; requires clamp() for fluid scaling, testing at 768px breakpoint, touch targets ≥44px |
| Proper contrast ratios | Accessibility requirement (WCAG 4.5:1 minimum for body text) | LOW | Current gradient text needs verification against backgrounds |
| Semantic HTML structure | <h1>, <p> tags for accessibility and SEO | LOW | Already correct in current implementation |
| Fast font loading | Prevent Flash of Invisible Text (FOIT) and layout shift | MEDIUM | Use font-display: swap, preload critical fonts, match fallback metrics |

### Differentiators (Competitive Advantage)

Features that set the product apart. Not required, but valuable.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Asymmetric grid layout | "Moving away from safe, center-aligned templates toward more expressive compositions" creates uniqueness | MEDIUM | CSS Grid with intentional asymmetry; avoids "cookie-cutter" feel mentioned in project context |
| Kinetic/animated typography | 2026 trend: "kinetic lettering, dynamic font pairings, and variable fonts that respond to interaction" | HIGH | Subtle motion on scroll or hover; must not sacrifice performance or accessibility |
| Editorial-style composition | "Editorial grids, type-first heroes...resulting in work that feels considered, confident, and unmistakably modern" | MEDIUM | Layered elements, intentional negative space, magazine-inspired layouts |
| Gradient or multi-color type treatment | Already in use; can be amplified for more impact | LOW | Current linear gradient working well; consider bolder color stops |
| Scroll-driven animations | Text elements animate based on scroll position using CSS scroll-timeline | MEDIUM | Modern CSS approach (animation-timeline: scroll(root)); no JS needed but limited browser support |
| Layered depth effects | Overlapping type layers at different z-indices creates visual depth | MEDIUM | Must maintain readability; avoid making it "just decoration" |
| Custom/variable font usage | Brands using "custom fonts, oversized headlines, motion, and layered styles to make bold first impressions" | MEDIUM | Variable fonts can shift weight/width dynamically; licensing considerations |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good but create problems.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Parallax scrolling on hero typography | "Show off tech prowess" and add depth | "User experience should be the main priority, keeping the parallax effect to a minimum to avoid it becoming a distraction"; causes motion sickness, performance issues, mobile jank | Use subtle scroll-driven fade/scale instead; transform-based parallax on non-critical elements only |
| All-caps typography throughout | Looks bold and impactful | "Readability is reduced when all words have a uniform rectangular shape, meaning readers can't identify words by their shape"; accessibility issue | Use all-caps sparingly for labels/accents; keep headlines in sentence case |
| Multiple custom fonts | Demonstrates design sophistication | "Using too many fonts in a design can result in an inconsistent style and visual discord"; performance cost of loading multiple font files | Stick to 1-2 font families; use weight/size variation for hierarchy |
| 100vh hero on all devices | Ensures "viewport dominance" | Mobile browsers have dynamic viewport heights (address bars); creates awkward spacing; forces scroll on short viewports | Use min-height with reasonable fallback; 90vh on mobile or content-based height |
| Auto-playing video backgrounds | Modern, cinematic feel | Performance nightmare; accessibility issues; distracts from typography; massive file sizes | Static gradient or subtle texture; let typography be the hero |
| Text over busy background images | "Cinematic" aesthetic | "Your hero image should have safe spots for the typography to rest, which shouldn't be on top of the busiest area of the image" | Solid colors, soft gradients, or subtle patterns; maintain focus on type |
| Extremely large type (>15vw) | Maximum impact | Accessibility issues (can't zoom properly); layout breaks on extreme viewports; performance | Use clamp() with reasonable max (e.g., clamp(3rem, 12vw, 8rem)); ensure 200% zoom support |

## Feature Dependencies

```
Oversized headline typography
    └──requires──> Mobile responsiveness
                       └──requires──> Fast font loading (prevents layout shift)

Kinetic/animated typography
    └──requires──> Performance optimization
    └──enhances──> Editorial-style composition

Asymmetric grid layout
    └──enhances──> Editorial-style composition
    └──conflicts──> Centered hero layouts

Scroll-driven animations
    └──requires──> Progressive enhancement (fallback for unsupported browsers)
    └──conflicts──> Auto-playing animations (creates animation overload)

Custom/variable font usage
    └──requires──> Fast font loading
    └──enhances──> Oversized headline typography
```

### Dependency Notes

- **Oversized typography requires mobile responsiveness:** Large type breaks layouts if not fluid; must use clamp() and test breakpoints rigorously
- **Fast font loading prevents layout shift:** Critical for large headlines where FOIT causes major CLS issues; preload fonts and use font-display: swap
- **Asymmetric layout conflicts with centered layouts:** Design must commit to one approach; mixing creates visual confusion
- **Scroll animations need progressive enhancement:** Limited browser support (no Firefox); must work without animation

## MVP Definition

### Launch With (v1)

Minimum viable product — what's needed to validate the concept.

- [x] Oversized headline typography with viewport-based sizing — Core defining feature
- [x] Strong typographic hierarchy (headline → subheading → CTA) — Already present, needs amplification
- [x] Mobile-responsive fluid typography — Non-negotiable for multi-device usage
- [x] Proper contrast ratios and accessibility — WCAG compliance, semantic HTML
- [x] Fast font loading (font-display: swap, preload) — Prevents layout shift and poor UX
- [ ] Asymmetric or editorial-style composition — Differentiator; breaks from current centered layout
- [ ] Subtle gradient/color treatment on typography — Amplify existing gradient approach

### Add After Validation (v1.x)

Features to add once core is working.

- [ ] Scroll-driven fade/scale animations — Once baseline typography working, add polish
- [ ] Layered depth effects (overlapping elements) — Requires design iteration to maintain readability
- [ ] Custom or variable font implementation — After performance baseline established

### Future Consideration (v2+)

Features to defer until product-market fit is established.

- [ ] Kinetic typography (advanced animations) — High complexity; requires significant development
- [ ] Interactive typography (responds to cursor/touch) — Nice-to-have; prioritize static excellence first
- [ ] Dynamic font pairings based on context — Overkill for agency site; more suited to editorial platforms

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Oversized headline typography | HIGH | MEDIUM | P1 |
| Mobile-responsive fluid type | HIGH | MEDIUM | P1 |
| Fast font loading | HIGH | MEDIUM | P1 |
| Proper contrast/accessibility | HIGH | LOW | P1 |
| Asymmetric grid layout | MEDIUM | MEDIUM | P1 |
| Gradient type treatment | MEDIUM | LOW | P1 |
| Scroll-driven animations | MEDIUM | MEDIUM | P2 |
| Layered depth effects | MEDIUM | MEDIUM | P2 |
| Custom/variable fonts | LOW | MEDIUM | P2 |
| Kinetic typography | LOW | HIGH | P3 |
| Interactive typography | LOW | HIGH | P3 |

**Priority key:**
- P1: Must have for launch — defines "bold typography hero"
- P2: Should have, add when possible — polish and differentiation
- P3: Nice to have, future consideration — advanced features

## Competitor Feature Analysis

| Feature | Frisk Template (Reference) | 2026 Agency Trends | Our Approach |
|---------|----------------------------|-------------------|--------------|
| Typography size | "Next Generation Digital Agency" occupies significant viewport | Oversized headlines using clamp() with 12vw+ sizing | clamp(3rem, 12vw, 8rem) for main headline; ensure zoom support |
| Layout structure | Vertical hierarchy (headline → description → CTA) | Asymmetric grids, editorial compositions, overlapping layers | Explore asymmetric layout to differentiate from current centered approach |
| Animation/effects | Minimal details from markup alone | Scroll-driven animations, kinetic type, parallax (use sparingly) | Subtle scroll-driven fade/scale; avoid parallax distraction |
| Background treatment | Template structure suggests image/gradient | Solid colors, soft gradients, avoiding busy images | Continue with gradient glow; amplify or simplify based on type dominance |
| Color usage | Professional, corporate aesthetic | Bold color pairings, high contrast, accent colors | Maintain current teal accent; consider bolder gradient stops |
| Mobile approach | Responsive implied | Fluid typography (clamp), 90vh height, touch targets ≥44px | Adopt 90vh on mobile; rigorously test at 768px breakpoint |

## Current Homepage Analysis (Baseline)

**Existing features to preserve:**
- Gradient title effect (linear-gradient with background-clip: text)
- Glow effects (hero-bg-glow radial gradient)
- Grid pattern background (SVG data URI with mask)
- Fade-in animations (fadeInUp with stagger)
- Semantic HTML structure

**Gaps to address for "bold typography" goal:**
- Typography not dominating viewport (current max-w-[900px] container constrains it)
- Centered layout is "safe" — doesn't express creativity/originality
- Font sizes not using fluid viewport units (uses fixed Tailwind classes)
- No asymmetric or editorial composition
- Background effects compete with typography rather than supporting it

## Sources

**2026 Trends & Best Practices:**
- [15 Examples of Innovative Hero Typography Trends - Qode Interactive](https://qodeinteractive.com/magazine/innovative-typography-hero-trends/)
- [Hero Section Design: Best Practices & Examples for 2026 - Perfect Afternoon](https://www.perfectafternoon.com/2025/hero-section-design/)
- [Stunning hero sections for 2026: Layouts, patterns, and techniques - Lexington Themes](https://lexingtonthemes.com/blog/stunning-hero-sections-2026)
- [Breaking rules and bringing joy: top typography trends for 2026 - Creative Bloq](https://www.creativebloq.com/design/fonts-typography/breaking-rules-and-bringing-joy-top-typography-trends-for-2026)
- [Top Web Design Trends for 2026 - Figma](https://www.figma.com/resource-library/web-design-trends/)

**Technical Implementation:**
- [Viewport Sized Typography - CSS-Tricks](https://css-tricks.com/viewport-sized-typography/)
- [Linearly Scale font-size with CSS clamp() Based on the Viewport - CSS-Tricks](https://css-tricks.com/linearly-scale-font-size-with-css-clamp-based-on-the-viewport/)
- [Bringing Back Parallax With Scroll-Driven CSS Animations - CSS-Tricks](https://css-tricks.com/bringing-back-parallax-with-scroll-driven-css-animations/)
- [The best way to create a parallax scrolling effect in 2026 - Builder.io](https://www.builder.io/blog/parallax-scrolling-effect)

**Accessibility & Performance:**
- [How to Choose ADA-Compliant Fonts in 2026 - accessiBe](https://accessibe.com/blog/knowledgebase/ada-compliant-fonts)
- [Fixing Layout Shifts Caused by Web Fonts - DebugBear](https://www.debugbear.com/blog/web-font-layout-shift)
- [How to avoid layout shifts caused by web fonts - Simon Hearne](https://simonhearne.com/2021/layout-shifts-webfonts/)
- [Hero Section Optimization: Best Practices and Examples - Omniconvert](https://www.omniconvert.com/blog/hero-section-examples/)

**Design Patterns & Examples:**
- [Hero Section Design Inspiration: Over 80+ Website Examples - Really Good Designs](https://reallygooddesigns.com/hero-section-design-examples/)
- [CSS Skills: Hero Sections With Asymmetrical Design - Envato Tuts+](https://webdesign.tutsplus.com/css-hero-sections-with-asymmetrical-designs--cms-106695t)
- [Tips for Using a Typographic Hero vs. Hero Imagery - Telerik](https://www.telerik.com/blogs/tips-using-typographic-hero-imagery)

---
*Feature research for: Bold Typography-Driven Agency Hero Section*
*Researched: 2026-02-11*
