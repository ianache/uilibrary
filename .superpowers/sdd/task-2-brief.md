# Task 2: Display & Information Molecules (UserCard & Notification)

**Files:**
- Create: `src/molecules/UserCard/*` (UserCard.tsx, UserCard.module.css, UserCard.stories.tsx, index.ts)
- Create: `src/molecules/Notification/*` (Notification.tsx, Notification.module.css, Notification.stories.tsx, index.ts)
- Modify: `src/index.ts` (export UserCard, Notification)

**Interfaces:**
- Consumes: `clsx`, `src/tokens/tokens.css`, `Avatar` (atom), `Typography` (atom), `Badge` (atom), `Icon` (atom), `Button` (atom)
- Produces: `UserCard`, `UserCardProps`, `Notification`, `NotificationProps`

## Acceptance Criteria & Specs

### UserCard (ML-03)
- Props: `name: string` (required), `role?: string`, `email?: string`, `avatarSrc?: string`, `status?: 'online' | 'offline' | 'away' | 'busy'`, `size?: 'sm' | 'md' | 'lg'` (default: 'md'), `onClick?: () => void`, `selected?: boolean` (default: false). Extends `React.HTMLAttributes<HTMLDivElement>`.
- Interactive handling if `onClick` is provided: `role="button"`, `tabIndex={0}`, cursor pointer, hover background, keyboard key handlers (Space/Enter trigger `onClick`).
- `selected=true`: Primary border (`var(--color-primary-600)`) and light primary background (`var(--color-primary-100)`).
- Avatar initials fallback (max 2 uppercase chars extracted from first and last name, e.g. "John Doe" -> "JD", "Jane" -> "JA", or similar).
- Status to Badge mapping:
  - `online` -> `success` ('En línea')
  - `offline` -> `default` ('Desconectado')
  - `away` -> `warning` ('Ausente')
  - `busy` -> `danger` ('Ocupado')
- Sizing mappings (Avatar size & Typography variant):
  - `sm` -> `xs` Avatar, `body-sm` name
  - `md` -> `sm` Avatar, `body` name
  - `lg` -> `md` Avatar, `body-lg` name
- `margin: 0` on root.

### Notification (ML-04)
- Props: `variant?: 'info' | 'success' | 'warning' | 'error'` (default: 'info'), `title?: string`, `message: string` (required), `dismissible?: boolean` (default: false), `onDismiss?: () => void`, `action?: { label: string; onClick: () => void }`, `icon?: boolean` (default: true). Extends `React.HTMLAttributes<HTMLDivElement>`.
- Accessibility: Renders `role="alert"` for variants `error` and `warning`, and `role="status"` for `info` and `success`.
- `dismissible=true`: Renders a close button `×` in the top right corner.
- `action` is present: Renders an action text button (`variant="ghost"`) right-aligned.
- Icons mapping:
  - `info` -> `info`
  - `success` -> `check-circle`
  - `warning` -> `warning`
  - `error` -> `x-circle`
- Layout: `display: flex`, `gap: var(--space-3)`, `padding: var(--space-4)`, `border: 1px solid`, `border-radius: var(--radius-lg)`. Icon aligned-self to `flex-start`. Area of text takes `flex: 1`. Colors from tokens:
  - `info`: bg `var(--color-primary-100)` (or custom primary light), border primary border.
  - `success`: bg `#f0fdf4`, border `#bbf7d0`.
  - `warning`: bg `#fffbeb`, border `#fde68a`.
  - `error`: bg `#fef2f2`, border `#fecaca`.
- `margin: 0` on root.

## Steps
1. Create `src/molecules/UserCard/` files.
2. Create `src/molecules/Notification/` files.
3. Export them in `src/index.ts`.
4. Verify type check: `npx tsc --noEmit`.
5. Commit: `git add src/molecules/UserCard/ src/molecules/Notification/ src/index.ts ; git commit -m "feat: add UserCard and Notification molecules"`
