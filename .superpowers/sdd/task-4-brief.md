# Task 4: Graphic & Content Atoms (Icon & Typography)

**Files:**
- Create: `src/atoms/Icon/*` (Icon.tsx, Icon.module.css, Icon.stories.tsx, index.ts)
- Create: `src/atoms/Typography/*` (Typography.tsx, Typography.module.css, Typography.stories.tsx, index.ts)
- Modify: `src/index.ts` (export Icon, Typography)

**Interfaces:**
- Consumes: `clsx`, `src/tokens/tokens.css`
- Produces: `Icon`, `IconProps`, `IconName`, `iconPaths`, `Typography`, `TypographyProps`, `TypographyVariant`, `TypographyColor`

## Acceptance Criteria & Specs

### Icon (AT-06)
- Props: `name: IconName`, `size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'` (default 'md'), `label?: string`. Extends `Omit<React.SVGProps<SVGSVGElement>, 'name' | 'size'>`.
- SVG viewBox `0 0 24 24`, `stroke="currentColor"`, `fill="none"`, `strokeWidth={2}`, `strokeLinecap="round"`, `strokeLinejoin="round"`.
- Pixel sizes: `xs`=12px, `sm`=16px, `md`=20px, `lg`=24px, `xl`=32px.
- Catalog (at least 33 icon SVG path strings exported in `iconPaths` object):
  - Navigation: home, menu, chevron-down, chevron-up, chevron-right, chevron-left, arrow-right, arrow-left, external-link
  - Actions: search, plus, minus, edit, trash, copy, download, upload, filter, log-out
  - Status: check, close, info, warning, check-circle, x-circle, loader
  - UI: user, settings, mail, bell, lock, calendar, eye, eye-off, star, heart
- Accessibility: Without `label`: `aria-hidden="true"`. With `label`: `aria-label={label}` + `role="img"`.
- Unknown icon name: return `null` without crashing.
- Export `iconPaths` object. `margin: 0`.

### Typography (AT-07)
- Props: `variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body-lg' | 'body' | 'body-sm' | 'caption' | 'overline' | 'code'` (default 'body'), `color?: 'primary' | 'secondary' | 'muted' | 'disabled' | 'accent' | 'success' | 'warning' | 'danger' | 'inherit'` (default 'primary'), `as?: React.ElementType`, `truncate?: boolean` (default false), `children?: React.ReactNode`. Extends `React.HTMLAttributes<HTMLElement>`.
- `forwardRef` to HTML element. Default HTML tag mapping:
  - `h1-h6` -> `<h1>-<h6>`
  - `body-lg`, `body`, `body-sm` -> `<p>`
  - `caption`, `overline` -> `<span>`
  - `code` -> `<code>`
- Overriding tag via `as` prop (e.g. `variant="h2" as="h1"`).
- `margin: 0` on all variants.
- Font family: `var(--font-sans)` except for `code` -> `var(--font-mono)`.
- `overline`: text-transform uppercase, letter-spacing 0.08em.
- `code`: background `var(--color-bg-muted)`, border `var(--color-border)`, inline padding.
- `truncate`: overflow hidden, text-overflow ellipsis, white-space nowrap.

## Steps
1. Create `src/atoms/Icon/` files.
2. Create `src/atoms/Typography/` files.
3. Export them in `src/index.ts`.
4. Verify type check: `npx tsc --noEmit`.
5. Commit: `git add src/atoms/Icon/ src/atoms/Typography/ src/index.ts ; git commit -m "feat: add Icon and Typography atoms"`
