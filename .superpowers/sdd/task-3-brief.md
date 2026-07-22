# Task 3: Data Lists, Forms & Filters (DataTable, LoginForm, FilterBar)

**Files:**
- Create: `src/organisms/DataTable/*` (DataTable.tsx, DataTable.module.css, DataTable.stories.tsx, index.ts)
- Create: `src/organisms/LoginForm/*` (LoginForm.tsx, LoginForm.module.css, LoginForm.stories.tsx, index.ts)
- Create: `src/organisms/FilterBar/*` (FilterBar.tsx, FilterBar.module.css, FilterBar.stories.tsx, index.ts)
- Modify: `src/index.ts` (export DataTable, LoginForm, FilterBar)

**Interfaces:**
- Consumes: `clsx`, `src/tokens/tokens.css`, lower-level atoms & molecules (SearchBar, Notification, FormField, TagInput, RadioGroup)
- Produces: `DataTable`, `LoginForm`, `FilterBar`

## Acceptance Criteria & Specs

### DataTable (OR-03)
- Props (generic `T`): `data: T[]`, `columns: Column<T>[]`, `loading?: boolean` (default: false), `error?: string`, `emptyMessage?: string` (default: 'No hay datos que mostrar'), `selectable?: boolean` (default: false), `selectedIds?: string[]`, `onSelectionChange?: (ids: string[]) => void`, `sortable?: boolean` (default: true), `defaultSort?: { key: keyof T | string; direction: 'asc' | 'desc' }`, `pagination?: { page: number; pageSize: number; total: number }`, `onPageChange?: (page: number) => void`, `onSort?: (key: keyof T | string, direction: 'asc' | 'desc') => void`, `caption?: string`. Extends `React.HTMLAttributes<HTMLDivElement>`.
- Tipo Column<T>: `{ key: keyof T | string; header: string; render?: (row: T) => React.ReactNode; sortable?: boolean; width?: string; align?: 'left' | 'center' | 'right' }`
- Layout/Styling: Overflow horizontal (`overflow-x: auto`), table border-collapse. Alternating row colors or simple hover effects. Border bottom on cell. Sizing: padding `var(--space-3) var(--space-4)`.
- Interactive Features:
  - Selectable: Includes checkboxes in cells. Row active styling (primary-50 background). Maestro checkbox in the header header row.
  - Sorting: Interactive header columns displaying sorting chevrons (up/down direction indicator).
  - Paging: Displays "Mostrando X-Y de Z" metrics and navigation prev/next buttons at the bottom.
- State checks:
  - `loading=true`: Centered `Spinner` overlay covers container.
  - `error`: Shows `Notification` variant='error' error alert instead of table.
  - `data.length=0`: Centered message showing illustration / `emptyMessage`.
- `margin: 0` on root.

### LoginForm (OR-04)
- Props: `onSubmit: (data: { email: string; password: string; remember: boolean }) => void`, `onForgotPassword?: () => void`, `onRegister?: () => void`, `loading?: boolean` (default: false), `error?: string` (global credentials error), `socialProviders?: Array<'google' | 'github' | 'microsoft'>`, `title?: string` (default: 'Iniciar sesión'), `subtitle?: string`. Extends `React.HTMLAttributes<HTMLFormElement>`.
- Keyboard & Form trigger: Submit form on Enter keypress inside inputs.
- Passwords visual: eye/eye-off toggle inside input suffix toggling input types (`password` vs `text`).
- Sizing/layout: `max-width: 400px`, flex column gap `var(--space-5)`. Provider grid options (Google, Github, MS) separated from email inputs via a `Divider`.
- Validation errors state:
  - email: Required + valid regex format constraint.
  - password: Required + >= 8 characters.
  - Displays validation errors below fields using `FormField` (ML-02).
- `margin: 0` on root.

### FilterBar (OR-11)
- Props: `filters: FilterConfig[]`, `values: Record<string, unknown>`, `onChange: (values: Record<string, unknown>) => void`, `onReset: () => void`, `onSearch: (query: string) => void`, `searchQuery: string`, `loading?: boolean` (default: false), `resultCount?: number`, `collapsible?: boolean` (default: false). Extends `React.HTMLAttributes<HTMLDivElement>`.
- Tipo FilterConfig: `{ id: string; label: string; type: 'select' | 'checkbox' | 'radio'; options?: Array<{ value: string; label: string }>; multiple?: boolean }`
- Layout/composition:
  - Top bar row: `SearchBar` at the left, right action buttons slot (Filters toggle, Reset buttons).
  - Collapsible filter selections section: Expandable categories panels containing options (Select dropdowns, checkbox lists, RadioGroups). Collapses on trigger click showing active count indicator Badge.
  - Active chip categories tags: Chips listed at the bottom showing active values as dismissible `Tag` elements. Clicking "x" removes individual filter calling `onChange(newValues)`.
- `margin: 0` on root.

## Steps
1. Create `src/organisms/DataTable/` files.
2. Create `src/organisms/LoginForm/` files.
3. Create `src/organisms/FilterBar/` files.
4. Export them in `src/index.ts`.
5. Verify type check: `npx tsc --noEmit`.
6. Commit: `git add src/organisms/DataTable/ src/organisms/LoginForm/ src/organisms/FilterBar/ src/index.ts ; git commit -m "feat: add DataTable, LoginForm, and FilterBar organisms"`
