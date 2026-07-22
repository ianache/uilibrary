# Task 2: Viewport Overlays, Tabs & Layouts (Modal, Drawer, Tabs, Card)

**Files:**
- Create: `src/organisms/Modal/*` (Modal.tsx, Modal.module.css, Modal.stories.tsx, index.ts)
- Create: `src/organisms/Drawer/*` (Drawer.tsx, Drawer.module.css, Drawer.stories.tsx, index.ts)
- Create: `src/organisms/Tabs/*` (Tabs.tsx, Tabs.module.css, Tabs.stories.tsx, index.ts)
- Create: `src/organisms/Card/*` (Card.tsx, Card.module.css, Card.stories.tsx, index.ts)
- Modify: `src/index.ts` (export Modal, Drawer, Tabs, Card)

**Interfaces:**
- Consumes: `clsx`, `src/tokens/tokens.css`, React Portals, lower-level atoms & molecules
- Produces: `Modal`, `ModalProps`, `Drawer`, `DrawerProps`, `Tabs`, `TabsProps`, `Card`, `CardProps`

## Acceptance Criteria & Specs

### Modal (OR-06)
- Props: `isOpen: boolean`, `onClose: () => void`, `title?: string`, `description?: string`, `size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'` (default: 'md'), `children: React.ReactNode`, `footer?: React.ReactNode`, `closeOnOverlay?: boolean` (default: true), `closeOnEsc?: boolean` (default: true), `loading?: boolean` (default: false). Extends `React.HTMLAttributes<HTMLDivElement>`.
- Portal: Renders via `createPortal` to `document.body`.
- Scroll Lock: Blocks `<body>` scroll when open (`document.body.style.overflow = 'hidden'`), restores on close/unmount.
- Focus Trap:
  - Keeps focus cycling inside the modal elements (Tab and Shift+Tab).
  - First focus when opening: focus first focusable child element or modal close button.
  - Return focus: restores focus to the previously active element in the DOM before the modal opened.
- Sizing max widths: `sm`=400px, `md`=560px, `lg`=720px, `xl`=960px, `full`=100vw - 32px.
- Close actions: Close on escape (if `closeOnEsc=true`), close on overlay click (if `closeOnOverlay=true`).
- loading=true: Disables footer buttons, displays a `Spinner` (or custom spinner text/icon) in the header.
- Accessibility roles: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` linked to header title, `aria-describedby` linked to header description.
- `margin: 0` on root.

### Drawer (OR-09)
- Props: `isOpen: boolean`, `onClose: () => void`, `title?: string`, `placement?: 'left' | 'right' | 'top' | 'bottom'` (default: 'right'), `size?: 'sm' | 'md' | 'lg' | 'full'` (default: 'md'), `children: React.ReactNode`, `footer?: React.ReactNode`, `closeOnOverlay?: boolean` (default: true), `closeOnEsc?: boolean` (default: true). Extends `React.HTMLAttributes<HTMLDivElement>`.
- Portal & Focus Trap & Scroll lock: Shared behavior with Modal (portal to body, body scroll-lock, Tab focus-trap, restore focus, Escape dismiss, overlay dismiss).
- Animación slide transition: Emerges from the specified `placement` edge. CSS transitions on `transform` (`right` -> `translateX(100%)` to `translateX(0)`).
- Sizes mapping (width/height):
  - left/right: `sm`=320px, `md`=480px, `lg`=640px, `full`=100vw.
  - top/bottom: `sm`=240px, `md`=360px, `lg`=480px, `full`=100vh.
- Accessibility: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` linked to title.
- `margin: 0` on root.

### Tabs (OR-07)
- Props: `tabs: TabItem[]`, `activeId: string`, `onChange: (id: string) => void`, `variant?: 'line' | 'pill' | 'card'` (default: 'line'), `orientation?: 'horizontal' | 'vertical'` (default: 'horizontal'), `fullWidth?: boolean` (default: false). Extends `React.HTMLAttributes<HTMLDivElement>`.
- Tipo TabItem: `{ id: string; label: string; icon?: IconName; badge?: string | number; disabled?: boolean; content: React.ReactNode }`
- Keyboard navigation:
  - Arrows: Arrow keys Up/Down (if vertical) or Left/Right (if horizontal) roving focus between tab headers.
  - Home/End: Jump focus to first/last non-disabled tab header.
  - Active: Triggers `onChange(id)` on Enter/Space, or immediately on arrow key navigation.
- Accessibility: Container has `role="tablist"`. Each tab button has `role="tab"`, `aria-selected={activeId === tab.id}`, `aria-controls={`panel-${tab.id}`}`. Each panel container has `role="tabpanel"`, `id={`panel-${tab.id}`}`, `aria-labelledby={`tab-${tab.id}`}`.
- Variants:
  - `line`: active tab shows bottom indicator border/bar with CSS animation.
  - `pill`: active tab gets bg primary-100 and radius full.
  - `card`: active tab renders as tab sheet card without bottom border.
- Panel visibility: Only active tab content is visible (can use conditional React mount or `display: none` in CSS to keep state).
- `margin: 0` on root.

### Card (OR-08)
- Props: `title?: string`, `subtitle?: string`, `headerAction?: React.ReactNode`, `footer?: React.ReactNode`, `media?: { src: string; alt: string; aspect?: '16/9' | '4/3' | '1/1' }`, `variant?: 'default' | 'outlined' | 'elevated' | 'ghost'` (default: 'default'), `padding?: 'none' | 'sm' | 'md' | 'lg'` (default: 'md'), `hoverable?: boolean` (default: false), `selected?: boolean` (default: false), `loading?: boolean` (default: false), `onClick?: () => void`, `children: React.ReactNode`. Extends `React.HTMLAttributes<HTMLDivElement>`.
- Interactive: If `onClick` is provided: `role="button"`, `tabIndex={0}`, keyboard handlers (Space/Enter trigger onClick), cursor pointer, hover background.
- selected=true: Border `var(--color-primary-400)` and background `var(--color-primary-50)`.
- hoverable=true: Box shadow on hover (`box-shadow: var(--shadow-md)` or similar shadow token).
- loading=true: Replaces content/children with a visual shimmer skeleton block (e.g. 3 lines of blank bars with sliding animation).
- Media: Render `<img>` inside card top with specified aspect-ratio and object-fit cover.
- `margin: 0` on root.

## Steps
1. Create `src/organisms/Modal/` files.
2. Create `src/organisms/Drawer/` files.
3. Create `src/organisms/Tabs/` files.
4. Create `src/organisms/Card/` files.
5. Export them in `src/index.ts`.
6. Verify type check: `npx tsc --noEmit`.
7. Commit: `git add src/organisms/Modal/ src/organisms/Drawer/ src/organisms/Tabs/ src/organisms/Card/ src/index.ts ; git commit -m "feat: add Modal, Drawer, Tabs, and Card organisms"`
