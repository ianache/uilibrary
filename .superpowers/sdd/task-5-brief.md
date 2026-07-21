# Task 5: Data Display & Feedback (Badge, Tag, Avatar)

**Files:**
- Create: `src/atoms/Badge/*` (Badge.tsx, Badge.module.css, Badge.stories.tsx, index.ts)
- Create: `src/atoms/Tag/*` (Tag.tsx, Tag.module.css, Tag.stories.tsx, index.ts)
- Create: `src/atoms/Avatar/*` (Avatar.tsx, Avatar.module.css, Avatar.stories.tsx, index.ts)
- Modify: `src/index.ts` (export Badge, Tag, Avatar)

**Interfaces:**
- Consumes: `clsx`, `src/tokens/tokens.css`
- Produces: `Badge`, `BadgeProps`, `BadgeVariant`, `BadgeSize`, `Tag`, `TagProps`, `TagVariant`, `Avatar`, `AvatarProps`, `AvatarSize`

## Acceptance Criteria & Specs

### Badge (AT-08)
- Props: `variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger'` (default 'default'), `size?: 'sm' | 'md'` (default 'md'), `children?: React.ReactNode`. Extends `React.HTMLAttributes<HTMLSpanElement>`.
- `border-radius: var(--radius-full)`.
- Non-interactive status indicator (`onClick` not supported — interactive badges use Button).
- Coordinated text color, background, and subtle border for each variant using tokens.
- `margin: 0`.

### Tag (AT-09)
- Props: `variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger'` (default 'default'), `removable?: boolean` (default false), `onRemove?: () => void`, `disabled?: boolean` (default false), `children?: React.ReactNode`. Extends `React.HTMLAttributes<HTMLSpanElement>`.
- Rectangular with `border-radius: var(--radius-sm)` (visual distinction from Badge).
- `removable=true`: renders `×` button with `aria-label="Eliminar etiqueta"`.
- `e.stopPropagation()` on `×` button click to prevent event bubbling.
- `disabled=true`: `onRemove` does not execute and visual disabled opacity applied.
- `margin: 0`.

### Avatar (AT-10)
- Props: `src?: string`, `initials?: string`, `size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'` (default 'md'), `alt?: string` (default ''). Extends `React.HTMLAttributes<HTMLSpanElement | HTMLImageElement>`.
- `forwardRef` to `<img>` (if src present) or `<span>` (if no src).
- Sizes in px: `xs`=24px, `sm`=32px, `md`=40px, `lg`=48px, `xl`=64px.
- With `src`: `<img>` with `object-fit: cover`, `border-radius: 50%`.
- Without `src`: `<span>` with initials (max 2 characters, `toUpperCase()`). Fallback bg `var(--color-primary-100)`, text `var(--color-primary-700)`.
- `margin: 0`.

## Steps
1. Create `src/atoms/Badge/` files.
2. Create `src/atoms/Tag/` files.
3. Create `src/atoms/Avatar/` files.
4. Export them in `src/index.ts`.
5. Verify type check: `npx tsc --noEmit`.
6. Commit: `git add src/atoms/Badge/ src/atoms/Tag/ src/atoms/Avatar/ src/index.ts ; git commit -m "feat: add Badge, Tag, and Avatar atoms"`
