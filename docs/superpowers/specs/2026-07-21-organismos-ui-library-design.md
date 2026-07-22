# Especificación de Diseño: Capa de Organismos
**Proyecto:** UIComponentLibrary  
**Fecha:** 2026-07-21  
**Estado:** Aprobado  

---

## 1. Visión General
Implementar la capa de **Organismos** para `UIComponentLibrary`. Los organismos son secciones de UI complejas y autónomas con identidad propia que combinan átomos y moléculas para formar bloques de UI de alto nivel.

- **Stack:** React 18, TypeScript 5, Vite 5, CSS Modules, `clsx`, Storybook 8.
- **Ruta base de organismos:** `src/organisms/<NombreOrganismo>/`.
- **Accesibilidad:** Uso estricto de landmarks semánticos, focus trap completo en diálogos, roving tabindex en navegación y cumplimiento de accesibilidad en tablas de datos.

---

## 2. Reglas Arquitectónicas Globales
1. **Consumo de Niveles Inferiores:** Importación de átomos y moléculas exclusivamente a través de sus carpetas barrel correspondientes (ej. `import { Button } from '../atoms/Button'`).
2. **Sin Imports Cruzados:** Los organismos **NO** pueden importarse entre sí.
3. **Márgenes Externos:** Todos los organismos tienen `margin: 0` en su wrapper raíz. El espaciado de layout se gestiona en las páginas o templates superiores.
4. **Independencia de Datos Externa:** Sin llamadas directas a APIs, fetchings o dependencias de estados globales. La entrada y salida de datos se comunica estrictamente mediante props y callbacks.

---

## 3. Especificación de los 11 Organismos

### OR-01 · Header
- **Props:** `logo?`, `onLogoClick?`, `searchProps?`, `showSearch?` (default `true`), `actions?` (Array<{icon, label, onClick, badge?}>), `user?` ({name, role?, avatarSrc?}), `onUserClick?`, `onMenuClick?`, `variant?` ('default'|'transparent'|'dark'), `sticky?` (default `true`).
- **Comportamiento:** Barra de navegación superior. Si `sticky=true`, se fija arriba (`position: sticky`, `z-index: var(--z-dropdown)`). En mobile (`<768px`), oculta `SearchBar` y textos de acciones, mostrando el icono de menú hamburguesa.

### OR-02 · Sidebar
- **Props:** `items` (NavItem[]), `activeId`, `onItemClick`, `collapsed?` (default `false`), `onToggle?`, `user?` ({name, role?, avatarSrc?}), `onUserClick?`, `width?` (default `240`), `collapsedWidth?` (default `64`).
- **Comportamiento:** Panel de navegación lateral.
  - Active ID: añade barra de borde izquierdo primary-600 (4px) y fondo primary-50.
  - Submenú: desplegable mediante animación CSS de `max-height`.
  - Collapsed: muestra solo iconos con tooltip en hover.

### OR-03 · DataTable
- **Props:** `data` (T[]), `columns` (Column<T>[]), `loading?` (default `false`), `error?`, `emptyMessage?` (default `'No hay datos que mostrar'`), `selectable?` (default `false`), `selectedIds?`, `onSelectionChange?`, `sortable?` (default `true`), `defaultSort?`, `pagination?` ({page, pageSize, total}), `onPageChange?`, `onSort?`, `caption?`.
- **Comportamiento:** Tabla de datos genérica.
  - `loading`: superpone un overlay de `Spinner`.
  - `error`: muestra `Notification` con la variante `error`.
  - `selectable`: incluye checkboxes en filas y checkbox maestro en el header (con soporte para `indeterminate`).
  - Columnas sortables muestran iconos chevron arriba/abajo interactivos.

### OR-04 · LoginForm
- **Props:** `onSubmit`, `onForgotPassword`, `onForgotPassword?`, `onRegister?`, `loading?` (default `false`), `error?`, `socialProviders?` (Array<'google'|'github'|'microsoft'>), `title?` (default `'Iniciar sesión'`), `subtitle?`.
- **Comportamiento:** Formulario de autenticación con validación local (email formato válido, contraseña >= 8 chars). Permite alternar la visibilidad de la contraseña en el input. Muestra errores generales en una `Notification`.

### OR-05 · UserMenu
- **Props:** `user` ({name, email, role?, avatarSrc?}), `items` (MenuSection[]), `onClose`, `isOpen`, `anchorRef?`.
- **Comportamiento:** Menú desplegable posicionado bajo el avatar. Escucha clics fuera y la tecla `Escape` para cerrarse. Gestiona foco inicial al abrirse y navegación mediante flechas arriba/abajo.

### OR-06 · Modal
- **Props:** `isOpen`, `onClose`, `title?`, `description?`, `size?` (default `'md'`), `children`, `footer?`, `closeOnOverlay?` (default `true`), `closeOnEsc?` (default `true`), `loading?` (default `false`).
- **Comportamiento:** Diálogo de Portal (`createPortal` en `document.body`).
  - Bloqueo de scroll en `<body>` al abrirse.
  - Focus trap interactivo (ciclado de Tab / Shift+Tab).
  - Devuelve el foco al elemento disparador al cerrarse.

### OR-07 · Tabs
- **Props:** `tabs` (TabItem[]), `activeId`, `onChange`, `variant?` ('line'|'pill'|'card'), `orientation?` ('horizontal'|'vertical'), `fullWidth?` (default `false`).
- **Comportamiento:** Pestañas accesibles con `role="tablist"` y `role="tabpanel"`. Permite navegación por teclado mediante flechas direccionales e instrucciones `Home`/`End`.

### OR-08 · Card
- **Props:** `title?`, `subtitle?`, `headerAction?`, `footer?`, `media?` ({src, alt, aspect?}), `variant?` ('default'|'outlined'|'elevated'|'ghost'), `padding?` ('none'|'sm'|'md'|'lg'), `hoverable?` (default `false`), `selected?` (default `false`), `loading?` (default `false`), `onClick?`, `children`.
- **Comportamiento:** Caja polimórfica. Si `loading=true`, despliega esqueleto animado (shimmer) en lugar del contenido. Si tiene `onClick`, se vuelve interactivo y accesible por teclado.

### OR-09 · Drawer
- **Props:** `isOpen`, `onClose`, `title?`, `placement?` ('left'|'right'|'top'|'bottom'), `size?` (default `'md'`), `children`, `footer?`, `closeOnOverlay?` (default `true`), `closeOnEsc?` (default `true`).
- **Comportamiento:** Panel deslizante desde el borde. Mismo comportamiento y accesibilidad que Modal (Scroll lock, focus trap, escape key, overlay de fondo).

### OR-10 · Navbar
- **Props:** `items` (Array<{id, label, href?, onClick?, active?}>), `variant?` ('default'|'pills'|'underline'), `actions?` (ReactNode), `breadcrumb?` (BreadcrumbProps), `bordered?` (default `false`).
- **Comportamiento:** Barra ligera de sección. Permite renderizar opcionalmente el átomo `Breadcrumb` en su lugar.

### OR-11 · FilterBar
- **Props:** `filters` (FilterConfig[]), `values` (Record<string, unknown>), `onChange`, `onReset`, `onSearch`, `searchQuery`, `loading?` (default `false`), `resultCount?`, `collapsible?` (default `false`).
- **Comportamiento:** Barra de búsqueda y categorías. Renders los filtros activos como fichas `Tag` removibles en la parte inferior. Permite colapsar/expandir el área de selección detallada mediante el botón "Filtros".

---

## 4. Barrel y Migración
- Los componentes se exportarán en `src/index.ts`.
- Verificación completa de compilación mediante `npx tsc --noEmit`.
