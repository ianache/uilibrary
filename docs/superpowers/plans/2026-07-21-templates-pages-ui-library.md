# Capa de Templates y Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement full atomic design TEMPLATES (5 components) and PAGES (6 demo views) layers for `UIComponentLibrary` following strict CSS Modules, CSS Custom Properties, mock interactions, and Storybook 8 rules.

**Architecture:** 
- Templates in `src/templates/<NombreTemplate>/` with exactly 4 files (`.tsx`, `.module.css`, `.stories.tsx`, `index.ts`), using no local state.
- Pages in `src/pages/<NombrePage>/` with exactly 3 files (`.tsx`, `.stories.tsx`, `index.ts`), using local state to simulate all layout interactions and dynamic mock data. No `.module.css` (inherits layout container from templates).
- Export templates alphabetically in `src/index.ts`. Pages exports remain commented out.

**Tech Stack:** React 18, TypeScript 5, Vite 5, CSS Modules, clsx, Storybook 8.

---

### Task 1: Esqueletos de Maquetación (Templates TM-01 a TM-05)

**Files:**
- Create: `src/templates/DashboardLayout/` (DashboardLayout.tsx, DashboardLayout.module.css, DashboardLayout.stories.tsx, index.ts)
- Create: `src/templates/AuthLayout/` (AuthLayout.tsx, AuthLayout.module.css, AuthLayout.stories.tsx, index.ts)
- Create: `src/templates/ListingLayout/` (ListingLayout.tsx, ListingLayout.module.css, ListingLayout.stories.tsx, index.ts)
- Create: `src/templates/DetailLayout/` (DetailLayout.tsx, DetailLayout.module.css, DetailLayout.stories.tsx, index.ts)
- Create: `src/templates/BlankLayout/` (BlankLayout.tsx, BlankLayout.module.css, BlankLayout.stories.tsx, index.ts)

**Interfaces:**
- Consumes: `clsx`, `src/tokens/tokens.css`
- Produces: `DashboardLayout`, `AuthLayout`, `ListingLayout`, `DetailLayout`, `BlankLayout`

- [ ] **Step 1: Create `src/templates/DashboardLayout` files**
Pure layout with grid areas `header`, `sidebar`, `main`, `footer`. Sidebar width configured dynamic style properties `--sidebar-width`. Mobile view hides sidebar lateral column and reduces grid space.

- [ ] **Step 2: Create `src/templates/AuthLayout` files**
Two variants: `centered` (renders absolute screen centered wrapper with optional background pattern) and `split` (renders double column structure that stack vertically in mobile viewport).

- [ ] **Step 3: Create `src/templates/ListingLayout` files**
Configurable controls panel layout. Renders slots for title, controls, breadcrumbs, search, sidebar. Content fits `'table'`, `'grid'` (supports 2 to 4 responsive columns layout), or `'list'`.

- [ ] **Step 4: Create `src/templates/DetailLayout` files**
Centered sheet layout showing content and optional sidebar metadata info panel configured dynamically at left or right position.

- [ ] **Step 5: Create `src/templates/BlankLayout` files**
Basic viewport page layout without shell navigation. Supports optional vertical/horizontal centering options.

- [ ] **Step 6: Run type check**

Run: `npx tsc --noEmit`
Expected: PASS

- [ ] **Step 7: Commit Task 1**

```bash
git add src/templates/
git commit -m "feat: add DashboardLayout, AuthLayout, ListingLayout, DetailLayout, and BlankLayout templates"
```

---

### Task 2: Pantallas y Flujos de Demostración - Parte A (PG-01 a PG-03)

**Files:**
- Create: `src/pages/DashboardPage/` (DashboardPage.tsx, DashboardPage.stories.tsx, index.ts)
- Create: `src/pages/LoginPage/` (LoginPage.tsx, LoginPage.stories.tsx, index.ts)
- Create: `src/pages/UsersPage/` (UsersPage.tsx, UsersPage.stories.tsx, index.ts)

**Interfaces:**
- Consumes: Templates (DashboardLayout, AuthLayout, ListingLayout), Organisms (Header, Sidebar, Card, DataTable, Tabs, UserMenu, LoginForm, FilterBar, Modal, Drawer)
- Produces: `DashboardPage`, `LoginPage`, `UsersPage`

- [ ] **Step 1: Create `src/pages/DashboardPage` files**
Demos dashboard layout integration. Handles state for sidebar collapse, user menu dropdown, KPIs metrics card rendering, and dynamic tabs content with 10 rows DataTable mock logs. Mobile drawer sidebar overlay handling.

- [ ] **Step 2: Create `src/pages/LoginPage` files**
Demos auth layout split. LoginForm submits show 1.5s delay spinner and triggers credential error notifications. Includes left brand panel benefits checkmarks.

- [ ] **Step 3: Create `src/pages/UsersPage` files**
Demos listing layout directory. Dynamic search and filters filter 20 mock users list in memory. Integrates row trash button to open confirm delete Modal, and profile links to open detailed context Drawer.

- [ ] **Step 4: Run type check**

Run: `npx tsc --noEmit`
Expected: PASS

- [ ] **Step 5: Commit Task 2**

```bash
git add src/pages/DashboardPage/ src/pages/LoginPage/ src/pages/UsersPage/
git commit -m "feat: add DashboardPage, LoginPage, and UsersPage screen demos"
```

---

### Task 3: Pantallas y Flujos de Demostración - Parte B (PG-04 a PG-06)

**Files:**
- Create: `src/pages/ProfilePage/` (ProfilePage.tsx, ProfilePage.stories.tsx, index.ts)
- Create: `src/pages/SettingsPage/` (SettingsPage.tsx, SettingsPage.stories.tsx, index.ts)
- Create: `src/pages/NotFoundPage/` (NotFoundPage.tsx, NotFoundPage.stories.tsx, index.ts)

**Interfaces:**
- Consumes: Templates (DetailLayout, BlankLayout), Organisms, Atoms, Molecules
- Produces: `ProfilePage`, `SettingsPage`, `NotFoundPage`

- [ ] **Step 1: Create `src/pages/ProfilePage` files**
Demos detail layout sheet. Sidebar avatar personal cards, click edit opens fields editor Modal with loading transition.

- [ ] **Step 2: Create `src/pages/SettingsPage` files**
Demos detail layout without sidebar panel. Tab options for Profile (avatar upload), Security (2FA toggles) and Appearance (Theme switcher). Saving simulates spinner loading and success toast notification.

- [ ] **Step 3: Create `src/pages/NotFoundPage` files**
Demos blank layout static 404. Renders large 404 text, illustration details, and return actions.

- [ ] **Step 4: Run type check**

Run: `npx tsc --noEmit`
Expected: PASS

- [ ] **Step 5: Commit Task 3**

```bash
git add src/pages/ProfilePage/ src/pages/SettingsPage/ src/pages/NotFoundPage/
git commit -m "feat: add ProfilePage, SettingsPage, and NotFoundPage screen demos"
```

---

### Task 4: Final Integration & Verification

**Files:**
- Modify: `src/index.ts`

**Interfaces:**
- Consumes: All 5 templates
- Produces: Alphabetically exported templates barrel, commented page exports

- [ ] **Step 1: Update `src/index.ts` barrel file**
Add exports for all 5 templates alphabetically, and include commented exports for the 6 demo pages.

- [ ] **Step 2: Run full build and verification**

Run: `npx tsc --noEmit && npm run build`
Expected: 0 errors, successful production bundle compilation.

- [ ] **Step 3: Commit Task 4**

```bash
git add src/index.ts
git commit -m "feat: export templates layer and compile total bundle"
```
