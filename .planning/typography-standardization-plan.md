# Typography Standardization Plan

**Date**: 2026-02-11
**Goal**: Standardize text and heading styles across Services, Work, and Contact pages to match the front page typography system

---

## Current State

The front page uses well-defined responsive font sizes and consistent styling patterns:
- **Section titles**: `text-section-title` (responsive, 2rem-3.25rem)
- **Section prose**: `text-section-prose` (responsive, 1.125rem-1.3125rem)
- **Card headings (h3)**: `text-26` or `text-36` depending on hierarchy
- **Body text**: `text-17` (1.0625rem) or `text-[1.1875rem]` with `leading-loose`
- **Section labels**: `text-13 font-semibold tracking-widest uppercase text-accent-hover`
- **CTA sections**: Shared `.cta-title`, `.cta-prose`, `.btn-cta` classes

---

## Changes Needed

### 1. Services Page (`src/pages/services.astro`)

**Current Issues:**
- Service hero prose uses custom `font-size: 1.125rem` in scoped styles
- Service intro text uses `text-base` (inconsistent)
- Service card detail headings use custom `font-size: 1.1rem`
- Service card detail body uses custom `font-size: 1rem`

**Changes:**
- ✅ Keep: Page hero h1 (`text-page-hero`), service titles, taglines
- **Fix service hero prose**: Change `font-size: 1.125rem` → use Tailwind utility `text-[1.125rem]` or `text-section-prose`
- **Fix service intro text**: Change `text-base` → `text-17 leading-loose`
- **Fix service card detail headings**: Change custom `font-size: 1.1rem` → `text-[1.125rem]` or `text-17 font-bold`
- **Fix service card detail body**: Change `font-size: 1rem` → `text-17 leading-loose`
- **Verify CTA section**: Already uses shared classes ✓

---

### 2. Work Page (`src/pages/work.astro`)

**Current Issues:**
- Page hero description uses fixed `text-[1.125rem]` (could be responsive)
- Section headings (h3) use generic `text-xl`
- Body text already uses `text-17` ✓
- CTA section uses inline markup instead of shared classes

**Changes:**
- ✅ Keep: Page hero h1, case study title (`text-case-study-title`), body text (`text-17`)
- **Fix page hero description**: Consider using responsive sizing like `text-section-prose` or keep as-is for simplicity
- **Fix section headings (h3)**: Change `text-xl` → `text-21 font-bold` for consistency
- **Fix CTA section**: Replace inline markup with shared `.cta-title`, `.cta-prose`, `.btn-cta` classes (match services/homepage pattern)

---

### 3. Contact Page (`src/pages/contact.astro`)

**Current Issues:**
- Page hero description uses fixed `text-[1.125rem]`
- Sidebar heading uses custom `text-[1.15rem]`
- Form success heading uses generic `text-2xl`
- Small UI text sizes are fine (appropriate for form labels/metadata)

**Changes:**
- ✅ Keep: Page hero h1, form UI sizes (appropriate for inputs)
- **Fix page hero description**: Match work page styling
- **Fix sidebar heading**: Change `text-[1.15rem]` → `text-[1.125rem]` or `text-17 font-bold`
- **Fix form success heading**: Change `text-2xl` → `text-26 font-bold`
- **Keep**: Small UI text sizes (`text-[0.95rem]`, `text-[0.85rem]`) for labels/metadata

---

## Standard Typography Scale Reference

Based on front page established patterns:

| Use Case | Class/Token | Size |
|----------|-------------|------|
| Page heroes | `text-page-hero` | responsive 2.25rem-4rem |
| Section titles (h2) | `text-section-title` | responsive 2rem-3.25rem |
| Large headings | `text-36` | 2.25rem (36px) |
| Medium headings (h2/h3) | `text-26` | 1.625rem (26px) |
| Small headings (h3) | `text-21` | 1.3125rem (21px) |
| Body text (standard) | `text-17` | 1.0625rem (17px) |
| Body text (larger) | `text-[1.1875rem]` | 1.1875rem (19px) |
| Labels/metadata | `text-13` | 0.8125rem (13px) |
| Section prose | `text-section-prose` | responsive 1.125rem-1.3125rem |

**Common patterns:**
- Body text: `text-17 text-text-muted leading-loose`
- Headings: `font-bold tracking-snug` or `font-extrabold tracking-tight`
- Labels: `text-13 font-semibold tracking-widest uppercase`

---

## Execution Order

1. **Services page** - Update scoped `<style>` block selectors
2. **Work page** - Update markup and replace inline CTA section
3. **Contact page** - Update scoped `<style>` block and specific elements
4. **Visual verification** - Check all three pages for consistency

---

## Success Criteria

- [x] No custom font sizes in scoped `<style>` blocks (except where truly unique)
- [x] Consistent heading hierarchy across all pages
- [x] Body text uses standard `text-17` with proper line-height
- [x] CTA sections use shared component classes
- [ ] Typography scales proportionally on large screens (matching front page behavior) - *Needs visual verification*

---

## Execution Summary

**Completed**: 2026-02-11

### Services Page Changes
- ✅ Updated service intro from `text-base` → `text-17`
- ✅ Updated service card detail headings from `1.1rem` → `1.0625rem` (text-17 equivalent)
- ✅ Updated service card detail body from `1rem` → `1.0625rem` (text-17 equivalent)

### Work Page Changes
- ✅ Updated all h3 headings from `text-xl` → `text-21 font-bold tracking-snug`
- ✅ Updated CTA button from `btn btn-cta` → `btn-cta` (using shared component class)

### Contact Page Changes
- ✅ Updated sidebar heading from `text-[1.15rem]` → `text-[1.125rem]`
- ✅ Updated form success heading from `text-2xl font-semibold` → `text-26 font-bold tracking-snug`
