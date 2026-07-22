# Especificación de Diseño: Capa de Templates y Pages
**Proyecto:** UIComponentLibrary  
**Fecha:** 2026-07-21  
**Estado:** Aprobado  

---

## 1. Visión General
Implementar las capas de **Templates** y **Pages** (demos de demostración) de `UIComponentLibrary`.
- **Templates (`src/templates/`):** Estructuras estructurales puras (sin estado) que definen el diseño físico y de rejilla de la aplicación mediante CSS Modules y slots.
- **Pages (`src/pages/`):** Instancias reales de los templates cargadas con organismos interactivos y datos ficticios (mock) que demuestran el funcionamiento integral del sistema.

---

## 2. Reglas Arquitectónicas Globales
### Templates:
1. **Sin Estado Interno:** Prohibido el uso de `useState`, `useEffect` o `useRef`. Son componentes puros de diseño estructural.
2. **Propiedades Personalizadas CSS:** Utilizar variables CSS inline para anchos calculados y configuraciones dinámicas (ej: `--sidebar-width`).
3. **Márgenes:** Mantener `margin: 0` en el elemento contenedor raíz de cada template.
4. **Independencia de Negocio:** No reciben datos de dominio directos (como listas de modelos); solo slots de tipo `ReactNode` y props básicas de control de layout.

### Pages:
1. **Datos Ficticios Realistas:** Usar nombres, correos y fechas verosímiles.
2. **Simulación de Interacción:** Usar estado local React para abrir modales, drawers, simular submits de login con retraso (`loading`), filtrar datos en memoria, y cambiar pestañas de contenido.
3. **Barrel Export:** No deben exportarse en el barrel principal de distribución (`src/index.ts`). Irán comentados en el archivo barrel, ya que son demostraciones de Storybook.

---

## 3. Especificación de los 5 Templates

### TM-01 · DashboardLayout
- **Props:** `header`, `sidebar`, `children`, `footer?`, `sidebarWidth?` (240), `collapsedWidth?` (64), `sidebarCollapsed?` (false), `showSidebar?` (true), `headerHeight?` (64), `maxContentWidth?`.
- **Comportamiento:** Estructura con barra de navegación lateral colapsable, cabecera fija y contenedor de contenido principal. En mobile (`<768px`), el sidebar pasa a `display: none` y la grilla se simplifica.

### TM-02 · AuthLayout
- **Props:** `children`, `brandPanel?`, `logo?`, `footer?`, `variant?` ('centered'|'split'), `bgPattern?` (false).
- **Comportamiento:**
  - `centered`: Centrado absoluto con ancho máximo de 400px y patrón opcional de rejilla SVG.
  - `split`: Grilla de 2 columnas `1fr 1fr` que colapsa verticalmente en mobile.

### TM-03 · ListingLayout
- **Props:** `header`, `sidebar?`, `filterBar?`, `children`, `breadcrumb?`, `title?`, `actions?`, `loading?`, `contentLayout?` ('table'|'grid'|'list'), `gridColumns?` (3).
- **Comportamiento:** Estructura de visualización de datos con área superior para títulos y filtros colapsables, y grilla responsive configurable para tarjetas u hojas de datos.

### TM-04 · DetailLayout
- **Props:** `header`, `breadcrumb?`, `title?`, `actions?`, `children`, `metaPanel?`, `metaPanelWidth?` (320), `metaPanelPosition?` ('right'|'left'), `maxWidth?` (960).
- **Comportamiento:** Diseño centrado con panel lateral de metadatos configurable e intercambiable a izquierda/derecha.

### TM-05 · BlankLayout
- **Props:** `children`, `centered?` (true), `maxWidth?` (full), `bgColor?`, `padding?`.
- **Comportamiento:** Layout minimalista y limpio para páginas estáticas o de error del sistema.

---

## 4. Especificación de las 6 Pages (Demos)

### PG-01 · DashboardPage
- **Lógica:** Dashboard completo con `Header` (búsqueda funcional y UserMenu flotante), `Sidebar` colapsable, fila superior de 4 tarjetas de métricas, y una interfaz de `Tabs` alternando una tabla `DataTable` de actividad y tarjetas informativas mensuales.
- **Interacción Mobile:** En mobile, al pulsar el menú de hamburguesa en el Header, el `Sidebar` se desliza e inyecta dentro de un componente `Drawer` lateral.

### PG-02 · LoginPage
- **Lógica:** LoginPage split. El formulario simula un retardo de carga de 1.5 segundos en submit. Muestra una alerta `Notification` si el email contiene `"error"`.

### PG-03 · UsersPage
- **Lógica:** Directorio interactivo de 20 usuarios. Permite buscar por texto libre y filtrar por rol/estado. Muestra botones de acción por fila para abrir un modal de borrado o un drawer con la ficha completa del usuario.

### PG-04 · ProfilePage
- **Lógica:** Ficha personal del usuario con metadatos laterales, barra de progreso y pestañas interactivos de proyectos. Al presionar "Editar perfil", abre un modal con campos precargados.

### PG-05 · SettingsPage
- **Lógica:** Panel de configuración agrupando pestañas de Perfil (con subida de avatar), Seguridad (con toggle 2FA) y Apariencia (RadioGroup para cambiar el tema de la aplicación). Simula el proceso de guardado y despliega un toast de éxito temporal.

### PG-06 · NotFoundPage
- **Lógica:** Página estática de error 404 con tipografía sobredimensionada, mensaje descriptivo, botones interactivos de redirección y enlace de ayuda.
