# Task 2: Pantallas y Flujos de Demostración - Parte A (PG-01 a PG-03)

**Files:**
- Create: `src/pages/DashboardPage/*` (DashboardPage.tsx, DashboardPage.stories.tsx, index.ts)
- Create: `src/pages/LoginPage/*` (LoginPage.tsx, LoginPage.stories.tsx, index.ts)
- Create: `src/pages/UsersPage/*` (UsersPage.tsx, UsersPage.stories.tsx, index.ts)

**Interfaces:**
- Consumes: Templates (DashboardLayout, AuthLayout, ListingLayout), Organisms (Header, Sidebar, Card, DataTable, Tabs, UserMenu, LoginForm, FilterBar, Modal, Drawer)
- Produces: `DashboardPage`, `LoginPage`, `UsersPage`

## Acceptance Criteria & Specs

### DashboardPage (PG-01)
- Template used: `DashboardLayout` (TM-01)
- Organisms instanced:
  - Header: Renders logo name, SearchBar functional callback, notifications badge trigger, profile button opening UserMenu.
  - Sidebar: Navigation items (Mínimo 6: Home, Usuarios, Productos, Pedidos, Reportes, Configuración). Badges count for Pedidos (5) and Reportes (2). Collapse button toggles `collapsed` state.
  - Cards KPIs (4 cards): Displays key metrics (Usuarios, Ingresos, Pedidos, Conversión). Custom icon and percentage badge inside each card.
  - Tabs: Alternates "Actividad reciente" (rendered as a `DataTable` showing recent user logs with Avatar renders and status Badges) and "Resumen mensual" (renders 3 descriptive Cards).
- Responsive mobile: On mobile (<768px), clicking Header hamburger icon button toggles a `Drawer` containing the `Sidebar` navigation, allowing full mobile side navigation.
- User profile: Clicking user details in Header toggles `UserMenu` anchored below header profile.

### LoginPage (PG-02)
- Template used: `AuthLayout` (TM-02, split variant)
- Panel branding details (left slot): bg-color primary-700, SVG checkmarks bullets showing tagline "Gestiona tu negocio con claridad".
- Form details (right slot): Instances `LoginForm`.
- Interactivity: LoginForm submit simulates 1.5s delay loading spinner. If email input contains string `"error"`, sets error credentials in `LoginForm` showing alert message.
- Footer options: "© 2026 AppDashboard · Términos · Privacidad".

### UsersPage (PG-03)
- Template used: `ListingLayout` (TM-03)
- Context filters (FilterBar): Dynamic text query search filter and role/status option choices.
- List (DataTable): Shows list of 20 realistic mock users (ids, names, roles, statuses, created dates, avatar references). Headers render custom cells for user identity (Avatar + details), role Badges, status Badges, and row action buttons.
- Actions:
  - Trash icon button: Opens `Modal` dialog to confirm deleting user showing selected user details. Modal delete callback removes user from list.
  - Edit/view button: Opens detailed `Drawer` context panel on the right showing user profile card and activity tabs details.

## Steps
1. Create `src/pages/DashboardPage/` files.
2. Create `src/pages/LoginPage/` files.
3. Create `src/pages/UsersPage/` files.
4. Verify type check: `npx tsc --noEmit`.
5. Commit: `git add src/pages/DashboardPage/ src/pages/LoginPage/ src/pages/UsersPage/ ; git commit -m "feat: add DashboardPage, LoginPage, and UsersPage screen demos"`
