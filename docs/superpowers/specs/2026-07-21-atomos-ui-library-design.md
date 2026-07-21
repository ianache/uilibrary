# Especificación de Diseño: Capa de Átomos y Sistema de Tokens
**Proyecto:** UIComponentLibrary  
**Fecha:** 2026-07-21  
**Estado:** Aprobado  

---

## 1. Visión General y Objetivos
Construir e implementar la capa completa de **Átomos** ( Atomic Design ) y el sistema de **Design Tokens** para `UIComponentLibrary`.

- **Stack:** React 18, TypeScript 5, Vite 5, CSS Modules (`.module.css`), `clsx`, Storybook 8.
- **Ruta de Tokens:** `src/tokens/tokens.css` y `src/tokens/index.ts`.
- **Ruta de Átomos:** `src/atoms/<NombreAtomo>/`.
- **Accesibilidad:** Cumplimiento con WCAG 2.1 AA en todos los componentes.

---

## 2. Arquitectura de Tokens (`src/tokens/`)

### `src/tokens/tokens.css`
Define las variables CSS custom properties globales:
- **Colores:**
  - Neutrales: `--color-bg`, `--color-bg-muted`, `--color-border`, `--color-border-strong`, `--color-text-primary`, `--color-text-secondary`, `--color-text-muted`, `--color-text-disabled`.
  - Primarios: `--color-primary-100` a `--color-primary-700`.
  - Estados: `--color-success-100/600`, `--color-warning-100/600`, `--color-danger-100/600`.
- **Espaciados (`--space-*`):** 1 (4px), 2 (8px), 3 (12px), 4 (16px), 6 (24px), 8 (32px).
- **Border Radius (`--radius-*`):** `sm` (4px), `md` (8px), `lg` (12px), `full` (9999px).
- **Tipografía (`--font-*`):** `--font-sans` y `--font-mono`.
- **Transiciones (`--transition-*`):** `--transition-fast` (150ms) y `--transition-base` (200ms).

### `src/tokens/index.ts`
Exporta las constantes de TypeScript de tokens congeladas (`as const`).

---

## 3. Reglas Globales de los Átomos

1. **Estructura Estándar de 4 Archivos por Átomo:**
   ```
   src/atoms/NombreAtomo/
   ├── NombreAtomo.tsx          ← Lógica, JSX, forwardRef y export de tipos
   ├── NombreAtomo.module.css   ← Estilos aislados consumiendo tokens.css
   ├── NombreAtomo.stories.tsx  ← Stories (Meta + Default + Scale/Variants + States)
   └── index.ts                 ← Barrel re-exportando el componente y sus tipos
   ```
2. **Indivisibilidad de Átomos:** Ningún átomo puede importar otro átomo.
3. **Márgenes Exteriores Prohibidos:** Los átomos no definen `margin` externo (`margin: 0`).
4. **Formularios con `forwardRef`:** `Button`, `Input`, `Textarea`, `Select`, `Checkbox`, `Avatar` expone sus refs nativas.
5. **Estilos:** Uso exclusivo de CSS Modules y `clsx`. Prohibidos estilos inline y clases globales no declaradas en tokens.

---

## 4. Especificación Detallada de los 12 Átomos

### AT-01 · Button
- **Props:** `variant` ('primary'|'secondary'|'ghost'|'danger'), `size` ('sm'|'md'|'lg'), `loading` (boolean), `fullWidth` (boolean), `disabled` (boolean), `children` (ReactNode).
- **Criterios:**
  - `sm` = 32px, `md` = 40px, `lg` = 48px.
  - `loading=true` activa spinner en CSS puro + `aria-busy="true"` + `disabled` automático.
  - `forwardRef` a `<button>`.

### AT-02 · Input
- **Props:** `label?`, `error?`, `hint?`, `prefix?`, `suffix?`, extendiendo `InputHTMLAttributes<HTMLInputElement>`.
- **Criterios:**
  - `label` e `input` vinculados automáticamente con `useId()`.
  - Contenedor con borde interactivo (`focus-within`).
  - Estado de error activa borde rojo, `aria-invalid` y `aria-describedby`.
  - `forwardRef` a `<input>`.

### AT-03 · Textarea
- **Props:** `label?`, `error?`, `hint?`, `rows` (default 4), `resize` ('none'|'vertical'|'horizontal'|'both'), `maxLength?`, `showCount?` (boolean).
- **Criterios:**
  - Muestra "N/MAX" cuando `showCount` y `maxLength` están presentes.
  - Contador en rojo si `value.length >= maxLength`.
  - `forwardRef` a `<textarea>`.

### AT-04 · Select
- **Props:** `options` (Array<{value, label, disabled?}>), `label?`, `placeholder?`, `error?`, `hint?`.
- **Criterios:**
  - Chevron SVG inline sin dependencias.
  - `appearance: none`.
  - `forwardRef` a `<select>`.

### AT-05 · Checkbox
- **Props:** `label?`, `description?`, `error?`, `indeterminate` (default false), `disabled` (boolean).
- **Criterios:**
  - Input nativo `opacity: 0` sobre caja de 18x18px.
  - Soporta `indeterminate` vía callback ref (`node.indeterminate = true`).
  - `forwardRef` hacia `<input>`.

### AT-06 · Icon
- **Props:** `name` (`IconName`), `size` ('xs'|'sm'|'md'|'lg'|'xl'), `label?`.
- **Criterios:**
  - Catálogo SVG de más de 30 íconos (navegación, acciones, estado, UI).
  - `stroke="currentColor"`, `fill="none"`.
  - `aria-hidden="true"` si no se pasa `label`. `aria-label` + `role="img"` si se pasa `label`.

### AT-07 · Typography
- **Props:** `variant` ('h1'..'h6', 'body-lg'|'body'|'body-sm', 'caption'|'overline'|'code'), `color`, `as?` (ElementType), `truncate?` (boolean).
- **Criterios:**
  - `margin: 0` en todos los variantes.
  - Tag HTML según variante por defecto.
  - `code` usa `--font-mono`.

### AT-08 · Badge
- **Props:** `variant` ('default'|'primary'|'success'|'warning'|'danger'), `size` ('sm'|'md').
- **Criterios:**
  - `border-radius: var(--radius-full)`.
  - Indicador no interactivo.

### AT-09 · Tag
- **Props:** `variant`, `removable?` (boolean), `onRemove?` (() => void), `disabled?` (boolean).
- **Criterios:**
  - Botón `×` con `aria-label="Eliminar etiqueta"`.
  - `e.stopPropagation()` en el botón de eliminar.

### AT-10 · Avatar
- **Props:** `src?`, `initials?`, `size` ('xs'|'sm'|'md'|'lg'|'xl'), `alt`.
- **Criterios:**
  - Con `src`: `<img>` circular (`object-fit: cover`).
  - Sin `src`: iniciales (máximo 2 caracteres) sobre fondo primario claro.

### AT-11 · Spinner
- **Props:** `size` ('xs'|'sm'|'md'|'lg'|'xl'), `variant` ('primary'|'secondary'|'white'), `label` (default 'Cargando...').
- **Criterios:**
  - `role="status"` + `aria-label={label}` + texto `.sr-only`.
  - Animación spin en CSS.

### AT-12 · Divider
- **Props:** `orientation` ('horizontal'|'vertical'), `variant` ('solid'|'dashed'|'dotted'), `label?`, `labelAlign` ('start'|'center'|'end').
- **Criterios:**
  - Horizontal sin label `<hr role="separator">`.
  - Con label: contenedor flex flanqueado por líneas.

---

## 5. Migración y Limpieza
- Eliminación completa de `src/components/`.
- Instalación de la dependencia `clsx`.
- Exportación total centralizada en `src/index.ts`.
- Verificación final de tipos con `npx tsc --noEmit`.
