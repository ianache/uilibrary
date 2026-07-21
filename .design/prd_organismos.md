# PROMPT MAESTRO — Generación de Organismos
# UIComponentLibrary · Claude Code
# Usar con: claude (en la raíz del proyecto)
# ══════════════════════════════════════════════════════════════

Eres un experto en diseño de sistemas de componentes React con TypeScript,
CSS Modules y Atomic Design. Tu tarea es construir la capa de ORGANISMOS completa
de la biblioteca UIComponentLibrary siguiendo la especificación incluida aquí.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## CONTEXTO DEL PROYECTO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Proyecto    : UIComponentLibrary
- Metodología : Atomic Design — capa de ORGANISMOS
- Stack       : React 18 · TypeScript 5 · Vite 5 · CSS Modules · clsx
- Catálogo    : Storybook 8
- Ruta base   : src/organisms/

Lee estos archivos ANTES de escribir cualquier código:

  — Tokens —
  @src/tokens/tokens.css
  @src/tokens/index.ts

  — Átomos disponibles —
  @src/atoms/Button/index.ts
  @src/atoms/Input/index.ts
  @src/atoms/Select/index.ts
  @src/atoms/Checkbox/index.ts
  @src/atoms/Textarea/index.ts
  @src/atoms/Icon/index.ts
  @src/atoms/Typography/index.ts
  @src/atoms/Badge/index.ts
  @src/atoms/Tag/index.ts
  @src/atoms/Avatar/index.ts
  @src/atoms/Spinner/index.ts
  @src/atoms/Divider/index.ts

  — Moléculas disponibles —
  @src/molecules/SearchBar/index.ts
  @src/molecules/FormField/index.ts
  @src/molecules/UserCard/index.ts
  @src/molecules/Notification/index.ts
  @src/molecules/Breadcrumb/index.ts
  @src/molecules/InputGroup/index.ts
  @src/molecules/TagInput/index.ts
  @src/molecules/AvatarGroup/index.ts
  @src/molecules/ProgressBar/index.ts
  @src/molecules/Tooltip/index.ts
  @src/molecules/RadioGroup/index.ts
  @src/molecules/FileUpload/index.ts

  — Barrel principal —
  @src/index.ts


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## QUÉ ES UN ORGANISMO (leer antes de codificar)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Un organismo es una sección de UI compleja y autónoma con identidad propia.
Combina moléculas y átomos para formar una unidad reconocible en el producto.

Los organismos:

  ✓ Importan moléculas (src/molecules/*) y átomos (src/atoms/*)
  ✓ Tienen estado local React complejo (useState, useReducer, useRef)
  ✓ Pueden recibir datos como props (arrays, objetos de dominio)
  ✓ Manejan lógica de UI compleja (sort, filter, pagination, collapse)
  ✓ Exponen callbacks para que el padre conecte con APIs/stores
  ✓ Tienen identidad visual clara: Header, Sidebar, DataTable, etc.
  ✗ NO hacen fetch directamente — reciben datos por props + callbacks
  ✗ NO importan otros organismos (evitar dependencias horizontales)
  ✗ NO tienen margin externo (el template controla el layout)


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## REGLAS GLOBALES — NUNCA ROMPER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

IMPORTACIONES
  ✓ Moléculas desde su barrel: import { SearchBar } from '../molecules/SearchBar'
  ✓ Átomos desde su barrel:   import { Button }    from '../atoms/Button'
  ✗ Nunca rutas internas:     import { X } from '../molecules/SearchBar/SearchBar'
  ✗ Organismos NO importan otros organismos

DATOS Y ESTADO
  ✓ Los datos llegan por props (arrays, objetos tipados)
  ✓ El estado interno es solo UI (qué fila está expandida, orden, página actual)
  ✓ Los callbacks (onSubmit, onChange, onSelect) son la única salida de datos
  ✗ Sin fetch, sin axios, sin useQuery directo en el organismo
  ✗ Sin imports de Zustand, Redux, Context global

ESTILOS
  ✓ Solo CSS Modules + var(--token) de tokens.css
  ✓ Layouts complejos (grid de 3 columnas, sidebar fijo) van en el CSS del organismo
  ✗ Sin margin externo en el wrapper raíz

TYPESCRIPT
  ✓ Definir tipos de datos propios del organismo (Column<T>, NavItem, TableRow)
  ✓ Generics donde aplique (DataTable<T>, por ejemplo)
  ✓ Exportar todos los tipos junto al componente
  ✗ Prohibido `any`

ACCESIBILIDAD
  ✓ Landmarks semánticos: <header>, <nav>, <main>, <aside>, <footer>
  ✓ aria-label en regiones sin heading visible
  ✓ Gestión de foco al abrir modales/drawers (focus trap)
  ✓ Tablas con <thead>, <tbody>, scope="col"/"row", caption o aria-label

STORYBOOK
  ✓ title: 'Organisms/NombreOrganismo' · tags: ['autodocs']
  ✓ Story "Default" con datos mock representativos
  ✓ Story "Interactive" con useState simulando el flujo real
  ✓ Story "Empty" — estado sin datos (skeleton o mensaje vacío)
  ✓ Story "Loading" — estado de carga
  ✓ Decorators con padding/fondo si el organismo necesita contenedor

ESTRUCTURA DE ARCHIVOS por organismo:
  src/organisms/NombreOrganismo/
  ├── NombreOrganismo.tsx
  ├── NombreOrganismo.module.css
  ├── NombreOrganismo.stories.tsx
  └── index.ts


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ORGANISMOS A GENERAR (en este orden)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Trabaja organismo por organismo, completando los 4 archivos antes de continuar.

──────────────────────────────────────────
### OR-01 · Header
Moléculas: SearchBar, Breadcrumb, UserCard
Átomos: Button, Icon, Avatar, Typography, Badge
──────────────────────────────────────────
Propósito:
  Barra de navegación principal de la aplicación. Contiene logo, búsqueda
  global, acciones de cabecera y menú de usuario.

Props:
  logo          : ReactNode (opcional) — logo o nombre de la app
  onLogoClick   : () => void
  searchProps   : SearchBarProps (opcional) — pasa props a SearchBar
  showSearch    : boolean → default: true
  actions       : Array<{
                    icon: IconName
                    label: string
                    onClick: () => void
                    badge?: number | string   ← contador de notificaciones
                  }> (opcional)
  user          : { name: string; role?: string; avatarSrc?: string } (opcional)
  onUserClick   : () => void
  onMenuClick   : () => void  ← hamburguesa para mobile
  variant       : 'default' | 'transparent' | 'dark' → default: 'default'
  sticky        : boolean → default: true

Comportamiento:
  ✓ sticky=true: position:sticky top:0, z-index var(--z-dropdown)
  ✓ variant='dark': fondo var(--color-neutral-900), texto blanco
  ✓ variant='transparent': sin fondo, solo en páginas con hero image
  ✓ actions con badge: Badge flotante sobre el Icon con el número
  ✓ User section: Avatar + nombre (oculto en mobile) + chevron-down
  ✓ Mobile (<768px): ocultar SearchBar y actions text, mostrar ícono hamburguesa

CSS notas:
  - Wrapper: <header>, display flex, align-items center, height 64px
  - padding: 0 var(--space-6), gap var(--space-4)
  - Sección izquierda (logo): flex-shrink 0
  - Sección central (search): flex 1, max-width 480px
  - Sección derecha (actions+user): flex-shrink 0, display flex, gap var(--space-2)
  - Borde inferior: 1px solid var(--color-border)
  - default: bg var(--color-bg)
  - dark: bg var(--color-neutral-900)

──────────────────────────────────────────
### OR-02 · Sidebar
Moléculas: Tooltip, UserCard
Átomos: Button, Icon, Typography, Avatar, Badge, Divider
──────────────────────────────────────────
Propósito:
  Panel de navegación lateral con ítems de menú agrupados, indicador de
  ítem activo y modo colapsado (solo iconos).

Props:
  items         : Array<NavItem>
  activeId      : string  — id del ítem activo
  onItemClick   : (id: string) => void
  collapsed     : boolean → default: false
  onToggle      : () => void  ← colapsar/expandir
  user          : { name: string; role?: string; avatarSrc?: string } (opcional)
  onUserClick   : () => void
  width         : number → default: 240  ← en px (expandido)
  collapsedWidth: number → default: 64

Tipo NavItem:
  {
    id       : string
    label    : string
    icon     : IconName
    badge    ?: number | string
    href     ?: string
    disabled ?: boolean
    children ?: NavItem[]   ← submenú colapsable
  }

Comportamiento:
  ✓ Ítem activo: borde izquierdo primary-600 (4px), bg primary-50, texto primary
  ✓ Ítem con children: flecha chevron-right que rota al expandir
  ✓ collapsed=true: solo íconos + Tooltip con label en hover (usando ML-10)
  ✓ collapsed=true: ocultar texto, badge numérico, sección de user name
  ✓ Submenú: animación slide-down con CSS max-height transition
  ✓ Badge numérico: Badge variant='danger' sobre el ícono en modo colapsado
  ✓ Ítem disabled: opacity 0.45, pointer-events none

CSS notas:
  - <aside>: height 100%, overflow-y auto, border-right 1px var(--color-border)
  - transition: width var(--transition-slow)
  - Ítem: height 40px, display flex, align-items center, gap var(--space-3)
  - padding: 0 var(--space-3)
  - border-radius var(--radius-md) en el ítem
  - Sección de usuario: mt auto (al fondo del sidebar), padding var(--space-3)
  - Divider entre grupos de ítems

──────────────────────────────────────────
### OR-03 · DataTable
Moléculas: SearchBar, Notification, ProgressBar
Átomos: Button, Icon, Checkbox, Badge, Spinner, Typography
──────────────────────────────────────────
Propósito:
  Tabla de datos con ordenamiento, selección, paginación y estado vacío.
  Genérica: funciona con cualquier tipo de dato mediante columnas configurables.

Props (genéricas con T):
  data          : T[]
  columns       : Column<T>[]
  loading       : boolean → default: false
  error         : string (opcional)
  emptyMessage  : string → default: 'No hay datos que mostrar'
  selectable    : boolean → default: false
  selectedIds   : string[]
  onSelectionChange : (ids: string[]) => void
  sortable      : boolean → default: true
  defaultSort   : { key: keyof T; direction: 'asc' | 'desc' } (opcional)
  pagination    : { page: number; pageSize: number; total: number } (opcional)
  onPageChange  : (page: number) => void
  onSort        : (key: keyof T, direction: 'asc' | 'desc') => void
  caption       : string (opcional)  ← accesibilidad

Tipo Column<T>:
  {
    key        : keyof T | string
    header     : string
    render    ?: (row: T) => ReactNode   ← renderizado custom de celda
    sortable  ?: boolean
    width     ?: string                  ← ej: '120px', '20%'
    align     ?: 'left' | 'center' | 'right' → default: 'left'
  }

Comportamiento:
  ✓ loading=true: overlay de Spinner centrado sobre la tabla
  ✓ error: Notification variant='error' en lugar de la tabla
  ✓ Sin datos: ilustración + emptyMessage centrado
  ✓ Checkbox en header: selecciona/deselecciona todos (indeterminate si parcial)
  ✓ Columna sortable: Icon chevron-up/down junto al header, activo muestra dirección
  ✓ Paginación: "Mostrando X-Y de Z" + botones prev/next + selector de página
  ✓ render() personalizado: permite Badge, Avatar, botones de acción por fila

CSS notas:
  - Wrapper: overflow-x auto (scroll horizontal en mobile)
  - <table>: width 100%, border-collapse collapse
  - <th>: bg var(--color-bg-subtle), font-weight semibold, text-align según align
  - <tr>:hover: bg var(--color-bg-subtle)
  - <tr> seleccionada: bg var(--color-primary-50)
  - Celda: padding var(--space-3) var(--space-4), border-bottom var(--color-border)
  - Paginación: display flex, justify-content space-between, mt var(--space-4)

──────────────────────────────────────────
### OR-04 · LoginForm
Moléculas: FormField, Notification
Átomos: Button, Input, Checkbox, Typography, Divider, Icon
──────────────────────────────────────────
Propósito:
  Formulario de autenticación completo con email, contraseña, recordarme
  y enlace de recuperación. Soporta estado de carga y error global.

Props:
  onSubmit        : (data: { email: string; password: string; remember: boolean }) => void
  onForgotPassword: () => void
  onRegister      : () => void (opcional)
  loading         : boolean → default: false
  error           : string (opcional) — error global (credenciales inválidas)
  socialProviders : Array<'google' | 'github' | 'microsoft'> (opcional)
  title           : string → default: 'Iniciar sesión'
  subtitle        : string (opcional)

Estado interno:
  - email: string
  - password: string
  - remember: boolean
  - showPassword: boolean
  - errors: { email?: string; password?: string }  ← validación local

Comportamiento:
  ✓ Validación local antes de llamar onSubmit:
      email: requerido + formato válido
      password: requerido + mínimo 8 caracteres
  ✓ showPassword: toggle ícono eye/eye-off en suffix del Input de contraseña
  ✓ Con error prop: Notification variant='error' arriba del formulario
  ✓ loading=true: Button disabled + spinner
  ✓ socialProviders: botones con ícono de cada proveedor antes del Divider "O"
  ✓ Submit con Enter en cualquier campo

CSS notas:
  - Wrapper: max-width 400px, display flex, flex-direction column, gap var(--space-5)
  - Social buttons: display grid, grid-template-columns según cantidad de providers
  - Sección forgot: text-align right, font-size sm

──────────────────────────────────────────
### OR-05 · UserMenu
Moléculas: UserCard, Tooltip
Átomos: Avatar, Button, Icon, Typography, Divider, Badge
──────────────────────────────────────────
Propósito:
  Menú desplegable de usuario que muestra información del perfil y acciones
  de cuenta. Se ancla al Avatar/nombre del usuario en el Header.

Props:
  user          : { name: string; email: string; role?: string; avatarSrc?: string }
  items         : Array<MenuSection>
  onClose       : () => void
  isOpen        : boolean
  anchorRef     : RefObject<HTMLElement> (opcional) ← para posicionamiento

Tipo MenuSection:
  {
    title  ?: string
    items   : Array<{
      id       : string
      label    : string
      icon    ?: IconName
      badge   ?: string | number
      variant ?: 'default' | 'danger'
      onClick  : () => void
      disabled?: boolean
    }>
  }

Comportamiento:
  ✓ isOpen controla visibilidad (el padre gestiona el toggle)
  ✓ Cierra al pulsar Escape
  ✓ Cierra al hacer clic fuera (useEffect + event listener en document)
  ✓ Primer foco al abrir va al primer ítem del menú (focus management)
  ✓ Navegación con ↑↓ entre ítems, Tab/Shift+Tab también
  ✓ variant='danger': color rojo en label e ícono (ej: "Cerrar sesión")
  ✓ Secciones separadas con Divider
  ✓ UserCard del usuario en la parte superior (no clicable, solo informativo)

CSS notas:
  - Wrapper: position absolute, top calc(100% + 8px), right 0
  - min-width 220px, bg var(--color-bg), border var(--color-border)
  - border-radius var(--radius-lg), box-shadow var(--shadow-lg)
  - z-index var(--z-dropdown)
  - Ítem: height 36px, display flex, align-items center, gap var(--space-2)
  - padding: 0 var(--space-3), border-radius var(--radius-md)
  - hover: bg var(--color-bg-muted)
  - Animación de apertura: opacity 0→1 + translateY(-4px→0) en 150ms

──────────────────────────────────────────
### OR-06 · Modal
Moléculas: Notification (opcional)
Átomos: Button, Icon, Typography, Divider
──────────────────────────────────────────
Propósito:
  Diálogo modal accesible con overlay, header, body scrollable y footer
  de acciones. Soporta múltiples tamaños y cierre controlado.

Props:
  isOpen        : boolean
  onClose       : () => void
  title         : string (opcional)
  description   : string (opcional)
  size          : 'sm' | 'md' | 'lg' | 'xl' | 'full' → default: 'md'
  children      : ReactNode
  footer        : ReactNode (opcional)
  closeOnOverlay: boolean → default: true
  closeOnEsc    : boolean → default: true
  loading       : boolean → default: false

Comportamiento:
  ✓ Renderizado con createPortal hacia document.body
  ✓ Scroll lock en body mientras está abierto (overflow:hidden en <body>)
  ✓ Focus trap: Tab y Shift+Tab ciclan solo dentro del modal
  ✓ Primer foco al abrir: primer elemento enfocable del modal
  ✓ Al cerrar: devolver foco al elemento que abrió el modal
  ✓ closeOnEsc: listener de Escape en document
  ✓ closeOnOverlay: clic en el overlay llama onClose
  ✓ loading=true: deshabilita botones del footer + Spinner en header
  ✓ Animación: overlay opacity 0→1, panel translateY(20px→0) en 200ms

Tamaños (ancho máximo):
  sm: 400px · md: 560px · lg: 720px · xl: 960px · full: 100vw - 32px

CSS notas:
  - Overlay: position fixed, inset 0, bg rgba(0,0,0,0.5), z-index var(--z-modal)
  - Panel: position relative, bg var(--color-bg), border-radius var(--radius-xl)
  - max-height: calc(100vh - 64px), display flex, flex-direction column
  - Header: flex-shrink 0, padding var(--space-5) var(--space-6)
  - Body: overflow-y auto, flex 1, padding var(--space-5) var(--space-6)
  - Footer: flex-shrink 0, padding var(--space-4) var(--space-6)
            display flex, justify-content flex-end, gap var(--space-3)

Accesibilidad:
  role="dialog", aria-modal="true", aria-labelledby (título), aria-describedby (desc)

──────────────────────────────────────────
### OR-07 · Tabs
Átomos: Button, Icon, Badge, Typography
──────────────────────────────────────────
Propósito:
  Navegación por pestañas que organiza contenido en secciones alternativas.
  Soporta tabs con íconos, badges y orientación horizontal/vertical.

Props:
  tabs          : Array<TabItem>
  activeId      : string
  onChange      : (id: string) => void
  variant       : 'line' | 'pill' | 'card' → default: 'line'
  orientation   : 'horizontal' | 'vertical' → default: 'horizontal'
  fullWidth     : boolean → default: false

Tipo TabItem:
  {
    id       : string
    label    : string
    icon    ?: IconName
    badge   ?: string | number
    disabled?: boolean
    content  : ReactNode
  }

Comportamiento:
  ✓ Tab activo controlado por el padre (activeId + onChange)
  ✓ Navegación por teclado: ←→ (horizontal) o ↑↓ (vertical) entre tabs
  ✓ Home/End: ir al primer/último tab habilitado
  ✓ Tab disabled: no seleccionable, opacity 0.45
  ✓ Panel de contenido: solo el activo visible (hidden con display:none para
    preservar estado, o lazy con condicional si el padre prefiere)

Variantes visuales:
  line → indicador inferior animado (transform: translateX)
  pill → tab activo con bg primary-100, borde-radius full
  card → tabs como pestañas elevadas, activo sin borde inferior

Accesibilidad:
  role="tablist" en el contenedor de tabs
  role="tab", aria-selected, aria-controls por cada tab
  role="tabpanel", aria-labelledby en cada panel

CSS notas:
  - tablist: display flex, border-bottom 1px solid (si line/card)
  - Tab: height 40px, padding 0 var(--space-4), cursor pointer
  - line: indicador: pseudo ::after, height 2px, bg primary, transition width
  - pill: padding var(--space-1) var(--space-3), border-radius full
  - fullWidth: cada tab flex:1, text-align center

──────────────────────────────────────────
### OR-08 · Card
Moléculas: (flexible, depende del contenido)
Átomos: Button, Icon, Badge, Typography, Avatar, Divider
──────────────────────────────────────────
Propósito:
  Contenedor de contenido polimórfico con header, body, footer y variantes
  de presentación. Bloque de construcción central de dashboards y listados.

Props:
  title         : string (opcional)
  subtitle      : string (opcional)
  headerAction  : ReactNode (opcional) — acción en la esquina del header
  footer        : ReactNode (opcional)
  media         : { src: string; alt: string; aspect?: '16/9' | '4/3' | '1/1' } (opc.)
  variant       : 'default' | 'outlined' | 'elevated' | 'ghost' → default: 'default'
  padding       : 'none' | 'sm' | 'md' | 'lg' → default: 'md'
  hoverable     : boolean → default: false — sombra en hover
  selected      : boolean → default: false
  loading       : boolean → default: false — muestra skeleton
  onClick       : () => void (opcional)
  children      : ReactNode

Comportamiento:
  ✓ loading=true: reemplaza children con skeleton animado (3 líneas de barras)
  ✓ onClick: role="button", tabIndex=0, hover bg, cursor pointer
  ✓ selected: borde primary-400, bg primary-50
  ✓ hoverable: box-shadow en hover (var(--shadow-md))
  ✓ media: imagen en la parte superior, antes del header

Variantes:
  default  → borde + sombra suave (shadow-sm)
  outlined → solo borde, sin sombra
  elevated → sin borde + shadow-md
  ghost    → sin borde ni sombra, solo bg subtle

CSS notas:
  - Wrapper: border-radius var(--radius-lg), overflow hidden
  - padding sm: var(--space-3) · md: var(--space-5) · lg: var(--space-7)
  - Header: display flex, justify-content space-between, align-items flex-start
  - Media: aspect-ratio según prop, object-fit cover, width 100%
  - Skeleton: bg var(--color-bg-muted), animation shimmer (linear-gradient que
    desplaza de izquierda a derecha)

──────────────────────────────────────────
### OR-09 · Drawer
Átomos: Button, Icon, Typography
──────────────────────────────────────────
Propósito:
  Panel lateral deslizante que emerge desde uno de los bordes de la pantalla.
  Alternativa al Modal para flujos con mucho contenido o formularios largos.

Props:
  isOpen        : boolean
  onClose       : () => void
  title         : string (opcional)
  placement     : 'left' | 'right' | 'top' | 'bottom' → default: 'right'
  size          : 'sm' | 'md' | 'lg' | 'full' → default: 'md'
  children      : ReactNode
  footer        : ReactNode (opcional)
  closeOnOverlay: boolean → default: true
  closeOnEsc    : boolean → default: true

Tamaños según placement:
  left/right: sm=320px · md=480px · lg=640px · full=100vw
  top/bottom: sm=240px · md=360px · lg=480px · full=100vh

Comportamiento:
  ✓ createPortal hacia document.body (igual que Modal)
  ✓ Focus trap, scroll lock, Escape, mismas reglas que Modal
  ✓ Animación slide desde el placement:
      right → translateX(100%) → translateX(0)
      left  → translateX(-100%) → translateX(0)
      top   → translateY(-100%) → translateY(0)
      bottom→ translateY(100%) → translateY(0)
  ✓ Overlay semitransparente en todos los placements

CSS notas:
  - Panel: position fixed, bg var(--color-bg), z-index var(--z-modal)
  - right/left: top 0, bottom 0, width según size
  - top/bottom: left 0, right 0, height según size
  - Header: padding var(--space-4) var(--space-5), border-bottom
  - Body: overflow-y auto, flex 1, padding var(--space-5)
  - Footer: padding var(--space-4) var(--space-5), border-top

Accesibilidad:
  role="dialog", aria-modal="true", aria-labelledby (título)

──────────────────────────────────────────
### OR-10 · Navbar
Moléculas: Breadcrumb, Tooltip
Átomos: Button, Icon, Typography, Avatar, Badge
──────────────────────────────────────────
Propósito:
  Barra de navegación secundaria o de sección. Más ligera que Header:
  sin búsqueda global, enfocada en navegación de área.

Props:
  items         : Array<{ id: string; label: string; href?: string; onClick?: () => void; active?: boolean }>
  variant       : 'default' | 'pills' | 'underline' → default: 'underline'
  actions       : ReactNode (opcional) — slot derecho libre
  breadcrumb    : BreadcrumbProps (opcional) — reemplaza items con breadcrumb
  bordered      : boolean → default: false

Comportamiento:
  ✓ variant='underline': indicador bajo el ítem activo con transición
  ✓ variant='pills': ítem activo con bg primary-100, border-radius full
  ✓ variant='default': ítem activo solo con color primary
  ✓ Con breadcrumb: renderiza Breadcrumb en lugar de la lista de ítems
  ✓ Scroll horizontal en mobile si hay más ítems que el ancho disponible

Accesibilidad:
  <nav aria-label="Navegación de sección">
    <ul role="list"> con <li> por ítem

──────────────────────────────────────────
### OR-11 · FilterBar
Moléculas: SearchBar, TagInput, RadioGroup
Átomos: Button, Select, Checkbox, Icon, Typography, Tag, Badge, Divider
──────────────────────────────────────────
Propósito:
  Barra de filtros completa para listados y tablas. Agrupa búsqueda,
  filtros por categoría y chips de filtros activos.

Props:
  filters       : FilterConfig[]
  values        : Record<string, unknown>
  onChange      : (values: Record<string, unknown>) => void
  onReset       : () => void
  onSearch      : (query: string) => void
  searchQuery   : string
  loading       : boolean → default: false
  resultCount   : number (opcional) — muestra "N resultados"
  collapsible   : boolean → default: false

Tipo FilterConfig:
  {
    id       : string
    label    : string
    type     : 'select' | 'checkbox' | 'radio' | 'daterange'
    options  ?: Array<{ value: string; label: string }>
    multiple ?: boolean  ← para select/checkbox multi
  }

Comportamiento:
  ✓ Sección superior: SearchBar a la izquierda, botón "Filtros" a la derecha
  ✓ Sección inferior (siempre visible): chips de filtros activos como Tag removibles
  ✓ Al eliminar un Tag: llama onChange con ese filtro eliminado
  ✓ Botón "Limpiar todo": visible solo si hay filtros activos, llama onReset
  ✓ collapsible=true: la sección de filtros individuales se muestra/oculta con
    el botón "Filtros" + Badge con el número de filtros activos

CSS notas:
  - Wrapper: display flex, flex-direction column, gap var(--space-3)
  - Fila de controles: display flex, flex-wrap wrap, gap var(--space-2)
  - Chips activos: display flex, flex-wrap wrap, gap var(--space-1)
  - Botón "Filtros": variant secondary con Badge en número si collapsible


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## MAPA DE DEPENDENCIAS — resumen rápido
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  OR-01 Header     → ML: SearchBar, Breadcrumb, UserCard
                     AT: Button, Icon, Avatar, Typography, Badge

  OR-02 Sidebar    → ML: Tooltip, UserCard
                     AT: Button, Icon, Typography, Avatar, Badge, Divider

  OR-03 DataTable  → ML: SearchBar, Notification, ProgressBar
                     AT: Button, Icon, Checkbox, Badge, Spinner, Typography

  OR-04 LoginForm  → ML: FormField, Notification
                     AT: Button, Input, Checkbox, Typography, Divider, Icon

  OR-05 UserMenu   → ML: UserCard, Tooltip
                     AT: Avatar, Button, Icon, Typography, Divider, Badge

  OR-06 Modal      → ML: Notification (opcional)
                     AT: Button, Icon, Typography, Divider

  OR-07 Tabs       → AT: Button, Icon, Badge, Typography

  OR-08 Card       → AT: Button, Icon, Badge, Typography, Avatar, Divider

  OR-09 Drawer     → AT: Button, Icon, Typography

  OR-10 Navbar     → ML: Breadcrumb, Tooltip
                     AT: Button, Icon, Typography, Avatar, Badge

  OR-11 FilterBar  → ML: SearchBar, TagInput, RadioGroup
                     AT: Button, Select, Checkbox, Icon, Typography, Tag, Badge, Divider


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PASO FINAL — Actualizar barrel y verificar
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Después de generar los 11 organismos, actualizar @src/index.ts añadiendo:

  // ─── Organisms ────────────────────────────────
  export * from './organisms/Card'
  export * from './organisms/DataTable'
  export * from './organisms/Drawer'
  export * from './organisms/FilterBar'
  export * from './organisms/Header'
  export * from './organisms/LoginForm'
  export * from './organisms/Modal'
  export * from './organisms/Navbar'
  export * from './organisms/Sidebar'
  export * from './organisms/Tabs'
  export * from './organisms/UserMenu'

Luego ejecutar:
  npx tsc --noEmit

Reportar en formato:
  ✓ OR-01 Header      — 4 archivos · sin errores TS
  ✓ OR-02 Sidebar     — 4 archivos · sin errores TS
  ... (uno por línea)
  ─────────────────────────────────────────────────
  Total: 44 archivos | Errores TypeScript: 0


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ANTI-PATRONES — Detectar y corregir antes de guardar
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ✗ fetch('/api/data')  o  useContext(GlobalStore)
    → sin datos externos; recibirlos por props

  ✗ import { Header } from '../organisms/Header'
    → organismos NO importan otros organismos

  ✗ import { SearchBar } from '../molecules/SearchBar/SearchBar'
    → siempre desde el barrel: '../molecules/SearchBar'

  ✗ style={{ marginBottom: '32px' }}
    → sin margin externo; el template controla el layout

  ✗ <div onClick={...}> sin role="button" + keyboard handler
    → añadir role, tabIndex=0, onKeyDown Enter/Space

  ✗ Modal o Drawer sin focus trap
    → implementar focus trap con useEffect + querySelectorAll(focusable)

  ✗ <table> sin <thead>, <th scope="col">, caption o aria-label
    → tablas semánticas y accesibles siempre

  ✗ any
    → tipado estricto; usar generics <T> donde aplique

  ✗ Storybook sin datos mock realistas
    → usar nombres, emails, roles ficticios pero plausibles en los stories

  ✗ Animaciones sin respetar prefers-reduced-motion
    → @media (prefers-reduced-motion: reduce) { transition: none }
