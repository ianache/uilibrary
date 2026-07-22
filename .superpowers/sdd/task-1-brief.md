# Task 1: Esqueletos de Maquetación (Templates TM-01 a TM-05)

**Files:**
- Create: `src/templates/DashboardLayout/*` (DashboardLayout.tsx, DashboardLayout.module.css, DashboardLayout.stories.tsx, index.ts)
- Create: `src/templates/AuthLayout/*` (AuthLayout.tsx, AuthLayout.module.css, AuthLayout.stories.tsx, index.ts)
- Create: `src/templates/ListingLayout/*` (ListingLayout.tsx, ListingLayout.module.css, ListingLayout.stories.tsx, index.ts)
- Create: `src/templates/DetailLayout/*` (DetailLayout.tsx, DetailLayout.module.css, DetailLayout.stories.tsx, index.ts)
- Create: `src/templates/BlankLayout/*` (BlankLayout.tsx, BlankLayout.module.css, BlankLayout.stories.tsx, index.ts)

**Interfaces:**
- Consumes: `clsx`, `src/tokens/tokens.css`
- Produces: `DashboardLayout`, `AuthLayout`, `ListingLayout`, `DetailLayout`, `BlankLayout`

## Acceptance Criteria & Specs

### DashboardLayout (TM-01)
- Props: `header: React.ReactNode` (required), `sidebar: React.ReactNode` (required), `children: React.ReactNode` (required), `footer?: React.ReactNode`, `sidebarWidth?: number` (default: 240), `collapsedWidth?: number` (default: 64), `sidebarCollapsed?: boolean` (default: false), `showSidebar?: boolean` (default: true), `headerHeight?: number` (default: 64), `maxContentWidth?: number | 'full'` (default: 'full'). Extends `React.HTMLAttributes<HTMLDivElement>`.
- Grid areas: `header`, `sidebar`, `main`, `footer`.
- Custom CSS Properties: Renders custom property `--sidebar-width` inline in styles according to `sidebarWidth`, `collapsedWidth`, and `sidebarCollapsed` boolean.
- Responsive:
  - Mobile (<768px): sidebar is hidden (display: none). Grid areas simplify to `"header" auto` + `"main" 1fr`.
- `margin: 0` on root.

### AuthLayout (TM-02)
- Props: `children: React.ReactNode` (required), `brandPanel?: React.ReactNode`, `logo?: React.ReactNode`, `footer?: React.ReactNode`, `variant?: 'centered' | 'split'` (default: 'centered'), `bgPattern?: boolean` (default: false). Extends `React.HTMLAttributes<HTMLDivElement>`.
- Variant centered: flex-centered wrapper (`max-width: 400px` for form). Background SVG pattern options when `bgPattern=true` (sutil dots/grid gradient background).
- Variant split: double columns grids `1fr 1fr`. In mobile view (<768px), panel stacks vertically (brandPanel above form).
- `margin: 0` on root.

### ListingLayout (TM-03)
- Props: `header: React.ReactNode` (required), `sidebar?: React.ReactNode` (context/filter sidebar, optional), `filterBar?: React.ReactNode` (optional), `children: React.ReactNode` (required), `breadcrumb?: React.ReactNode`, `title?: React.ReactNode`, `actions?: React.ReactNode`, `loading?: boolean` (default: false), `contentLayout?: 'table' | 'grid' | 'list'` (default: 'table'), `gridColumns?: 2 | 3 | 4` (default: 3). Extends `React.HTMLAttributes<HTMLDivElement>`.
- Content rendering wrapper:
  - `table`: simple padding horizontal layouts.
  - `grid`: responsive CSS Grid with `repeat(var(--grid-cols), 1fr)` and gap `var(--space-4)`, where `--grid-cols` matches `gridColumns`.
  - `list`: flex column gap.
- Controls region: Horizontal header layout for title, actions slot, filterBar, and breadcrumb.
- `margin: 0` on root.

### DetailLayout (TM-04)
- Props: `header: React.ReactNode` (required), `breadcrumb?: React.ReactNode`, `title?: React.ReactNode`, `actions?: React.ReactNode`, `children: React.ReactNode` (required), `metaPanel?: React.ReactNode` (side column info, optional), `metaPanelWidth?: number` (default: 320), `--meta-width` custom property, `metaPanelPosition?: 'right' | 'left'` (default: 'right'), `maxWidth?: number | 'full'` (default: 960). Extends `React.HTMLAttributes<HTMLDivElement>`.
- Sizing wrapper: `max-width` dynamic style property (using `maxWidth` or '100%').
- Meta sidebar: Grid layout `1fr var(--meta-width)`. `metaPanelPosition='left'` swaps column grid order. In mobile (<768px), metaPanel is stacked below main content.
- `margin: 0` on root.

### BlankLayout (TM-05)
- Props: `children: React.ReactNode` (required), `centered?: boolean` (default: true), `maxWidth?: number | 'full'` (default: 'full'), `bgColor?: string` (CSS custom color), `padding?: 'none' | 'sm' | 'md' | 'lg'` (default: 'md'). Extends `React.HTMLAttributes<HTMLDivElement>`.
- Centered: displays flex-centered viewport when `centered=true`. Padding options mapping. Overrides background-color via `bgColor` inline prop.
- `margin: 0` on root.

## Steps
1. Create `src/templates/DashboardLayout/` files.
2. Create `src/templates/AuthLayout/` files.
3. Create `src/templates/ListingLayout/` files.
4. Create `src/templates/DetailLayout/` files.
5. Create `src/templates/BlankLayout/` files.
6. Verify type check: `npx tsc --noEmit`.
7. Commit: `git add src/templates/ ; git commit -m "feat: add templates layer"`
