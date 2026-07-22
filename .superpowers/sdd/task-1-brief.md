# Task 1: Navigation Shell & Frames (Header, Sidebar, UserMenu, Navbar)

**Files:**
- Create: `src/organisms/Header/` (Header.tsx, Header.module.css, Header.stories.tsx, index.ts)
- Create: `src/organisms/Sidebar/` (Sidebar.tsx, Sidebar.module.css, Sidebar.stories.tsx, index.ts)
- Create: `src/organisms/UserMenu/` (UserMenu.tsx, UserMenu.module.css, UserMenu.stories.tsx, index.ts)
- Create: `src/organisms/Navbar/` (Navbar.tsx, Navbar.module.css, Navbar.stories.tsx, index.ts)

**Interfaces:**
- Consumes: `clsx`, `src/tokens/tokens.css`, lower-level atoms & molecules (SearchBar, Breadcrumb, UserCard, Tooltip)
- Produces: `Header`, `HeaderProps`, `Sidebar`, `SidebarProps`, `UserMenu`, `UserMenuProps`, `Navbar`, `NavbarProps`

## Acceptance Criteria & Specs

### Header (OR-01)
- Props: `logo?: React.ReactNode`, `onLogoClick?: () => void`, `searchProps?: SearchBarProps`, `showSearch?: boolean` (default: true), `actions?: Array<{ icon: IconName; label: string; onClick: () => void; badge?: number | string }>`, `user?: { name: string; role?: string; avatarSrc?: string }`, `onUserClick?: () => void`, `onMenuClick?: () => void` (mobile toggle), `variant?: 'default' | 'transparent' | 'dark'` (default: 'default'), `sticky?: boolean` (default: true). Extends `React.HTMLAttributes<HTMLElement>`.
- `forwardRef` to `<header>`.
- sticky=true: `position: sticky`, `top: 0`, `z-index: 100` (or `var(--z-dropdown)`), box-shadow/border bottom.
- variant='dark': bg `var(--color-neutral-900)` or dark token, text white. variant='transparent': no background. default: bg `var(--color-bg)`, border bottom `1px solid var(--color-border)`.
- Sizing: height 64px, padding 0 var(--space-6), gap var(--space-4).
- User section: Avatar + name (hidden on mobile) + chevron-down.
- Mobile (<768px): hides SearchBar & action labels, shows hamburger Icon menu button.

### Sidebar (OR-02)
- Props: `items: NavItem[]`, `activeId: string`, `onItemClick: (id: string) => void`, `collapsed?: boolean` (default: false), `onToggle?: () => void`, `user?: { name: string; role?: string; avatarSrc?: string }`, `onUserClick?: () => void`, `width?: number` (default: 240), `collapsedWidth?: number` (default: 64). Extends `React.HTMLAttributes<HTMLElement>`.
- `forwardRef` to `<aside>`.
- transition: width transition-base. height 100%, overflow-y auto.
- Active item: left border `4px solid var(--color-primary-600)`, bg `var(--color-primary-50)` (or primary light), text color primary.
- Collapsed=true: hides labels, badges, user names. Renders only Icons with `Tooltip` wrapper (ML-10) showing labels on hover. Num badge becomes red badge on top of Icon.
- Submenu: items with `children?: NavItem[]` display a `chevron-right` arrow that rotates 90deg when expanded. Renders child sub-items with slide-down CSS max-height transition.
- Item disabled: opacity 0.45, pointer-events none.
- Bottom user section: aligned to bottom (`mt: auto`), padding, UserCard or Avatar + text.

### UserMenu (OR-05)
- Props: `user: { name: string; email: string; role?: string; avatarSrc?: string }`, `items: MenuSection[]`, `onClose: () => void`, `isOpen: boolean`, `anchorRef?: React.RefObject<HTMLElement>`. Extends `React.HTMLAttributes<HTMLDivElement>`.
- Visibility: `isOpen` controlled by parent.
- Close behaviors: Closes on `Escape` keypress, or click outside container.
- Focus: Sets initial focus to the first menu item when opened. Roving tabindex / arrow keys Up/Down navigate items.
- Items styling: height 36px, hover bg `var(--color-bg-muted)`. Section dividers (`Divider` atom). UserCard at the top (informational, not clickable).
- Variant danger: red text and Icon color (e.g. for Logout).

### Navbar (OR-10)
- Props: `items?: Array<{ id: string; label: string; href?: string; onClick?: () => void; active?: boolean }>`, `variant?: 'default' | 'pills' | 'underline'` (default: 'underline'), `actions?: React.ReactNode` (right actions slot), `breadcrumb?: BreadcrumbProps`, `bordered?: boolean` (default: false). Extends `React.HTMLAttributes<HTMLElement>`.
- `forwardRef` to `<nav>`.
- Active styling:
  - `underline`: border-bottom or indicator under active item.
  - `pills`: active item gets bg `var(--color-primary-100)` and radius full.
  - `default`: active item gets text color primary.
- Breadcrumb: If `breadcrumb` prop is provided, render `Breadcrumb` molecule instead of default link items.
- Mobile: horizontal scroll allowed if items overflow container width.

## Steps
1. Create `src/organisms/Header/` files.
2. Create `src/organisms/Sidebar/` files.
3. Create `src/organisms/UserMenu/` files.
4. Create `src/organisms/Navbar/` files.
5. Verify type checking with `npx tsc --noEmit`.
6. Commit changes: `git add src/organisms/Header/ src/organisms/Sidebar/ src/organisms/UserMenu/ src/organisms/Navbar/ ; git commit -m "feat: add Header, Sidebar, UserMenu, and Navbar organisms"`
