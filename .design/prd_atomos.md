# PROMPT MAESTRO — Generación de Átomos
# UIComponentLibrary · Claude Code
# Usar con: claude (en la raíz del proyecto)
# ══════════════════════════════════════════════════════════════

Eres un experto en diseño de sistemas de componentes React con TypeScript,
CSS Modules y Atomic Design. Tu tarea es construir la capa de ÁTOMOS completa
de la biblioteca UIComponentLibrary siguiendo la especificación incluida aquí.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## CONTEXTO DEL PROYECTO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Proyecto   : UIComponentLibrary
- Metodología: Atomic Design (Brad Frost)
- Stack      : React 18 · TypeScript 5 · Vite 5 · CSS Modules · clsx
- Catálogo   : Storybook 8
- Ruta base  : src/atoms/

Lee primero los siguientes archivos de contexto antes de escribir código:
- @src/tokens/tokens.css       ← design tokens (CSS custom properties)
- @src/tokens/index.ts         ← tokens como constantes TypeScript
- @src/index.ts                ← barrel principal de la librería
- @package.json                ← dependencias instaladas
- @tsconfig.json               ← configuración TypeScript


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## REGLAS GLOBALES — NUNCA ROMPER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ARQUITECTURA
  ✗ Los átomos NO tienen margin externo (el espaciado lo pone el padre)
  ✗ Los átomos NO importan otros átomos (son indivisibles)
  ✗ Los átomos NO conectan con estado global ni APIs
  ✓ Los átomos consumen SOLO variables CSS de tokens.css
  ✓ Cada átomo exporta sus tipos TypeScript (export type)
  ✓ Todos los componentes de formulario usan forwardRef

ESTILOS
  ✓ Solo CSS Modules (.module.css), nunca estilos inline ni className strings
  ✓ Usar var(--nombre-token) de tokens.css, nunca valores en duro (#fff, 16px)
  ✓ Todas las transiciones via var(--transition-base) o var(--transition-fast)
  ✓ Focus visible: box-shadow 0 0 0 3px var(--color-primary-100)

ACCESIBILIDAD (WCAG 2.1 AA obligatorio)
  ✓ Labels asociados con htmlFor/id en todos los campos de formulario
  ✓ aria-invalid en campos con error activo
  ✓ aria-busy en Button con loading=true
  ✓ role="status" + texto sr-only en Spinner
  ✓ Íconos decorativos: aria-hidden="true"; íconos funcionales: aria-label

TYPESCRIPT
  ✓ Props extender el tipo HTML nativo correspondiente (InputHTMLAttributes, etc.)
  ✓ Variantes modeladas como union types, nunca string genérico
  ✓ Exportar todos los tipos: Props, Variant, Size
  ✗ Prohibido usar `any`

STORYBOOK
  ✓ Cada átomo tiene su archivo .stories.tsx con:
      - Meta con title "Atoms/NombreAtomo" y tags: ['autodocs']
      - Story "Default" con args representativos
      - Story "AllVariants" o "Scale" que muestra todas las variantes juntas
      - Stories adicionales para estados clave (error, disabled, loading)

ESTRUCTURA DE ARCHIVOS por átomo:
  src/atoms/NombreAtomo/
  ├── NombreAtomo.tsx          ← componente + tipos
  ├── NombreAtomo.module.css   ← estilos (solo tokens CSS)
  ├── NombreAtomo.stories.tsx  ← Storybook stories
  └── index.ts                 ← re-exporta todo


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ÁTOMOS A GENERAR (en este orden)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Genera los 12 átomos siguiendo exactamente la especificación de cada uno.
Trabaja átomo por átomo, completando los 4 archivos antes de pasar al siguiente.

──────────────────────────────────────────
### AT-01 · Button
──────────────────────────────────────────
Props requeridas:
  variant   : 'primary' | 'secondary' | 'ghost' | 'danger'  → default: 'secondary'
  size      : 'sm' | 'md' | 'lg'                            → default: 'md'
  loading   : boolean                                        → default: false
  fullWidth : boolean                                        → default: false
  disabled  : boolean (heredado de ButtonHTMLAttributes)
  children  : ReactNode

Criterios de aceptación:
  ✓ primary  → bg var(--color-primary-600), texto blanco
  ✓ secondary → border var(--color-border-strong), bg var(--color-bg)
  ✓ ghost    → bg transparente, sin borde, hover bg var(--color-bg-muted)
  ✓ danger   → bg var(--color-danger-600), texto blanco
  ✓ sm=32px alto, md=40px, lg=48px (altura total con padding)
  ✓ loading=true: Spinner interno + aria-busy="true" + disabled automático
  ✓ disabled: opacity 0.45, cursor not-allowed
  ✓ forwardRef hacia <button>

CSS notas:
  - Usar display:inline-flex, align-items:center, gap:var(--space-2)
  - El spinner interno es un <span> con animación CSS pura (sin import Spinner)
  - Transición en background, border-color, opacity

──────────────────────────────────────────
### AT-02 · Input
──────────────────────────────────────────
Props requeridas:
  label    : string (opcional)
  error    : string (opcional) — activa aria-invalid y estilo rojo
  hint     : string (opcional) — oculto cuando hay error
  prefix   : ReactNode (opcional) — izquierda dentro del wrapper
  suffix   : ReactNode (opcional) — derecha dentro del wrapper

Criterios de aceptación:
  ✓ Label vinculado por id autogenerado si no se pasa id
  ✓ Wrapper div con border que activa focus-within (no el input directamente)
  ✓ Error → borde rojo, aria-invalid, aria-describedby al párrafo de error
  ✓ Hint desaparece cuando hay error activo
  ✓ Prefix/suffix no tapan el texto
  ✓ forwardRef hacia <input>

──────────────────────────────────────────
### AT-03 · Textarea
──────────────────────────────────────────
Props requeridas:
  label     : string (opcional)
  error     : string (opcional)
  hint      : string (opcional)
  rows      : number → default: 4
  resize    : 'none' | 'vertical' | 'horizontal' | 'both' → default: 'vertical'
  maxLength : number (opcional)
  showCount : boolean → default: false

Criterios de aceptación:
  ✓ Con showCount+maxLength: muestra "N/MAX" alineado a la derecha del label
  ✓ Contador en rojo cuando value.length >= maxLength
  ✓ Focus, error, disabled → igual que Input
  ✓ forwardRef hacia <textarea>
  ✓ box-sizing: border-box, width: 100%

──────────────────────────────────────────
### AT-04 · Select
──────────────────────────────────────────
Props requeridas:
  options     : Array<{ value: string; label: string; disabled?: boolean }>
  label       : string (opcional)
  placeholder : string (opcional) — primera opción deshabilitada
  error       : string (opcional)
  hint        : string (opcional)

Criterios de aceptación:
  ✓ Chevron SVG inline (no usa Icon para evitar dependencia entre átomos)
  ✓ appearance: none + -webkit-appearance: none (elimina flecha nativa)
  ✓ Mismo sistema visual de border+focus-within que Input
  ✓ forwardRef hacia <select>

──────────────────────────────────────────
### AT-05 · Checkbox
──────────────────────────────────────────
Props requeridas:
  label         : string (opcional)
  description   : string (opcional) — debajo del label
  error         : string (opcional)
  indeterminate : boolean → default: false
  disabled      : boolean

Criterios de aceptación:
  ✓ Input nativo opacity:0 superpuesto sobre la caja visual (accesibilidad)
  ✓ Caja visual 18×18px con borde var(--color-border-strong)
  ✓ checked → bg+borde var(--color-primary-600) + checkmark blanco (CSS ::after)
  ✓ indeterminate → bg+borde var(--color-primary-600) + guión blanco (CSS ::after)
    Nota: node.indeterminate = true via callback ref
  ✓ focus-visible → box-shadow ring 3px primary-100
  ✓ Label clickable activando el checkbox
  ✓ forwardRef (callback para poder setear .indeterminate)

──────────────────────────────────────────
### AT-06 · Icon
──────────────────────────────────────────
Props requeridas:
  name  : IconName (union type de todas las claves del catálogo)
  size  : 'xs' | 'sm' | 'md' | 'lg' | 'xl' → default: 'md'
  label : string (opcional) — si está presente: aria-label + role="img"

Catálogo mínimo (paths SVG, viewBox 0 0 24 24):
  Navegación  : home, menu, chevron-down, chevron-up, chevron-right, chevron-left,
                arrow-right, arrow-left, external-link
  Acciones    : search, plus, minus, edit, trash, copy, download, upload,
                filter, log-out
  Estado      : check, close, info, warning, check-circle, x-circle, loader
  UI          : user, settings, mail, bell, lock, calendar, eye, eye-off,
                star, heart

Tamaños en píxeles: xs=12, sm=16, md=20, lg=24, xl=32

Criterios de aceptación:
  ✓ stroke="currentColor", fill="none", stroke-width=2
  ✓ stroke-linecap="round", stroke-linejoin="round" en todos
  ✓ Sin label → aria-hidden="true"
  ✓ Con label → aria-label={label} + role="img"
  ✓ Ícono desconocido → retorna null sin crash
  ✓ Exportar 'iconPaths' como constante para listar el catálogo

──────────────────────────────────────────
### AT-07 · Typography
──────────────────────────────────────────
Props requeridas:
  variant  : 'h1'|'h2'|'h3'|'h4'|'h5'|'h6'|
             'body-lg'|'body'|'body-sm'|
             'caption'|'overline'|'code'      → default: 'body'
  color    : 'primary'|'secondary'|'muted'|'disabled'|
             'accent'|'success'|'warning'|'danger'|'inherit' → default: 'primary'
  as       : ElementType (opcional) — sobreescribe tag HTML
  truncate : boolean → default: false

Mapping de tags por defecto:
  h1-h6 → <h1>-<h6>
  body-lg, body, body-sm → <p>
  caption, overline → <span>
  code → <code>

Criterios de aceptación:
  ✓ margin:0 en todos los variantes (no margin externo)
  ✓ font-family: var(--font-sans) excepto code → var(--font-mono)
  ✓ overline: text-transform uppercase + letter-spacing 0.08em
  ✓ code: bg var(--color-bg-muted), border var(--color-border), padding inline
  ✓ truncate: overflow hidden + text-overflow ellipsis + white-space nowrap

──────────────────────────────────────────
### AT-08 · Badge
──────────────────────────────────────────
Props requeridas:
  variant : 'default'|'primary'|'success'|'warning'|'danger' → default: 'default'
  size    : 'sm'|'md' → default: 'md'

Criterios de aceptación:
  ✓ border-radius: var(--radius-full)
  ✓ No tiene onClick — para badges interactivos usar Button
  ✓ Cada variante: color de texto + fondo + borde coordinados

──────────────────────────────────────────
### AT-09 · Tag
──────────────────────────────────────────
Props requeridas:
  variant   : 'default'|'primary'|'success'|'warning'|'danger' → default: 'default'
  removable : boolean → default: false
  onRemove  : () => void (opcional)
  disabled  : boolean → default: false

Criterios de aceptación:
  ✓ Botón × con aria-label="Eliminar etiqueta"
  ✓ e.stopPropagation() en el click del botón × (no propaga al padre)
  ✓ disabled=true → onRemove no se ejecuta
  ✓ border-radius: var(--radius-sm) (rectangular, diferencia visual con Badge)
  ✓ Borde fino visible en todos los variantes

──────────────────────────────────────────
### AT-10 · Avatar
──────────────────────────────────────────
Props requeridas:
  src      : string (opcional)
  initials : string (opcional) — fallback cuando no hay src
  size     : 'xs'|'sm'|'md'|'lg'|'xl' → default: 'md'
  alt      : string → default: ''

Tamaños: xs=24px, sm=32px, md=40px, lg=48px, xl=64px

Criterios de aceptación:
  ✓ Con src → <img> con object-fit:cover + border-radius 50%
  ✓ Sin src → <span> con iniciales (máx 2 chars, toUpperCase())
  ✓ Fallback: bg var(--color-primary-100), color var(--color-primary-700)
  ✓ forwardRef hacia img o span según caso

──────────────────────────────────────────
### AT-11 · Spinner
──────────────────────────────────────────
Props requeridas:
  size    : 'xs'|'sm'|'md'|'lg'|'xl' → default: 'md'
  variant : 'primary'|'secondary'|'white' → default: 'primary'
  label   : string → default: 'Cargando...'

Criterios de aceptación:
  ✓ role="status" + aria-label={label}
  ✓ Texto label visualmente oculto (clase .sr-only)
  ✓ border parcial (3 lados visibles, 1 transparente) + animación spin
  ✓ primary: borde var(--color-primary-200), top var(--color-primary-600)
  ✓ secondary: borde neutral-200, top neutral-500
  ✓ white: borde rgba(255,255,255,0.3), top #fff

──────────────────────────────────────────
### AT-12 · Divider
──────────────────────────────────────────
Props requeridas:
  orientation : 'horizontal'|'vertical' → default: 'horizontal'
  variant     : 'solid'|'dashed'|'dotted' → default: 'solid'
  label       : string (opcional)
  labelAlign  : 'start'|'center'|'end' → default: 'center'

Criterios de aceptación:
  ✓ horizontal sin label → <hr> con role="separator"
  ✓ vertical → <div> con aria-orientation="vertical"
  ✓ Con label → <div> con dos líneas flanqueando el texto
  ✓ labelAlign="start" → ocultar línea izquierda
  ✓ labelAlign="end" → ocultar línea derecha
  ✓ Color: var(--color-border)
  ✓ No tiene margin propio


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PASO FINAL — Actualizar barrel y verificar
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Después de generar los 12 átomos:

1. Actualizar @src/index.ts con todos los exports:
   export * from './atoms/Avatar'
   export * from './atoms/Badge'
   export * from './atoms/Button'
   export * from './atoms/Checkbox'
   export * from './atoms/Divider'
   export * from './atoms/Icon'
   export * from './atoms/Input'
   export * from './atoms/Select'
   export * from './atoms/Spinner'
   export * from './atoms/Tag'
   export * from './atoms/Textarea'
   export * from './atoms/Typography'

2. Ejecutar verificación de tipos:
   npx tsc --noEmit

3. Reportar en formato:
   ✓ AT-01 Button     — 4 archivos creados
   ✓ AT-02 Input      — 4 archivos creados
   ... (uno por línea)
   ──────────────────────────────────
   Total: 48 archivos | Errores TypeScript: 0


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ANTI-PATRONES — Detectar y corregir antes de guardar
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ✗ style={{ marginTop: '16px' }}   → sin margin externo
  ✗ color: '#2563eb'                → usar var(--color-primary-600)
  ✗ import { Icon } from '../Icon'  → los átomos no importan otros átomos
  ✗ type variant = string           → usar union type explícito
  ✗ any                             → tipado estricto siempre
  ✗ className="text-blue-500"       → solo CSS Modules, sin Tailwind
  ✗ <br /> para espaciado           → usar gap o padding en CSS
  ✗ console.log(...)                → eliminar antes de guardar
