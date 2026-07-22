# Capa de Organismos Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement full atomic design ORGANISMS layer (11 components) for `UIComponentLibrary` following strict WCAG 2.1 AA, CSS Modules, forwardRef, Portals, and Storybook 8 rules.

**Architecture:** Implement each organism in `src/organisms/<NombreOrganismo>/` with exactly 4 files (`.tsx`, `.module.css`, `.stories.tsx`, `index.ts`), using `clsx` and strict TypeScript types. Lower level components must be imported only from their respective barrel folders (e.g. `../atoms/Button` or `../molecules/SearchBar`). Re-export everything in `src/index.ts`.

**Tech Stack:** React 18, TypeScript 5, Vite 5, CSS Modules, clsx, Storybook 8.

## Global Constraints
- Framework: React 18, TypeScript 5, Vite 5
- Styles: CSS Modules (`.module.css`) only, no inline styles, no Tailwind
- Design Tokens: Use `var(--token-name)` from `src/tokens/tokens.css` exclusively
- Atomic Design: Organisms import atoms from `../atoms/*` and molecules from `../molecules/*` barrels. Organisms DO NOT import other organisms, DO NOT have external margin, DO NOT connect to global state.
- Form/interactive components must support refs.
- WCAG 2.1 AA required for all interactive elements.

---

### Task 1: Navigation Shell & Frames (Header, Sidebar, UserMenu, Navbar)

**Files:**
- Create: `src/organisms/Header/` (Header.tsx, Header.module.css, Header.stories.tsx, index.ts)
- Create: `src/organisms/Sidebar/` (Sidebar.tsx, Sidebar.module.css, Sidebar.stories.tsx, index.ts)
- Create: `src/organisms/UserMenu/` (UserMenu.tsx, UserMenu.module.css, UserMenu.stories.tsx, index.ts)
- Create: `src/organisms/Navbar/` (Navbar.tsx, Navbar.module.css, Navbar.stories.tsx, index.ts)

**Interfaces:**
- Consumes: `clsx`, `src/tokens/tokens.css`, lower-level atoms & molecules (SearchBar, Breadcrumb, UserCard, Tooltip)
- Produces: `Header`, `HeaderProps`, `Sidebar`, `SidebarProps`, `UserMenu`, `UserMenuProps`, `Navbar`, `NavbarProps`

- [ ] **Step 1: Create `src/organisms/Header` files**
Integrates logo click, `SearchBarProps`, floating badge actions, UserCard info. In mobile (<768px), search bar and action texts are hidden, and menu hamburguesa button is displayed. Sticky position capabilities.

- [ ] **Step 2: Create `src/organisms/Sidebar` files**
Nested `NavItem` list with dynamic active state highlighting (left primary border + primary background). Stateful collapsible menu toggle showing tooltips in collapsed state, sliding animations for submenu options.

- [ ] **Step 3: Create `src/organisms/UserMenu` files**
Drop-down absolute menu anchored below user avatar. Listens to document click outside and `Escape` key to close. Roving tabindex focus tracking on menu options. Destructive actions in danger red.

- [ ] **Step 4: Create `src/organisms/Navbar` files**
Horizontal navigation bar with active underline transition or pill background, or option to replace lists with Breadcrumbs.

- [ ] **Step 5: Run type check**

Run: `npx tsc --noEmit`
Expected: PASS

- [ ] **Step 6: Commit Task 1**

```bash
git add src/organisms/Header/ src/organisms/Sidebar/ src/organisms/UserMenu/ src/organisms/Navbar/
git commit -m "feat: add Header, Sidebar, UserMenu, and Navbar organisms"
```

---

### Task 2: Viewport Overlays, Tabs & Layouts (Modal, Drawer, Tabs, Card)

**Files:**
- Create: `src/organisms/Modal/` (Modal.tsx, Modal.module.css, Modal.stories.tsx, index.ts)
- Create: `src/organisms/Drawer/` (Drawer.tsx, Drawer.module.css, Drawer.stories.tsx, index.ts)
- Create: `src/organisms/Tabs/` (Tabs.tsx, Tabs.module.css, Tabs.stories.tsx, index.ts)
- Create: `src/organisms/Card/` (Card.tsx, Card.module.css, Card.stories.tsx, index.ts)

**Interfaces:**
- Consumes: `clsx`, `src/tokens/tokens.css`, React Portals, lower-level atoms & molecules
- Produces: `Modal`, `ModalProps`, `Drawer`, `DrawerProps`, `Tabs`, `TabsProps`, `Card`, `CardProps`

- [ ] **Step 1: Create `src/organisms/Modal` files**
Rendered via `createPortal` to `document.body`. Handles scroll lock on `<body>`, keyboard focus trap (cycling within modal), escape key closes, focus restore on close, sizes from sm (400px) to full (100vw).

- [ ] **Step 2: Create `src/organisms/Drawer` files**
Rendered via `createPortal` to `document.body`. Shares same keyboard focus trap, scroll lock, overlay close, and focus restore. Custom sliding transitions from `left`, `right`, `top`, or `bottom` viewport edges.

- [ ] **Step 3: Create `src/organisms/Tabs` files**
Tab list navigation with arrow key roving tabindex, Home/End shortcut tracking, custom line indicator animation or card variants, and aria panels support.

- [ ] **Step 4: Create `src/organisms/Card` files**
Polymorphic container supporting media slot, hover shadow, click handlers. If loading=true, renders a shimmer skeleton block instead of children.

- [ ] **Step 5: Run type check**

Run: `npx tsc --noEmit`
Expected: PASS

- [ ] **Step 6: Commit Task 2**

```bash
git add src/organisms/Modal/ src/organisms/Drawer/ src/organisms/Tabs/ src/organisms/Card/
git commit -m "feat: add Modal, Drawer, Tabs, and Card organisms"
```

---

### Task 3: Data Lists, Forms & Filters (DataTable, LoginForm, FilterBar)

**Files:**
- Create: `src/organisms/DataTable/` (DataTable.tsx, DataTable.module.css, DataTable.stories.tsx, index.ts)
- Create: `src/organisms/LoginForm/` (LoginForm.tsx, LoginForm.module.css, LoginForm.stories.tsx, index.ts)
- Create: `src/organisms/FilterBar/` (FilterBar.tsx, FilterBar.module.css, FilterBar.stories.tsx, index.ts)

**Interfaces:**
- Consumes: `clsx`, `src/tokens/tokens.css`, generic typescript params, lower-level atoms & molecules (SearchBar, Notification, FormField, TagInput, RadioGroup)
- Produces: `DataTable`, `LoginForm`, `FilterBar`

- [ ] **Step 1: Create `src/organisms/DataTable` files**
Generics-typed table structure. Custom render methods, column sortable arrows (asc/desc), header select all checkbox (indeterminate state support), paging descriptions & controls, loading spinner overlay, empty list display.

- [ ] **Step 2: Create `src/organisms/LoginForm` files**
Authentication form with local valid checks (email pattern, pass length), password show/hide suffix toggle, social grid headers, error notifications.

- [ ] **Step 3: Create `src/organisms/FilterBar` files**
Input filters with active Chips Tag remove items, reset triggers, collapsible select fields panel with active filters count badges.

- [ ] **Step 4: Run type check**

Run: `npx tsc --noEmit`
Expected: PASS

- [ ] **Step 5: Commit Task 3**

```bash
git add src/organisms/DataTable/ src/organisms/LoginForm/ src/organisms/FilterBar/
git commit -m "feat: add DataTable, LoginForm, and FilterBar organisms"
```

---

### Task 4: Final Integration & Verification

**Files:**
- Modify: `src/index.ts`

**Interfaces:**
- Consumes: All 11 organisms
- Produces: Fully exported bundle re-exports

- [ ] **Step 1: Update `src/index.ts` barrel file**
Add exports for all 11 organisms alphabetically.

- [ ] **Step 2: Run full build and verification**

Run: `npx tsc --noEmit && npm run build`
Expected: 0 errors, successful production bundle compilation.

- [ ] **Step 3: Commit Task 4**

```bash
git add src/index.ts
git commit -m "feat: finalize organisms exports and compile library"
```
