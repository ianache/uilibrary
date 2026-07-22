# Especificación de Diseño: Capa de Moléculas
**Proyecto:** UIComponentLibrary  
**Fecha:** 2026-07-21  
**Estado:** Aprobado  

---

## 1. Visión General
Implementar la capa de **Moléculas** para `UIComponentLibrary`. Las moléculas combinan dos o más átomos en componentes funcionales autocontenidos y con propósito único.

- **Stack:** React 18, TypeScript 5, Vite 5, CSS Modules, `clsx`, Storybook 8.
- **Ruta base de moléculas:** `src/molecules/<NombreMolecula>/`.
- **Accesibilidad:** Vinculación estricta de labels, estados `aria-*`, roles semánticos correctos y navegación completa por teclado (WCAG 2.1 AA).

---

## 2. Reglas Arquitectónicas Globales
1. **Importación de Átomos:** Únicamente desde su barrel superior (ej. `import { Button } from '../atoms/Button'`), nunca desde la ruta interna de implementación.
2. **Aislamiento Horizontal:** Las moléculas **NO** pueden importarse entre sí.
3. **Márgenes Externos:** Todos los componentes se renderizan con `margin: 0`. El espaciado de layout es manejado por el padre.
4. **CSS Modules:** Todo estilo o layout interno (flexbox, CSS grid, gaps) se gestiona exclusivamente a través de clases `.module.css`.
5. **Estricta Apatía al Negocio:** Sin llamadas a APIs, fetchings o dependencias de estados globales. Las propiedades y funciones de interacción se comunican vía props.

---

## 3. Especificación de las 12 Moléculas

### ML-01 · SearchBar
- **Props:** `placeholder?`, `value?`, `defaultValue?`, `onSearch?`, `onChange?`, `loading?`, `disabled?`, `showButton?` (default `true`), `buttonLabel?`, `size?` ('sm'|'md'|'lg').
- **Comportamiento:** Campo de búsqueda interactivo. Soporta tecla `Escape` para limpiar e `Enter`/clic para disparar `onSearch(value)`.
- **Estructura:** Envoltorio `role="search"` que alinea el `Input` (con `Icon` de búsqueda como `prefix`) y el `Button` de acción de forma horizontal.

### ML-02 · FormField
- **Props:** `label` (requerido), `htmlFor?`, `required?`, `error?`, `hint?`, `children` (ReactNode único requerido).
- **Comportamiento:** Utiliza `React.Children.only` y `React.cloneElement` para inyectar automáticamente al control hijo:
  - `id` (autogenerado con `useId()` si no se provee).
  - `aria-describedby` apuntando a los textos de ayuda/error.
  - Propiedad de error/invalidez.

### ML-03 · UserCard
- **Props:** `name` (requerido), `role?`, `email?`, `avatarSrc?`, `status?` ('online'|'offline'|'away'|'busy'), `size?` ('sm'|'md'|'lg'), `onClick?`, `selected?` (boolean).
- **Comportamiento:** Tarjeta que se comporta como botón interactivo si `onClick` existe (`role="button"`, `tabIndex={0}`, activa en Space/Enter). Si está seleccionado, activa fondo y borde primarios con variables semánticas.

### ML-04 · Notification
- **Props:** `variant?` ('info'|'success'|'warning'|'error'), `title?`, `message` (requerido), `dismissible?`, `onDismiss?`, `action?` ({label, onClick}), `icon?` (boolean).
- **Comportamiento:** Caja de feedback inline. Usa `role="alert"` para `error` y `warning`, y `role="status"` para `info` y `success`. El botón de cierre `×` se alinea arriba a la derecha.

### ML-05 · Breadcrumb
- **Props:** `items` (Array<{label, href?, onClick?}>), `separator?` ('chevron'|'slash'), `maxItems?` (number).
- **Comportamiento:** Lista jerárquica `<nav aria-label="Migas de pan"><ol>`. Si se excede `maxItems`, colapsa los ítems del medio mostrando `...`. El último ítem tiene `aria-current="page"`.

### ML-06 · InputGroup
- **Props:** `inputProps` (`InputProps` sin prefix/suffix), `addonLeft?`, `addonRight?`, `buttonLeft?` ({label, onClick, icon?}), `buttonRight?`.
- **Comportamiento:** Grupo visual unificado donde el contenedor lleva el borde y la sombra de foco (`focus-within`). El input y botones internos pierden sus bordes propios en los lados adyacentes.

### ML-07 · TagInput
- **Props:** `value` (string[]), `onChange`, `placeholder?`, `maxTags?`, `disabled?`, `error?`, `label?`, `tagVariant?`, `allowDuplicates?`.
- **Comportamiento:** Campo de etiquetas dinámico. Añade un tag al pulsar `Enter` o `,`. Remueve el último al presionar `Backspace` con el input vacío. El contenedor completo captura el foco para el input interno.

### ML-08 · AvatarGroup
- **Props:** `users` (Array<{name, avatarSrc?, id}>), `max?` (default 4), `size?` ('xs'|'sm'|'md'|'lg'), `onClick?`.
- **Comportamiento:** Fila con avatares solapados (margen negativo dinámico según tamaño). El último slot muestra `+N` si el número de usuarios excede `max`.

### ML-09 · ProgressBar
- **Props:** `value`, `max?` (default 100), `variant?` ('default'|'primary'|'success'|'warning'|'danger'), `size?` ('sm'|'md'|'lg'), `label?`, `showValue?`, `animated?`, `striped?`.
- **Comportamiento:** Barra de progreso semántica con `role="progressbar"`, `aria-valuenow`, etc. Si `animated` y `striped` son verdaderos, aplica una animación de desplazamiento mediante keyframes de CSS.

### ML-10 · Tooltip
- **Props:** `content` (requerido), `placement?` ('top'|'bottom'|'left'|'right'), `children` (trigger), `delay?` (default 200).
- **Comportamiento:** Tooltip 100% CSS. Trigger usa `position: relative` y el globo usa `position: absolute`. Se torna visible en `:hover` y `:focus-within`.

### ML-11 · RadioGroup
- **Props:** `options` (Array<{value, label, description?, disabled?}>), `value`, `onChange`, `name`, `label?`, `direction?` ('vertical'|'horizontal'), `variant?` ('default'|'card'), `disabled?`, `error?`.
- **Comportamiento:** Contenedor `role="radiogroup"`. Utiliza *roving tabindex* para navegación por teclado (flechas direccionales). El elemento seleccionado o el primero activo tiene `tabIndex={0}`, los demás `tabIndex={-1}`.

### ML-12 · FileUpload
- **Props:** `accept?`, `multiple?`, `maxSize?`, `maxFiles?`, `disabled?`, `loading?`, `error?`, `onFilesChange`, `label?`, `sublabel?`.
- **Comportamiento:** Área de arrastre interactiva. Gestiona eventos drag/drop activando `isDragging`. Realiza validación de peso, tipo y cantidad. Renders lista de archivos con botón de remoción y tamaño formateado (KB/MB).

---

## 4. Barrel y Migración
- Los componentes se exportarán en `src/index.ts`.
- Verificación completa de compilación mediante `npx tsc --noEmit`.
