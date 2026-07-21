# Task 6: Feedback, Dividers & Barrel Export

**Files:**
- Create: `src/atoms/Spinner/*` (Spinner.tsx, Spinner.module.css, Spinner.stories.tsx, index.ts)
- Create: `src/atoms/Divider/*` (Divider.tsx, Divider.module.css, Divider.stories.tsx, index.ts)
- Modify: `src/index.ts` (complete re-export of all 12 atoms and tokens system)

**Interfaces:**
- Consumes: `clsx`, `src/tokens/tokens.css`, all 12 atoms
- Produces: `Spinner`, `SpinnerProps`, `SpinnerSize`, `SpinnerVariant`, `Divider`, `DividerProps`, `DividerOrientation`, `DividerVariant`, `DividerLabelAlign`, root `src/index.ts` barrel export.

## Acceptance Criteria & Specs

### Spinner (AT-11)
- Props: `size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'` (default 'md'), `variant?: 'primary' | 'secondary' | 'white'` (default 'primary'), `label?: string` (default 'Cargando...'). Extends `React.HTMLAttributes<HTMLDivElement>`.
- `forwardRef` to `<div>`.
- `role="status"` + `aria-label={label}` + visually hidden label text via `.sr-only` class (`position: absolute`, `width: 1px`, `height: 1px`, `overflow: hidden`, `clip: rect(0, 0, 0, 0)`).
- Sizes in px: `xs`=12, `sm`=16, `md`=20, `lg`=24, `xl`=32.
- Partial border (3 sides visible, 1 side transparent) + CSS `@keyframes spin`.
- Primary: border `var(--color-primary-200)`, top `var(--color-primary-600)`.
- Secondary: border `#e2e8f0`, top `#64748b`.
- White: border `rgba(255,255,255,0.3)`, top `#ffffff`.
- `margin: 0`.

### Divider (AT-12)
- Props: `orientation?: 'horizontal' | 'vertical'` (default 'horizontal'), `variant?: 'solid' | 'dashed' | 'dotted'` (default 'solid'), `label?: string`, `labelAlign?: 'start' | 'center' | 'end'` (default 'center'). Extends `React.HTMLAttributes<HTMLDivElement | HTMLHRElement>`.
- `forwardRef` to `<hr>` or `<div>`.
- Horizontal without label -> `<hr role="separator">`.
- Vertical -> `<div>` with `aria-orientation="vertical"`.
- With label -> `<div>` flex container with flanked lines.
- `labelAlign="start"` -> hide left line. `labelAlign="end"` -> hide right line.
- Color: `var(--color-border)`.
- `margin: 0`.

### Barrel Export & Full Build Check
- `src/index.ts` must export all 12 atoms (`Avatar`, `Badge`, `Button`, `Checkbox`, `Divider`, `Icon`, `Input`, `Select`, `Spinner`, `Tag`, `Textarea`, `Typography`) and `tokens`.
- Execute `npx tsc --noEmit` and `npm run build`.

## Steps
1. Create `src/atoms/Spinner/` files.
2. Create `src/atoms/Divider/` files.
3. Update `src/index.ts` with all exports.
4. Verify type check and build: `npx tsc --noEmit && npm run build`.
5. Commit: `git add src/atoms/Spinner/ src/atoms/Divider/ src/index.ts ; git commit -m "feat: add Spinner and Divider atoms and finalize barrel export"`
