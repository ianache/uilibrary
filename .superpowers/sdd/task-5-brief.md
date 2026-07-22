# Task 5: Status Indicators & Dynamic UI (ProgressBar & Tooltip)

**Files:**
- Create: `src/molecules/ProgressBar/*` (ProgressBar.tsx, ProgressBar.module.css, ProgressBar.stories.tsx, index.ts)
- Create: `src/molecules/Tooltip/*` (Tooltip.tsx, Tooltip.module.css, Tooltip.stories.tsx, index.ts)
- Modify: `src/index.ts` (export ProgressBar, Tooltip)

**Interfaces:**
- Consumes: `clsx`, `src/tokens/tokens.css`, `Typography` (atom)
- Produces: `ProgressBar`, `ProgressBarProps`, `Tooltip`, `TooltipProps`

## Acceptance Criteria & Specs

### ProgressBar (ML-09)
- Props: `value: number` (required), `max?: number` (default: 100), `variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger'` (default: 'primary'), `size?: 'sm' | 'md' | 'lg'` (default: 'md'), `label?: string`, `showValue?: boolean` (default: false), `animated?: boolean` (default: false), `striped?: boolean` (default: false). Extends `React.HTMLAttributes<HTMLDivElement>`.
- Clamps value: `value` is clamped between 0 and `max`.
- Accessibility: Renders `role="progressbar"`, `aria-valuenow={value}`, `aria-valuemin={0}`, `aria-valuemax={max}`.
- Layout:
  - Track: Background `var(--color-bg-muted)` (or neutral light), border-radius `var(--radius-full)`.
  - Fill: Width computed dynamically as percentage (`(value / max) * 100%`). Transition CSS for width change (`transition: width 0.4s ease`). Background matches variant colors.
  - Sizing heights: `sm`=4px, `md`=8px, `lg`=12px.
- Styling extensions:
  - `striped=true`: diagonal linear-gradient pattern on progress fill background.
  - `animated=true`: shifts background-size/position using CSS animation keyframes (only applies when `striped` is true).
- `margin: 0` on root.

### Tooltip (ML-10)
- Props: `content: string` (required), `placement?: 'top' | 'bottom' | 'left' | 'right'` (default: 'top'), `children: React.ReactNode` (required, the trigger), `delay?: number` (default: 200).
- Pure CSS positioning (no JavaScript boundaries calculations):
  - Container: `position: relative`, `display: inline-flex` (or inline-block).
  - Floating element: `position: absolute`, z-index `1000` (or var(--z-tooltip)), white-space `nowrap`. Background `var(--color-text-primary)` (or neutral dark `#0f172a`), text `#ffffff`, padding `var(--space-1) var(--space-2)`, font-size `12px` (caption/body-xs), border-radius `var(--radius-md)`.
  - Flecha: CSS triangle (`::before` / `::after` border trick) matching the placement direction.
- Accessibility: Renders `role="tooltip"` on tooltip element, and `aria-describedby` on the child trigger pointing to the tooltip's id. Since `children` can be a ReactNode, if it is a single React element, clone it to inject `aria-describedby` and `tabIndex={0}` (so it is focusable). If not a single element, wrap in a focusable `<span>` or similar container with `aria-describedby`. (Cloning element if it is a single element is cleaner).
- Visibility: Hidden by default (`opacity: 0`, `pointer-events: none`). Becomes visible (`opacity: 1`) on container hover (`:hover`) and focus-within (`:focus-within`), with a transition delay matching the `delay` prop (e.g. `transition-delay: 200ms`).
- Placements logic:
  - `top` -> `bottom: calc(100% + 8px); left: 50%; transform: translateX(-50%)`
  - `bottom` -> `top: calc(100% + 8px); left: 50%; transform: translateX(-50%)`
  - `left` -> `right: calc(100% + 8px); top: 50%; transform: translateY(-50%)`
  - `right` -> `left: calc(100% + 8px); top: 50%; transform: translateY(-50%)`

## Steps
1. Create `src/molecules/ProgressBar/` files.
2. Create `src/molecules/Tooltip/` files.
3. Export them in `src/index.ts`.
4. Verify type check: `npx tsc --noEmit`.
5. Commit: `git add src/molecules/ProgressBar/ src/molecules/Tooltip/ src/index.ts ; git commit -m "feat: add ProgressBar and Tooltip molecules"`
