# PROMPT MAESTRO — Generación de Templates y Pages
# UIComponentLibrary · Claude Code
# Usar con: claude (en la raíz del proyecto)
# ══════════════════════════════════════════════════════════════

Eres un experto en diseño de sistemas de componentes React con TypeScript,
CSS Modules y Atomic Design. Tu tarea es construir la capa de TEMPLATES y
PAGES de la biblioteca UIComponentLibrary siguiendo la especificación aquí.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## CONTEXTO DEL PROYECTO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Proyecto    : UIComponentLibrary
- Metodología : Atomic Design — capas de TEMPLATES y PAGES
- Stack       : React 18 · TypeScript 5 · Vite 5 · CSS Modules · clsx
- Catálogo    : Storybook 8
- Rutas base  : src/templates/ y src/pages/

Lee estos archivos ANTES de escribir cualquier código:

  — Tokens —
  @src/tokens/tokens.css

  — Organismos disponibles —
  @src/organisms/Header/index.ts
  @src/organisms/Sidebar/index.ts
  @src/organisms/Navbar/index.ts
  @src/organisms/Footer/index.ts
  @src/organisms/Modal/index.ts
  @src/organisms/Drawer/index.ts
  @src/organisms/Tabs/index.ts
  @src/organisms/Card/index.ts
  @src/organisms/DataTable/index.ts
  @src/organisms/LoginForm/index.ts
  @src/organisms/FilterBar/index.ts
  @src/organisms/UserMenu/index.ts

  — Barrel principal —
  @src/index.ts


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## QUÉ SON TEMPLATES Y PAGES — leer antes de codificar
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### Templates
Son el esqueleto de la UI sin contenido real. Definen DÓNDE van los
organismos, no QUÉ hay en ellos. Son como planos de arquitectura.

  ✓ Definen el layout: grid, flex, posicionamiento de regiones
  ✓ Reciben organismos completos como children o slots (props de tipo ReactNode)
  ✓ NO tienen estado propio (sin useState, sin hooks)
  ✓ NO reciben datos de dominio (users[], products[])
  ✓ SÍ reciben configuración de layout (collapsed, showSidebar, etc.)
  ✓ Son altamente reutilizables: el mismo template sirve a varias páginas
  ✗ NO hacen fetch ni conectan con stores
  ✗ NO tienen lógica de negocio

### Pages
Son instancias reales del template con datos ficticios (mock) que demuestran
cómo se ve la pantalla completa. En producción, los datos vendrían de una API.

  ✓ Importan un Template y lo llenan con organismos + datos mock
  ✓ Simulan el estado completo de la pantalla (loading, vacío, con datos)
  ✓ Son la prueba de que el sistema funciona de extremo a extremo
  ✓ Tienen estado local para simular interacciones (useState para modales, etc.)
  ✗ NO se publican como parte de la biblioteca (son demos, no componentes)
  ✗ En producción, sus datos serían reemplazados por hooks reales (useQuery, etc.)

Relación exacta:
  Template = estructura vacía con slots
  Page     = Template + organismos instanciados + datos mock


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## REGLAS GLOBALES — NUNCA ROMPER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TEMPLATES
  ✓ Solo CSS Modules + tokens para el layout
  ✓ Props de slots tipadas como ReactNode o componentes específicos
  ✓ Exportar tipos de configuración (TemplateConfig, LayoutVariant)
  ✓ Responsive: el CSS del template maneja breakpoints con @media
  ✗ Sin useState, useEffect, useRef dentro del template
  ✗ Sin datos de dominio en las props
  ✗ Sin margin externo (el body/root de la app los controla)

PAGES (demos)
  ✓ Datos mock plausibles: nombres reales, emails, fechas, textos coherentes
  ✓ Estado local para simular interacciones (abrir modal, cambiar tab, etc.)
  ✓ Comentarios indicando dónde iría la conexión real: // en producción: useQuery(...)
  ✓ Stories de Storybook con múltiples estados (default, loading, vacío, error)
  ✗ Sin fetch reales — todo mock
  ✗ Sin dependencias de routers externos (React Router, Next.js)

STORYBOOK — Templates
  ✓ title: 'Templates/NombreTemplate' · tags: ['autodocs']
  ✓ Mostrar el layout con placeholders de color para cada slot
  ✓ Story por variante de layout (con sidebar, sin sidebar, etc.)
  ✓ Decorators con height: 100vh para ver el layout completo

STORYBOOK — Pages
  ✓ title: 'Pages/NombrePage' · tags: ['autodocs']
  ✓ Story "Default" con datos mock completos y representativos
  ✓ Story "Loading" — todos los organismos en estado loading
  ✓ Story "Empty" — sin datos, estado vacío
  ✓ Decorators con height: 100vh y overflow: auto

ESTRUCTURA DE ARCHIVOS:

  src/templates/NombreTemplate/
  ├── NombreTemplate.tsx
  ├── NombreTemplate.module.css
  ├── NombreTemplate.stories.tsx
  └── index.ts

  src/pages/NombrePage/
  ├── NombrePage.tsx
  ├── NombrePage.stories.tsx
  └── index.ts
  (las pages NO tienen .module.css — usan el CSS del template)


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PARTE 1 — TEMPLATES A GENERAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Genera los 5 templates en este orden, completando los 4 archivos cada uno.

──────────────────────────────────────────
### TM-01 · DashboardLayout
──────────────────────────────────────────
Propósito:
  Layout de aplicación con sidebar lateral, header fijo y área de contenido
  principal. El más común en apps de gestión y dashboards.

Props:
  header        : ReactNode (requerido)
  sidebar       : ReactNode (requerido)
  children      : ReactNode (requerido)  ← área de contenido principal
  footer        : ReactNode (opcional)
  sidebarWidth  : number → default: 240   ← en px
  collapsedWidth: number → default: 64
  sidebarCollapsed : boolean → default: false
  showSidebar   : boolean → default: true  ← ocultar en mobile
  headerHeight  : number → default: 64
  maxContentWidth : number | 'full' → default: 'full'

Estructura de regiones:
  ┌─────────────────────────────────────┐
  │              HEADER                 │  ← posición fija/sticky, ancho 100%
  ├──────────┬──────────────────────────┤
  │          │                          │
  │ SIDEBAR  │   MAIN CONTENT           │  ← scroll vertical independiente
  │          │                          │
  │          │                          │
  ├──────────┴──────────────────────────┤
  │              FOOTER (opcional)      │
  └─────────────────────────────────────┘

CSS notas:
  - Root: display grid, grid-template:
      "header header" auto
      "sidebar main" 1fr
      "footer footer" auto
      / {sidebarWidth}px 1fr
  - Usar CSS custom properties para los valores dinámicos:
      --sidebar-width: {sidebarWidth}px  (setear en style inline)
  - Header: grid-area header, position sticky, top 0, z-index var(--z-dropdown)
  - Sidebar: grid-area sidebar, height calc(100vh - {headerHeight}px)
             position sticky, top {headerHeight}px, overflow-y auto
  - Main: grid-area main, overflow-y auto, min-height 0
  - Footer: grid-area footer
  - sidebarCollapsed: cambiar --sidebar-width a collapsedWidth vía style inline
  - Mobile (<768px): sidebar hidden (display none) o como drawer externo

Responsive:
  @media (max-width: 768px):
    grid: "header" auto / 1fr  +  "main" 1fr / 1fr
    sidebar: display none (el Header provee el menú hamburguesa)

──────────────────────────────────────────
### TM-02 · AuthLayout
──────────────────────────────────────────
Propósito:
  Layout para pantallas de autenticación: login, registro, recuperación de
  contraseña. Sin sidebar, centrado, con panel lateral de marketing opcional.

Props:
  children      : ReactNode (requerido)  ← formulario de auth
  brandPanel    : ReactNode (opcional)   ← panel izquierdo con imagen/copy
  logo          : ReactNode (opcional)
  footer        : ReactNode (opcional)   ← links legales
  variant       : 'centered' | 'split' → default: 'centered'
  bgPattern     : boolean → default: false  ← fondo con patrón sutil

Estructura variant='centered':
  ┌─────────────────────────────────────┐
  │                                     │
  │        ┌──────────────┐            │
  │        │    LOGO      │            │
  │        │  (children)  │            │
  │        └──────────────┘            │
  │               FOOTER               │
  └─────────────────────────────────────┘

Estructura variant='split':
  ┌─────────────────┬───────────────────┐
  │                 │                   │
  │  BRAND PANEL    │    (children)     │
  │  (brandPanel)   │                   │
  │                 │                   │
  └─────────────────┴───────────────────┘

CSS notas:
  - centered: min-height 100vh, display flex, flex-direction column
              justify-content center, align-items center
              children wrapper: width 100%, max-width 400px
  - split: min-height 100vh, display grid, grid-template-columns 1fr 1fr
           brandPanel: bg var(--color-primary-600), padding var(--space-12)
           children wrapper: display flex, align-items center, justify-content center
  - bgPattern (centered): bg con svg pattern inline en CSS (dots o grid sutil)
  - Mobile split → stack vertical: brandPanel arriba (height 200px), form abajo

──────────────────────────────────────────
### TM-03 · ListingLayout
──────────────────────────────────────────
Propósito:
  Layout para pantallas de listado: tablas, grids de tarjetas, directorios.
  Tiene área de filtros colapsable y área de contenido principal.

Props:
  header        : ReactNode (requerido)
  sidebar       : ReactNode (opcional)   ← sidebar de contexto (no nav)
  filterBar     : ReactNode (opcional)
  children      : ReactNode (requerido)  ← tabla o grid de cards
  breadcrumb    : ReactNode (opcional)
  title         : ReactNode (opcional)   ← heading de la sección
  actions       : ReactNode (opcional)   ← botones de acción superiores
  loading       : boolean → default: false
  contentLayout : 'table' | 'grid' | 'list' → default: 'table'
  gridColumns   : 2 | 3 | 4 → default: 3  (solo cuando contentLayout='grid')

Estructura:
  ┌─────────────────────────────────────┐
  │              HEADER                 │
  ├─────────────────────────────────────┤
  │  BREADCRUMB (opcional)              │
  │  TITLE                ACTIONS       │
  │  FILTER BAR                         │
  ├─────────────┬───────────────────────┤
  │             │                       │
  │  SIDEBAR    │   CHILDREN            │
  │  (opc.)     │   (tabla / grid)      │
  │             │                       │
  └─────────────┴───────────────────────┘

CSS notas:
  - Igual que DashboardLayout pero sin footer y con sección de controles
  - Sección de controles: padding var(--space-4) var(--space-6)
                          border-bottom 1px var(--color-border)
  - contentLayout='grid': children en CSS Grid con gridColumns columnas
      grid-template-columns: repeat({gridColumns}, 1fr), gap var(--space-4)
  - contentLayout='list': children en flex-direction column

──────────────────────────────────────────
### TM-04 · DetailLayout
──────────────────────────────────────────
Propósito:
  Layout para pantallas de detalle de un recurso: perfil, producto, artículo.
  Área principal ancha con panel de metadatos lateral opcional.

Props:
  header        : ReactNode (requerido)
  breadcrumb    : ReactNode (opcional)
  title         : ReactNode (opcional)
  actions       : ReactNode (opcional)
  children      : ReactNode (requerido)  ← contenido principal
  metaPanel     : ReactNode (opcional)   ← panel lateral de info
  metaPanelWidth: number → default: 320
  metaPanelPosition : 'right' | 'left' → default: 'right'
  maxWidth      : number | 'full' → default: 960

Estructura:
  ┌─────────────────────────────────────┐
  │              HEADER                 │
  ├─────────────────────────────────────┤
  │  BREADCRUMB                         │
  │  TITLE                ACTIONS       │
  ├──────────────────────┬──────────────┤
  │                      │              │
  │   CHILDREN (main)    │  META PANEL  │
  │                      │  (opcional)  │
  │                      │              │
  └──────────────────────┴──────────────┘

CSS notas:
  - Área de contenido: max-width={maxWidth}px, margin 0 auto
  - Con metaPanel: display grid, grid-template-columns 1fr {metaPanelWidth}px
  - metaPanelPosition='left': invertir columnas
  - Sin metaPanel: children ocupa el 100%
  - Mobile: stack vertical, metaPanel debajo de children

──────────────────────────────────────────
### TM-05 · BlankLayout
──────────────────────────────────────────
Propósito:
  Layout mínimo sin chrome de aplicación. Para páginas de error (404, 500),
  landing pages, pantallas de onboarding y vistas de impresión.

Props:
  children      : ReactNode (requerido)
  centered      : boolean → default: true
  maxWidth      : number | 'full' → default: 'full'
  bgColor       : string (CSS var) → default: 'var(--color-bg)'
  padding       : 'none' | 'sm' | 'md' | 'lg' → default: 'md'

Estructura:
  ┌─────────────────────────────────────┐
  │                                     │
  │           CHILDREN                  │
  │      (centrado o no)                │
  │                                     │
  └─────────────────────────────────────┘

CSS notas:
  - min-height: 100vh, width: 100%
  - centered=true: display flex, justify-content center, align-items center
  - padding sm: var(--space-4) · md: var(--space-8) · lg: var(--space-12)
  - Fondo: background-color via prop (permite override del color de página)


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PARTE 2 — PAGES A GENERAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Genera las 6 pages en este orden. Cada page usa el template correspondiente
y lo instancia con organismos y datos mock realistas.

Importaciones en cada page:
  ✓ El template que le corresponde
  ✓ Los organismos necesarios
  ✓ Nunca datos externos — todo mock inline o en archivo mockData.ts local

──────────────────────────────────────────
### PG-01 · DashboardPage
Template: DashboardLayout
Organismos: Header, Sidebar, Card, DataTable, Tabs, UserMenu
──────────────────────────────────────────
Propósito:
  Pantalla principal de una aplicación de gestión. Muestra métricas clave,
  tabla de actividad reciente y navegación completa.

Estado interno (useState):
  - sidebarCollapsed: boolean
  - activeTab: string
  - selectedRows: string[]
  - isUserMenuOpen: boolean
  - notifications: number (mock: 3)

Secciones de contenido:
  1. Fila de métricas: 4 Cards con KPIs (usuarios, ingresos, pedidos, conversión)
     Cada Card tiene: ícono, valor grande, label, porcentaje de cambio (Badge)
  2. Tabs con dos paneles:
     - "Actividad reciente": DataTable con columnas (usuario, acción, fecha, estado)
     - "Resumen mensual": 3 Cards con descripción de texto

Mock data para DataTable (10 filas):
  columns: [
    { key: 'user',   header: 'Usuario',  render: fila con Avatar + nombre },
    { key: 'action', header: 'Acción' },
    { key: 'date',   header: 'Fecha' },
    { key: 'status', header: 'Estado', render: Badge según status },
  ]
  data: 10 objetos con ids, nombres peruanos plausibles, fechas del último mes

NavItems del Sidebar (mínimo 6):
  home, usuarios, productos, pedidos, reportes, configuración
  Con badges numéricos en "pedidos" (5) y "reportes" (2)

Header:
  - Logo: "AppDashboard" en Typography h5
  - SearchBar funcional (onSearch → console.log en demo)
  - Action con Bell + badge 3
  - UserMenu con el usuario mock

──────────────────────────────────────────
### PG-02 · LoginPage
Template: AuthLayout (variant='split')
Organismos: LoginForm
──────────────────────────────────────────
Propósito:
  Pantalla de acceso a la aplicación con formulario de login y panel de marca.

Estado interno (useState):
  - loading: boolean
  - error: string | null

Brand panel (slot izquierdo):
  - Fondo color primary-700
  - Logo grande centrado (SVG simple o texto estilizado)
  - Tagline: "Gestiona tu negocio con claridad"
  - 3 bullets de beneficios con íconos check

LoginForm props:
  - onSubmit: simula loading 1.5s → si email contiene "error" setear error
  - onForgotPassword: console.log
  - onRegister: console.log
  - socialProviders: ['google', 'github']
  - loading: del estado interno
  - error: del estado interno

Footer de la página:
  "© 2026 AppDashboard · Términos · Privacidad"

──────────────────────────────────────────
### PG-03 · UsersPage
Template: ListingLayout (contentLayout='table')
Organismos: Header, Sidebar, FilterBar, DataTable, Modal, Drawer
──────────────────────────────────────────
Propósito:
  Listado completo de usuarios con filtros, búsqueda, acciones por fila
  y modal de confirmación de eliminación.

Estado interno (useState):
  - users: User[] (mock de 20 usuarios)
  - filteredUsers: User[]
  - selectedIds: string[]
  - searchQuery: string
  - filters: Record<string, unknown>
  - isDeleteModalOpen: boolean
  - userToDelete: User | null
  - isDetailDrawerOpen: boolean
  - selectedUser: User | null
  - loading: boolean

Tipo User (mock):
  { id, name, email, role: 'admin'|'editor'|'viewer', status: 'active'|'inactive',
    createdAt: string, avatarSrc?: string }

Columnas de DataTable:
  - Avatar + nombre + email (render compuesto)
  - Rol: Badge (primary=admin, default=editor, warning=viewer)
  - Estado: Badge (success=active, danger=inactive)
  - Creado: fecha formateada
  - Acciones: Button ghost icon="edit" + Button ghost icon="trash" danger

FilterBar filters:
  - role: select múltiple (admin, editor, viewer)
  - status: radio (todos, activo, inactivo)

Modal de confirmación de borrado:
  - title: "Eliminar usuario"
  - Mensaje con nombre del usuario a eliminar
  - Footer: Button secondary "Cancelar" + Button danger "Eliminar"

Drawer de detalle:
  - placement: 'right', size: 'md'
  - Muestra UserCard grande + campos de info + tabs (actividad, permisos)

──────────────────────────────────────────
### PG-04 · ProfilePage
Template: DetailLayout
Organismos: Header, Sidebar, Card, Tabs, Modal
Átomos: Avatar, Button, Badge, Typography, Divider
──────────────────────────────────────────
Propósito:
  Perfil completo de un usuario con información personal, estadísticas,
  actividad reciente y opción de edición.

Estado interno (useState):
  - isEditModalOpen: boolean
  - activeTab: string

Datos mock del perfil:
  { name: 'Ana María Torres', role: 'Administradora', email: 'ana@empresa.com',
    phone: '+51 999 123 456', location: 'Lima, Perú', joined: 'Enero 2023',
    avatar: initials 'AT', stats: { projects: 24, tasks: 148, reviews: 67 } }

Meta panel (slot derecho — 300px):
  - Avatar grande (xl) + nombre + badge de rol
  - Divider
  - Lista de info: email, teléfono, ubicación, fecha de ingreso
  - Button fullWidth "Editar perfil" → abre Modal

Contenido principal (tabs):
  - "Actividad": lista de 5 items recientes con ícono, texto y fecha
  - "Proyectos": grid 2 columnas de Cards con nombre, progreso (ProgressBar), estado
  - "Configuración": FormField con datos editables (solo visual, sin submit real)

Modal de edición:
  - title: "Editar perfil"
  - FormField: nombre, email, teléfono
  - Footer: Cancelar + Guardar cambios (loading 1s al hacer clic)

──────────────────────────────────────────
### PG-05 · SettingsPage
Template: DetailLayout (sin metaPanel, maxWidth=800)
Organismos: Header, Sidebar, Tabs, Card, Notification
Moléculas: FormField, RadioGroup, FileUpload
──────────────────────────────────────────
Propósito:
  Página de configuración de cuenta con secciones para perfil, seguridad,
  notificaciones y apariencia.

Estado interno (useState):
  - activeTab: string
  - saveSuccess: boolean
  - saving: boolean

Tabs de configuración:
  1. "Perfil" — Card con FormField: nombre, email, bio (Textarea), avatar (FileUpload)
  2. "Seguridad" — Card con cambio de contraseña + toggle 2FA (Checkbox)
  3. "Notificaciones" — Card con RadioGroup (frecuencia) + lista de Checkbox por tipo
  4. "Apariencia" — Card con RadioGroup de tema (claro/oscuro/sistema)

Comportamiento de guardado:
  - Botón "Guardar" → saving=true 1s → saveSuccess=true → Notification success 3s

──────────────────────────────────────────
### PG-06 · NotFoundPage
Template: BlankLayout (centered=true)
──────────────────────────────────────────
Propósito:
  Página de error 404 con ilustración, mensaje claro y acción de regreso.
  Sin chrome de aplicación (sin Header ni Sidebar).

Contenido (todo con átomos):
  - Número grande "404" en Typography h1, color primary
  - Ilustración SVG inline simple (círculo con signo de interrogación)
  - Typography h3: "Página no encontrada"
  - Typography body secondary: "Lo sentimos, la página que buscas no existe
    o fue movida."
  - Button primary "Volver al inicio" + Button ghost "Ir atrás"
  - Divider + Typography caption: link de soporte

Estado interno (none — página estática)

CSS del contenido:
  - display flex, flex-direction column, align-items center, gap var(--space-4)
  - max-width 480px, text-align center
  - El "404": font-size 8rem, font-weight 700, line-height 1


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## MAPA DE TEMPLATES → PAGES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  TM-01 DashboardLayout  →  PG-01 DashboardPage
  TM-02 AuthLayout       →  PG-02 LoginPage
  TM-03 ListingLayout    →  PG-03 UsersPage
  TM-04 DetailLayout     →  PG-04 ProfilePage, PG-05 SettingsPage
  TM-05 BlankLayout      →  PG-06 NotFoundPage


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PASO FINAL — Actualizar barrel y verificar
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Después de generar templates y pages, actualizar @src/index.ts:

  // ─── Templates ────────────────────────────────
  export * from './templates/AuthLayout'
  export * from './templates/BlankLayout'
  export * from './templates/DashboardLayout'
  export * from './templates/DetailLayout'
  export * from './templates/ListingLayout'

  // ─── Pages (demos — no se publican como librería) ─
  // export * from './pages/DashboardPage'
  // export * from './pages/LoginPage'
  // export * from './pages/UsersPage'
  // export * from './pages/ProfilePage'
  // export * from './pages/SettingsPage'
  // export * from './pages/NotFoundPage'

  NOTA: Las pages van comentadas en el barrel — son demos del sistema,
  no componentes reutilizables de la biblioteca.

Ejecutar verificación final:
  npx tsc --noEmit

Reportar resultado en formato:
  ─── TEMPLATES ───────────────────────────────────
  ✓ TM-01 DashboardLayout  — 4 archivos · sin errores TS
  ✓ TM-02 AuthLayout       — 4 archivos · sin errores TS
  ✓ TM-03 ListingLayout    — 4 archivos · sin errores TS
  ✓ TM-04 DetailLayout     — 4 archivos · sin errores TS
  ✓ TM-05 BlankLayout      — 4 archivos · sin errores TS

  ─── PAGES ───────────────────────────────────────
  ✓ PG-01 DashboardPage    — 2 archivos · sin errores TS
  ✓ PG-02 LoginPage        — 2 archivos · sin errores TS
  ✓ PG-03 UsersPage        — 2 archivos · sin errores TS
  ✓ PG-04 ProfilePage      — 2 archivos · sin errores TS
  ✓ PG-05 SettingsPage     — 2 archivos · sin errores TS
  ✓ PG-06 NotFoundPage     — 2 archivos · sin errores TS
  ─────────────────────────────────────────────────
  Total: 32 archivos | Errores TypeScript: 0


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ANTI-PATRONES — Detectar y corregir antes de guardar
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  TEMPLATES:
  ✗ useState / useEffect dentro del template
    → los templates son puramente estructurales, sin estado

  ✗ props como users: User[]  en un template
    → los templates reciben ReactNode, no datos de dominio

  ✗ import { Header } from '../organisms/Header' dentro de un template
    → el template recibe <Header> ya instanciado como ReactNode prop,
      NO lo instancia él mismo

  ✗ CSS con valores en duro: grid-template-columns: 240px 1fr
    → usar CSS custom properties: grid-template-columns: var(--sidebar-w) 1fr
      y setar --sidebar-w con style inline desde la prop

  PAGES:
  ✗ fetch('/api/users') o useQuery(...)
    → todo mock; añadir comentario // en producción: const { data } = useQuery(...)

  ✗ import { useNavigate } from 'react-router-dom'
    → sin dependencias de router; los callbacks de navegación son props (onNavigate)

  ✗ Datos mock no plausibles: name="User1", email="test@test.com"
    → usar datos realistas: "Carlos Mendoza", "carlos@empresa.com"

  ✗ Page sin story "Loading" y "Empty"
    → siempre incluir los 3 estados fundamentales en Storybook

  ✗ Template sin decorator de altura completa en Storybook
    → los layouts necesitan height: 100vh para verse correctamente
