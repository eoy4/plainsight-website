# Phase 02: Font Loading Optimization - Research

**Researched:** 2026-02-11
**Domain:** Web font loading optimization, variable fonts, Core Web Vitals (CLS)
**Confidence:** HIGH

## Summary

Font loading optimization for Astro 5 static sites requires a multi-layered approach: self-hosting fonts for performance, preloading critical display fonts, implementing font-display strategies, and using font metric overrides for fallback fonts to eliminate layout shift. The project currently uses Google Fonts CDN with two fonts (Darker Grotesque variable font 300-900, Manrope static weights). Converting to self-hosted WOFF2 variable fonts with preload will reduce payload from ~376KB to ~89KB (55% reduction target) while eliminating layout shift.

**Primary recommendation:** Self-host both fonts as WOFF2 variable fonts, preload only Darker Grotesque (hero font), use font-display: swap with font metric overrides for fallback fonts to achieve CLS < 0.1.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| WOFF2 format | - | Font delivery format | 30% smaller than WOFF, universal browser support (Chrome 36+, Firefox 39+, Safari 10+, Edge 14+) |
| Google woff2 tool | Latest | TTF to WOFF2 conversion for variable fonts | Official Google tool, handles variable fonts correctly (online converters fail) |
| fontTools (Python) | Latest | Alternative font conversion | Industry standard, used by Next.js/font and other frameworks |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Astro experimental fonts API | 5.7.0+ | Unified font management with auto-preload | If using multiple font providers or need type-safe config (current project: manual approach simpler) |
| fontaine | Latest | Automatic fallback font metric calculation | If implementing font metric overrides (ascent-override, descent-override, size-adjust) |
| @fontsource packages | Latest | NPM-based self-hosted fonts | Alternative to manual download/conversion |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Self-hosting | Google Fonts CDN | CDN: worse privacy, extra DNS lookup, cache partitioning negates shared cache benefit. Self-hosting: 200-300ms faster |
| WOFF2 only | WOFF2 + WOFF fallback | WOFF adds ~15KB overhead, browser support for WOFF2 is 98%+ in 2026, not worth complexity |
| Manual preload | Astro experimental fonts API | API adds abstraction layer, project has only 2 fonts so manual `<link rel="preload">` is simpler |

**Installation:**
```bash
# If using Google woff2 tool (requires compilation)
git clone https://github.com/google/woff2.git && cd woff2 && make clean all

# If using fontTools (Python)
pip install fonttools[woff]

# If using @fontsource (alternative approach)
npm install @fontsource-variable/darker-grotesque @fontsource-variable/manrope
```

## Architecture Patterns

### Recommended Project Structure
```
public/
└── fonts/                    # Self-hosted font files
    ├── darker-grotesque-variable.woff2
    └── manrope-variable.woff2

src/
├── layouts/
│   └── Base.astro            # Add <link rel="preload"> for hero font
└── styles/
    └── tailwind.css          # @font-face declarations with fallback overrides
```

### Pattern 1: Self-Hosted Variable Font with Preload
**What:** Download variable font from Google Fonts, convert to WOFF2, host in `/public/fonts/`, declare via @font-face, preload critical font
**When to use:** When font is used above-the-fold and contributes to LCP/CLS

**Example:**
```html
<!-- Base.astro <head> -->
<link
  rel="preload"
  href="/fonts/darker-grotesque-variable.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

```css
/* tailwind.css */
@font-face {
  font-family: 'Darker Grotesque';
  src: url('/fonts/darker-grotesque-variable.woff2') format('woff2-variations');
  font-weight: 300 900;
  font-display: swap;
  font-style: normal;
}
```

**Source:** [Best practices for fonts - web.dev](https://web.dev/articles/font-best-practices)

### Pattern 2: Font Metric Overrides for Fallback
**What:** Use CSS font descriptors (ascent-override, descent-override, size-adjust) to match fallback font metrics to web font metrics, eliminating layout shift during swap
**When to use:** When using font-display: swap and need CLS < 0.1

**Example:**
```css
/* Match system sans-serif to Darker Grotesque metrics */
@font-face {
  font-family: 'Darker Grotesque Fallback';
  src: local('Arial'), local('Helvetica'), local('sans-serif');
  ascent-override: 95%;
  descent-override: 25%;
  line-gap-override: 0%;
  size-adjust: 105%;
}

@font-face {
  font-family: 'Darker Grotesque';
  src: url('/fonts/darker-grotesque-variable.woff2') format('woff2-variations');
  font-weight: 300 900;
  font-display: swap;
}

:root {
  --font-heading: 'Darker Grotesque', 'Darker Grotesque Fallback', sans-serif;
}
```

**Source:** [Improved font fallbacks - Chrome Developers](https://developer.chrome.com/blog/font-fallbacks)

### Pattern 3: Font Conversion (TTF → WOFF2)
**What:** Convert downloaded TTF variable font to WOFF2 for web delivery
**When to use:** Always (WOFF2 is 30% smaller than WOFF, universally supported)

**Example using fontTools:**
```python
from fontTools.ttLib import TTFont

font = TTFont("DarkerGrotesque-VariableFont_wght.ttf")
font.flavor = "woff2"
font.save("darker-grotesque-variable.woff2")
```

**Example using woff2_compress:**
```bash
woff2_compress DarkerGrotesque-VariableFont_wght.ttf
```

**Source:** [Converting variable fonts - Henry From Online](https://henry.codes/writing/how-to-convert-variable-ttf-font-files-to-woff2/)

### Anti-Patterns to Avoid
- **Loading fonts via @import:** Adds extra round trips, delays font discovery. Use `<link>` or inline `@font-face` instead.
- **Preloading without crossorigin:** Browser will fetch font twice (once for preload, once for actual use). Always include `crossorigin` attribute.
- **Preloading all fonts:** Only preload above-the-fold critical fonts (1-2 max). Preloading Manrope (body font) is unnecessary.
- **Using font-display: block:** Causes invisible text (FOIT) for up to 3 seconds. Use `swap` or `optional`.
- **Variable font preload without size check:** Variable fonts are larger; only preload if file is <50KB or critical for LCP.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Font metric calculation | Manual trial-and-error for ascent/descent/size-adjust | fontaine library or Chrome DevTools font override panel | Requires precise math based on font metrics tables, easy to get wrong |
| Font subsetting | Custom Python script to remove unused glyphs | Google Fonts API with `&text=` parameter or fontTools.subset | Unicode ranges, ligatures, kerning must be preserved correctly |
| Font conversion pipeline | Shell scripts chaining tools | fontTools Python library | Variable font axes, hinting, and metadata easily corrupted |
| Fallback font selection | Guessing system fonts | @font-face src: local() chain based on OS detection | Arial/Helvetica/Roboto have different metrics, need OS-specific fallbacks |

**Key insight:** Font metrics are binary-level data (ascent, descent, line gap, x-height) that require reading font tables. Manual calculation is error-prone and tools already exist.

## Common Pitfalls

### Pitfall 1: Forgetting crossorigin on Preload
**What goes wrong:** Browser downloads font twice—once during preload (ignored), once when CSS requests it
**Why it happens:** Font requests use CORS mode, preload defaults to non-CORS. Mismatched credentials = cache miss.
**How to avoid:** Always include `crossorigin` attribute even for same-origin fonts: `<link rel="preload" href="/fonts/font.woff2" as="font" type="font/woff2" crossorigin>`
**Warning signs:** Network tab shows two identical font requests, preload shows unused warning

**Source:** [Preload web fonts - web.dev](https://web.dev/articles/codelab-preload-web-fonts)

### Pitfall 2: font-display: swap Without Fallback Metrics
**What goes wrong:** Text visible immediately with fallback font, then "jumps" when web font loads (CLS > 0.1)
**Why it happens:** Darker Grotesque and Arial have different character widths, line heights, causing reflow
**How to avoid:** Use font metric override descriptors (ascent-override, descent-override, size-adjust) or font-display: optional (hides text for 100ms, no swap if font not loaded)
**Warning signs:** Lighthouse reports CLS > 0.1, visible text reflow on slow connections

**Source:** [Fixing Layout Shifts Caused by Web Fonts - DebugBear](https://www.debugbear.com/blog/web-font-layout-shift)

### Pitfall 3: Preloading Variable Fonts Without Size Check
**What goes wrong:** Variable font file is 100-200KB, preloading blocks other critical resources (CSS, JS, images)
**Why it happens:** Variable fonts contain all weight/width/italic data in one file = larger than static fonts
**How to avoid:** Check file size after WOFF2 conversion. Only preload if <50KB OR font is critical for LCP (hero text). Otherwise let browser discover via CSS.
**Warning signs:** Lighthouse warns "preload key requests" but LCP doesn't improve, large fonts delay FCP

**Source:** [Should you preload fonts for performance - Erwin Hofman](https://www.erwinhofman.com/blog/should-you-preload-fonts-for-performance/)

### Pitfall 4: Not Testing on Slow 3G
**What goes wrong:** Font loading strategy works on fast WiFi but causes FOIT (invisible text) or FOUT (unstyled flash) on mobile
**Why it happens:** Font files take 2-5 seconds to download on slow 3G (1.6 Mbps, 300ms RTT)
**How to avoid:** Use Chrome DevTools → Network → Slow 3G throttling. Test with empty cache. Verify text is visible within 100ms (font-display: swap or optional).
**Warning signs:** User reports on mobile show blank hero section, high bounce rate on mobile vs desktop

**Source:** [You're loading fonts wrong - Jono Alderson](https://www.jonoalderson.com/performance/youre-loading-fonts-wrong/)

### Pitfall 5: Using format('woff2') for Variable Fonts
**What goes wrong:** Browser doesn't recognize font as variable, uses first weight instance (usually 400) for all weights
**Why it happens:** Variable fonts require `format('woff2-variations')` or `format('woff2 supports variations')` to enable font-variation-settings
**How to avoid:** Use `format('woff2-variations')` in @font-face src. Also declare `font-weight: 300 900` range, not single weight.
**Warning signs:** All headings look same weight despite different font-weight in CSS, browser DevTools shows font not variable

**Source:** Research finding (common issue with variable font declarations)

## Code Examples

Verified patterns from official sources:

### Complete Self-Hosted Variable Font Setup
```html
<!-- src/layouts/Base.astro -->
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Preload critical font (hero display font only) -->
    <link
      rel="preload"
      href="/fonts/darker-grotesque-variable.woff2"
      as="font"
      type="font/woff2"
      crossorigin
    />

    <title>{title}</title>
  </head>
  <body>
    <slot />
  </body>
</html>
```

```css
/* src/styles/tailwind.css - @font-face declarations */

/* Darker Grotesque variable font (hero/headings) */
@font-face {
  font-family: 'Darker Grotesque';
  src: url('/fonts/darker-grotesque-variable.woff2') format('woff2-variations');
  font-weight: 300 900;
  font-display: swap;
  font-style: normal;
}

/* Darker Grotesque fallback with matched metrics */
@font-face {
  font-family: 'Darker Grotesque Fallback';
  src: local('Arial'), local('Helvetica'), local('sans-serif');
  ascent-override: 95%;
  descent-override: 25%;
  line-gap-override: 0%;
  size-adjust: 105%;
}

/* Manrope variable font (body text) */
@font-face {
  font-family: 'Manrope';
  src: url('/fonts/manrope-variable.woff2') format('woff2-variations');
  font-weight: 400 800;
  font-display: swap;
  font-style: normal;
}

/* Manrope fallback with matched metrics */
@font-face {
  font-family: 'Manrope Fallback';
  src: local('system-ui'), local('-apple-system'), local('BlinkMacSystemFont');
  ascent-override: 90%;
  descent-override: 22%;
  line-gap-override: 0%;
  size-adjust: 102%;
}

@theme {
  --font-sans: 'Manrope', 'Manrope Fallback', system-ui, -apple-system, sans-serif;
  --font-heading: 'Darker Grotesque', 'Darker Grotesque Fallback', system-ui, -apple-system, sans-serif;
}
```

**Source:** [Font-display - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@font-face/font-display)

### Download and Convert Google Fonts to WOFF2
```bash
# Step 1: Download variable font from Google Fonts
# Visit https://fonts.google.com/specimen/Darker+Grotesque
# Click "Download family" → extract ZIP → locate DarkerGrotesque-VariableFont_wght.ttf

# Step 2: Convert TTF to WOFF2 using fontTools
python3 -c "
from fontTools.ttLib import TTFont
font = TTFont('DarkerGrotesque-VariableFont_wght.ttf')
font.flavor = 'woff2'
font.save('darker-grotesque-variable.woff2')
"

# Step 3: Move to public/fonts
mkdir -p public/fonts
mv darker-grotesque-variable.woff2 public/fonts/

# Step 4: Verify file size (should be 40-60KB for Darker Grotesque)
ls -lh public/fonts/darker-grotesque-variable.woff2
```

**Source:** [Converting TTF variable fonts to WOFF2 - Henry From Online](https://henry.codes/writing/how-to-convert-variable-ttf-font-files-to-woff2/)

### Testing CLS with Slow 3G Simulation
```bash
# Using Chrome DevTools
# 1. Open DevTools → Network tab
# 2. Throttling dropdown → "Slow 3G"
# 3. Disable cache
# 4. Reload page
# 5. Observe hero text:
#    - Good: Text visible immediately with fallback, smooth swap
#    - Bad: Invisible text (FOIT) or visible layout jump (CLS)

# Using Lighthouse CLI
npx lighthouse http://localhost:4321 \
  --throttling.requestLatencyMs=400 \
  --throttling.downloadThroughputKbps=400 \
  --only-categories=performance \
  --view
# Check "Cumulative Layout Shift" metric (target: < 0.1)
```

**Source:** [How to Fix Cumulative Layout Shift Issues - Smashing Magazine](https://www.smashingmagazine.com/2021/06/how-to-fix-cumulative-layout-shift-issues/)

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Google Fonts CDN | Self-hosted WOFF2 | 2021-2022 | Cache partitioning killed CDN cache benefit, self-hosting 200-300ms faster |
| Multiple static font files (400.woff2, 700.woff2) | Single variable font file | 2020+ | Reduces HTTP requests, 30-50% smaller payload, supports any weight |
| font-display: auto | font-display: swap or optional | 2019+ | Eliminates FOIT, prevents invisible text >100ms |
| Manual fallback fonts | Font metric overrides (ascent-override, size-adjust) | 2021+ | Reduces CLS from 0.2-0.3 to <0.05, pixel-perfect fallback matching |
| Preload all fonts | Preload only LCP fonts | 2023+ | Prevents preload from blocking other critical resources |

**Deprecated/outdated:**
- **WOFF 1.0:** Use WOFF2 (30% smaller, universal support)
- **EOT, TTF, SVG formats in @font-face:** WOFF2 only in 2026
- **font-display: block:** Causes FOIT up to 3 seconds (bad UX on slow connections)
- **unicode-range subsetting via @font-face:** Google Fonts API `&text=` parameter more reliable
- **@import for fonts:** Delays font discovery by 1+ round trip

## Open Questions

1. **Exact font metric values for Darker Grotesque and Manrope fallbacks**
   - What we know: Font metric overrides require ascent-override, descent-override, size-adjust calculated from font tables
   - What's unclear: Precise values without analyzing .woff2 files with fontTools or using fontaine library
   - Recommendation: Use fontaine library to auto-calculate OR use Chrome DevTools font editor to manually adjust until no layout shift visible

2. **Optimal preload strategy for variable fonts >50KB**
   - What we know: Darker Grotesque variable font likely 40-60KB, Manrope variable likely 30-50KB after WOFF2 conversion
   - What's unclear: If both fonts together exceed 100KB, should we preload both or only Darker Grotesque?
   - Recommendation: Convert fonts first, check sizes. Preload only if Darker Grotesque <50KB. Let Manrope (body font) lazy-load via CSS.

3. **font-display: swap vs optional for hero font**
   - What we know: swap = guaranteed visible text, possible layout shift; optional = no layout shift, but font may not load on slow 3G
   - What's unclear: Is hero typography more important than preventing FOUT on slow connections?
   - Recommendation: Use swap + font metric overrides (best of both: visible text + no layout shift)

## Sources

### Primary (HIGH confidence)
- [Best practices for fonts - web.dev](https://web.dev/articles/font-best-practices) - Font loading fundamentals, preload strategy
- [Improved font fallbacks - Chrome Developers](https://developer.chrome.com/blog/font-fallbacks) - Font metric override descriptors
- [Preload web fonts to improve loading speed - web.dev](https://web.dev/articles/codelab-preload-web-fonts) - Crossorigin attribute requirement
- [Using custom fonts - Astro Docs](https://docs.astro.build/en/guides/fonts/) - Astro font loading patterns
- [Experimental fonts API - Astro Docs](https://docs.astro.build/en/reference/experimental-flags/fonts/) - Astro 5.7.0+ fonts API features
- [font-display - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@font-face/font-display) - Font-display property specification
- [WOFF 2.0 browser support - Can I use](https://caniuse.com/woff2) - Browser compatibility data

### Secondary (MEDIUM confidence)
- [Fixing Layout Shifts Caused by Web Fonts - DebugBear](https://www.debugbear.com/blog/web-font-layout-shift) - CLS mitigation strategies (verified with Google's web.dev)
- [Self-hosted fonts vs Google Fonts API - LogRocket](https://blog.logrocket.com/self-hosted-fonts-vs-google-fonts-api/) - Performance comparison (2021 data, still relevant with cache partitioning)
- [Converting variable fonts - Henry From Online](https://henry.codes/writing/how-to-convert-variable-ttf-font-files-to-woff2/) - TTF to WOFF2 conversion (verified with fontTools docs)
- [GitHub - unjs/fontaine](https://github.com/unjs/fontaine) - Font metric override automation library
- [Framework tools for font fallbacks - Chrome Developers](https://developer.chrome.com/blog/framework-tools-font-fallback/) - Next.js/Nuxt font optimization

### Tertiary (LOW confidence - marked for validation)
- [Should you preload fonts for performance - Erwin Hofman](https://www.erwinhofman.com/blog/should-you-preload-fonts-for-performance/) - Variable font preload guidance (blog post, not official docs)
- [You're loading fonts wrong - Jono Alderson](https://www.jonoalderson.com/performance/youre-loading-fonts-wrong/) - @import pitfall (personal blog, but widely cited)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - WOFF2 format, fontTools, and self-hosting are industry standard verified by web.dev and MDN
- Architecture: HIGH - Preload patterns documented in official web.dev guides, font metric overrides in Chrome DevTools docs
- Pitfalls: HIGH - crossorigin requirement in W3C preload spec, CLS threshold in Google's Core Web Vitals documentation

**Research date:** 2026-02-11
**Valid until:** 2026-03-13 (30 days - font loading patterns are stable, browser support unlikely to change)
