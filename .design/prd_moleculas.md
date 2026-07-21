# PROMPT MAESTRO — Generación de Moléculas
# UIComponentLibrary · Claude Code
# Usar con: claude (en la raíz del proyecto)
# ══════════════════════════════════════════════════════════════

Eres un experto en diseño de sistemas de componentes React con TypeScript,
CSS Modules y Atomic Design. Tu tarea es construir la capa de MOLÉCULAS completa
de la biblioteca UIComponentLibrary siguiendo la especificación incluida aquí.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## CONTEXTO DEL PROYECTO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Proyecto    : UIComponentLibrary
- Metodología : Atomic Design — capa de MOLÉCULAS
- Stack       : React 18 · TypeScript 5 · Vite 5 · CSS Modules · clsx
- Catálogo    : Storybook 8
- Ruta base   : src/molecules/

Lee estos archivos ANTES de escribir cualquier código:
  @src/tokens/tokens.css
  @src/tokens/index.ts
  @src/index.ts
  @src/atoms/Button/Button.tsx
  @src/atoms/Input/Input.tsx
  @src/atoms/Textarea/Textarea.tsx
  @src/atoms/Select/Select.tsx
  @src/atoms/Checkbox/Checkbox.tsx
  @src/atoms/Icon/Icon.tsx
  @src/atoms/Typography/Typography.tsx
  @src/atoms/Badge/Badge.tsx
  @src/atoms/Tag/Tag.tsx
  @src/atoms/Avatar/Avatar.tsx
  @src/atoms/Spinner/Spinner.tsx
  @src/atoms/Divider/Divider.tsx


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## QUÉ ES UNA MOLÉCULA (leer antes de codificar)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Una molécula combina 2 o más átomos en una unidad funcional con propósito
único. Las moléculas:

  ✓ Importan átomos del nivel inferior (src/atoms/*)
  ✓ Pueden tener estado local React (useState, useRef) si es estrictamente UI
  ✓ Coordinan la interacción entre sus átomos
  ✓ Exponen una API simplificada (menos props que la suma de sus átomos)
  ✗ NO conectan con APIs externas ni stores globales
  ✗ NO contienen lógica de negocio
  ✗ NO importan otras moléculas (evitar dependencias horizontales)
  ✗ NO tienen margin externo (el padre controla el espaciado)


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## REGLAS GLOBALES — NUNCA ROMPER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

IMPORTACIONES
  ✓ Átomos siempre desde su barrel:
      import { Button } from '../atoms/Button'
      import { Icon }   from '../atoms/Icon'
  ✗ Nunca rutas internas del átomo:
      import { Button } from '../atoms/Button/Button'   ← MAL

ESTILOS
  ✓ Solo CSS Modules (.module.css) — nunca inline, nunca Tailwind
  ✓ Solo var(--token) de tokens.css — nunca valores en duro
  ✓ El layout interno (flex, grid, gap) va en el CSS de la molécula
  ✗ Sin margin externo en el wrapper raíz

TYPESCRIPT
  ✓ Props propias + re-exportar tipos de átomos relevantes cuando aplique
  ✓ Variantes como union types explícitos
  ✓ Exportar todos los tipos: Props, variantes, callbacks
  ✗ Prohibido `any`

ACCESIBILIDAD
  ✓ Roles semánticos correctos en wrappers (role="search", role="group", etc.)
  ✓ aria-label en iconos sin texto visible
  ✓ Mantener accesibilidad de los átomos internos (no sobrescribir sin razón)
  ✓ keyboard navigation funcional en todos los casos interactivos

STORYBOOK
  ✓ title: 'Molecules/NombreMolecula' · tags: ['autodocs']
  ✓ Story "Default" con props representativas
  ✓ Story "Playground" o "Interactive" con useState para probar comportamiento
  ✓ Stories de estados clave (loading, error, disabled, vacío)
  ✓ Story "Composition" mostrando la molécula en contexto real si aplica

ESTRUCTURA DE ARCHIVOS por molécula:
  src/molecules/NombreMolecula/
  ├── NombreMolecula.tsx
  ├── NombreMolecula.module.css
  ├── NombreMolecula.stories.tsx
  └── index.ts


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## MOLÉCULAS A GENERAR (en este orden)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Trabaja molécula por molécula, completando los 4 archivos antes de continuar.

──────────────────────────────────────────
### ML-01 · SearchBar
Átomos: Input + Icon + Button
──────────────────────────────────────────
Propósito:
  Campo de búsqueda con ícono decorativo a la izquierda y botón de acción
  opcional a la derecha. Maneja su propio estado interno del texto.

Props:
  placeholder : string                      → default: 'Buscar...'
  value       : string (controlled, opcional)
  defaultValue: string (uncontrolled)
  onSearch    : (query: string) => void     — se llama al pulsar Enter o el botón
  onChange    : (value: string) => void     — se llama en cada keystroke
  loading     : boolean                     → default: false
  disabled    : boolean                     → default: false
  showButton  : boolean                     → default: true
  buttonLabel : string                      → default: 'Buscar'
  size        : 'sm' | 'md' | 'lg'         → default: 'md'

Comportamiento:
  ✓ Enter en el Input dispara onSearch(value)
  ✓ Clic en el Button dispara onSearch(value)
  ✓ Con loading=true: Button muestra spinner, Input deshabilitado
  ✓ Ícono de búsqueda siempre visible a la izquierda del Input (como prefix)
  ✓ showButton=false: solo Input con ícono, sin Button
  ✓ Si hay texto y se pulsa Escape: limpiar el campo

Estructura interna:
  <div role="search" aria-label="Barra de búsqueda">
    <Input prefix={<Icon name="search" />} ... />
    {showButton && <Button loading={loading}>...</Button>}
  </div>

CSS notas:
  - wrapper: display flex, gap var(--space-2), align-items flex-start
  - Input ocupa flex:1, Button tiene ancho fijo según size
  - size prop afecta la altura coordinada de Input y Button

──────────────────────────────────────────
### ML-02 · FormField
Átomos: Typography + (cualquier control de formulario como children)
──────────────────────────────────────────
Propósito:
  Wrapper de campo de formulario que provee label, indicador de requerido,
  hint y error de forma consistente. El control (Input, Select, Textarea,
  Checkbox) se pasa como children.

Props:
  label      : string (requerido)
  htmlFor    : string — id del control interno para asociar el label
  required   : boolean → default: false
  error      : string (opcional)
  hint       : string (opcional) — oculto cuando hay error
  children   : ReactNode (requerido)

Comportamiento:
  ✓ Label siempre visible arriba del children
  ✓ Asterisco rojo (*) cuando required=true (aria-hidden="true" en el *)
  ✓ hint visible debajo del children cuando no hay error
  ✓ error visible en rojo debajo del children, reemplaza hint
  ✓ Pasa aria-describedby al children si hay error o hint (via React.cloneElement
    o contexto, elegir el enfoque más limpio)

CSS notas:
  - Layout: flex-direction column, gap var(--space-1)
  - Label: font-size var(--font-size-sm), font-weight var(--font-weight-medium)
  - Error: font-size var(--font-size-xs), color var(--color-danger-600)
  - Hint: font-size var(--font-size-xs), color var(--color-text-secondary)
  - required asterisk: color var(--color-danger-500)

──────────────────────────────────────────
### ML-03 · UserCard
Átomos: Avatar + Typography + Badge
──────────────────────────────────────────
Propósito:
  Tarjeta compacta de usuario que muestra avatar, nombre, rol/email y
  un badge de estado de presencia. Puede ser interactiva (clicable).

Props:
  name      : string (requerido)
  role      : string (opcional)
  email     : string (opcional)
  avatarSrc : string (opcional)
  status    : 'online' | 'offline' | 'away' | 'busy' (opcional)
  size      : 'sm' | 'md' | 'lg'   → default: 'md'
  onClick   : () => void (opcional) — hace la tarjeta interactiva
  selected  : boolean → default: false — estado seleccionado visual

Comportamiento:
  ✓ Con onClick: cursor pointer, hover bg, role="button", tabIndex=0
  ✓ Con onClick + keyboard: Enter y Space disparan onClick
  ✓ selected=true: borde y fondo de acento (primary-100, borde primary-300)
  ✓ Sin email ni role: solo muestra nombre + avatar
  ✓ Avatar fallback con iniciales (primera letra de nombre y apellido)

Mapeo de status → Badge variant:
  online  → success ('En línea')
  offline → default ('Desconectado')
  away    → warning ('Ausente')
  busy    → danger  ('Ocupado')

Mapeo de size → Avatar size:
  sm → xs avatar, body-sm nombre
  md → sm avatar, body nombre
  lg → md avatar, body-lg nombre

──────────────────────────────────────────
### ML-04 · Notification
Átomos: Icon + Typography + Button (opcional)
──────────────────────────────────────────
Propósito:
  Mensaje de alerta o feedback inline. Comunica estados de éxito, error,
  advertencia o información con opción de acción y cierre.

Props:
  variant    : 'info' | 'success' | 'warning' | 'error'  → default: 'info'
  title      : string (opcional)
  message    : string (requerido)
  dismissible: boolean → default: false
  onDismiss  : () => void (opcional)
  action     : { label: string; onClick: () => void } (opcional)
  icon       : boolean → default: true — muestra ícono del tipo

Comportamiento:
  ✓ Con dismissible: botón × en esquina superior derecha
  ✓ Con action: botón de texto (ghost) alineado al final
  ✓ El componente NO maneja su propio show/hide — el padre controla visibilidad
  ✓ role="alert" para variantes error y warning (anuncia a screen readers)
  ✓ role="status" para variantes info y success

Mapeo de variant:
  info    → Icon: 'info',          bg: var(--color-primary-50),  borde: primary-200
  success → Icon: 'check-circle',  bg: #f0fdf4,                  borde: #bbf7d0
  warning → Icon: 'warning',       bg: #fffbeb,                  borde: #fde68a
  error   → Icon: 'x-circle',      bg: #fef2f2,                  borde: #fecaca

CSS notas:
  - Layout: display flex, gap var(--space-3), padding var(--space-4)
  - border-radius var(--radius-lg), border 1px solid
  - Ícono alineado arriba (align-self: flex-start)
  - Área de texto ocupa flex:1

──────────────────────────────────────────
### ML-05 · Breadcrumb
Átomos: Icon + Typography
──────────────────────────────────────────
Propósito:
  Navegación de ruta jerárquica. Indica al usuario su posición dentro de la
  aplicación y permite navegar a niveles superiores.

Props:
  items      : Array<{ label: string; href?: string; onClick?: () => void }>
  separator  : 'chevron' | 'slash'   → default: 'chevron'
  maxItems   : number (opcional)     — colapsa items del medio con '...'

Comportamiento:
  ✓ Último item: no clicable, aria-current="page", texto color primary
  ✓ Items anteriores: clicables (href o onClick), color secondary, hover primary
  ✓ Con maxItems: muestra first, '...', last-2, last-1, last (colapsa el medio)
  ✓ separator='chevron': Icon name="chevron-right" size="xs"
  ✓ separator='slash': carácter "/" con color secondary

Accesibilidad:
  <nav aria-label="Migas de pan">
    <ol>  ← lista ordenada semántica
      <li> por cada item
    </ol>
  </nav>

CSS notas:
  - ol: display flex, align-items center, list-style none, margin 0, padding 0
  - gap var(--space-1) entre items y separadores
  - Links: sin text-decoration por defecto, underline en hover

──────────────────────────────────────────
### ML-06 · InputGroup
Átomos: Input + Button + Icon + Typography
──────────────────────────────────────────
Propósito:
  Input con addon adjunto (texto, ícono o botón) en el lado izquierdo
  o derecho, visualmente unidos como una sola unidad.

Props:
  inputProps    : InputProps (todas las props de Input excepto prefix/suffix)
  addonLeft     : string | ReactNode (opcional) — texto o ícono pegado al input
  addonRight    : string | ReactNode (opcional)
  buttonLeft    : { label: string; onClick: () => void; icon?: IconName } (opc.)
  buttonRight   : { label: string; onClick: () => void; icon?: IconName } (opc.)
  size          : 'sm' | 'md' | 'lg' → default: 'md'

Comportamiento:
  ✓ Addon texto: fondo var(--color-bg-muted), borde compartido con Input
  ✓ Addon ícono: mismo tratamiento que addon texto
  ✓ Button adjunto: sin border-radius en el lado que toca al Input
    (border-radius 0 en el lado interno)
  ✓ El wrapper completo parece una sola unidad visual con un solo borde
  ✓ focus-within en cualquier parte activa el ring del grupo completo

Casos de uso típicos:
  - URL input: addon "https://" + Input de dominio
  - Precio: addon "$" + Input numérico
  - Copia: Input de API key + Button "Copiar" con Icon "copy"

CSS notas:
  - wrapper: display flex, overflow hidden, border-radius var(--radius-md)
  - border en el wrapper (no en Input ni Button individualmente)
  - Input dentro: border none, box-shadow none, border-radius 0

──────────────────────────────────────────
### ML-07 · TagInput
Átomos: Input + Tag + Icon
──────────────────────────────────────────
Propósito:
  Campo de entrada que permite añadir y eliminar múltiples etiquetas (tags).
  Combina un campo de texto con una lista de Tag removibles.

Props:
  value        : string[]             — tags actuales (controlado)
  onChange     : (tags: string[]) => void
  placeholder  : string → default: 'Añadir etiqueta...'
  maxTags      : number (opcional)
  disabled     : boolean → default: false
  error        : string (opcional)
  label        : string (opcional)
  tagVariant   : TagVariant → default: 'primary'
  allowDuplicates : boolean → default: false

Comportamiento:
  ✓ Enter o coma (,) añaden el texto actual como nuevo tag
  ✓ Backspace con input vacío elimina el último tag
  ✓ Al añadir: limpiar el campo, trim del texto, ignorar si vacío
  ✓ allowDuplicates=false: ignorar si el tag ya existe
  ✓ maxTags alcanzado: deshabilitar el Input internamente
  ✓ Tags removibles mediante botón × de cada Tag
  ✓ El wrapper completo actúa como un campo unificado (click → focus al input)

CSS notas:
  - wrapper: border 1px solid var(--color-border-strong), border-radius md
  - Interior: display flex, flex-wrap wrap, gap var(--space-1), padding var(--space-2)
  - Input interno: border none, outline none, flex 1, min-width 120px
  - focus-within del wrapper activa el ring visual

──────────────────────────────────────────
### ML-08 · AvatarGroup
Átomos: Avatar + Typography
──────────────────────────────────────────
Propósito:
  Grupo de avatares superpuestos que representa un equipo o lista de usuarios.
  Muestra los primeros N avatares y un contador del resto.

Props:
  users   : Array<{ name: string; avatarSrc?: string; id: string }>
  max     : number → default: 4  — máximo de avatares visibles
  size    : 'xs' | 'sm' | 'md' | 'lg' → default: 'sm'
  onClick : () => void (opcional) — hace el grupo interactivo

Comportamiento:
  ✓ Muestra los primeros `max` avatares superpuestos (overlap negativo)
  ✓ Si hay más de `max`: último slot muestra "+N" (ej: "+3") en lugar de avatar
  ✓ Avatar "+N": fondo var(--color-neutral-200), texto secondary
  ✓ Con onClick: cursor pointer, hover escala los avatares ligeramente
  ✓ Tooltips opcionales en hover (solo si el browser soporta title attr)
  ✓ aria-label="N miembros del equipo" en el contenedor

CSS notas:
  - Contenedor: display flex, direction row-reverse (para overlap natural)
  - Cada Avatar: margin-left negativo según size:
      xs: -6px · sm: -8px · md: -10px · lg: -12px
  - Cada Avatar: border 2px solid var(--color-bg) para separación visual
  - Hover: el avatar sobre el que está el cursor sube con z-index

──────────────────────────────────────────
### ML-09 · ProgressBar
Átomos: Typography
──────────────────────────────────────────
Propósito:
  Indicador visual del progreso de una tarea o proceso. Admite etiqueta,
  valor numérico y variantes semánticas de color.

Props:
  value      : number           — 0 a 100 (porcentaje)
  max        : number → default: 100
  variant    : 'default' | 'primary' | 'success' | 'warning' | 'danger'
               → default: 'primary'
  size       : 'sm' | 'md' | 'lg' → default: 'md'
  label      : string (opcional)
  showValue  : boolean → default: false — muestra "N%" a la derecha del label
  animated   : boolean → default: false — animación de rayas en movimiento
  striped    : boolean → default: false — patrón de rayas estático

Comportamiento:
  ✓ value se clampea entre 0 y max
  ✓ Transición CSS suave al cambiar value (transition: width 0.4s ease)
  ✓ animated=true solo funciona si striped=true
  ✓ ARIA: role="progressbar", aria-valuenow, aria-valuemin=0, aria-valuemax

CSS notas:
  - Track: bg var(--color-bg-muted), border-radius var(--radius-full)
  - Fill: bg según variant, misma border-radius
  - sm=4px alto · md=8px · lg=12px
  - Striped: background-image linear-gradient diagonal con transparencia
  - Animado: background-size animado (CSS keyframe)

──────────────────────────────────────────
### ML-10 · Tooltip
Átomos: Typography
──────────────────────────────────────────
Propósito:
  Texto informativo flotante que aparece al hacer hover o focus sobre
  un elemento. Implementado en CSS puro (sin JS de posicionamiento).

Props:
  content   : string (requerido)
  placement : 'top' | 'bottom' | 'left' | 'right' → default: 'top'
  children  : ReactNode (requerido) — el elemento trigger
  delay     : number → default: 200 — ms antes de aparecer (CSS transition-delay)

Comportamiento:
  ✓ Aparece en hover Y en focus (accesible con teclado)
  ✓ El tooltip NO desaparece al hacer hover sobre él mismo
  ✓ role="tooltip" en el elemento del tooltip
  ✓ aria-describedby en el trigger apuntando al tooltip
  ✓ Transición opacity 0→1 con transition-delay

CSS notas:
  - wrapper: position relative, display inline-flex
  - tooltip: position absolute, white-space nowrap, z-index var(--z-tooltip)
  - bg: var(--color-neutral-900), color: #fff, border-radius var(--radius-md)
  - padding: var(--space-1) var(--space-2), font-size var(--font-size-xs)
  - Flecha: pseudo-elemento ::before con border-trick CSS
  - Invisible por defecto (opacity 0, pointer-events none)
  - Visible en wrapper:hover > tooltip, wrapper:focus-within > tooltip

Placement CSS (posición del tooltip relativo al wrapper):
  top    → bottom: calc(100% + 8px); left: 50%; transform: translateX(-50%)
  bottom → top:    calc(100% + 8px); left: 50%; transform: translateX(-50%)
  left   → right:  calc(100% + 8px); top:  50%; transform: translateY(-50%)
  right  → left:   calc(100% + 8px); top:  50%; transform: translateY(-50%)

──────────────────────────────────────────
### ML-11 · RadioGroup
Átomos: Typography + Icon (check)
──────────────────────────────────────────
Propósito:
  Grupo de opciones mutuamente excluyentes. Reemplaza el radio button nativo
  con un diseño consistente. Soporta layout horizontal y vertical.

Props:
  options   : Array<{ value: string; label: string; description?: string; disabled?: boolean }>
  value     : string (controlado)
  onChange  : (value: string) => void
  name      : string (requerido para accesibilidad)
  label     : string (opcional) — etiqueta del grupo completo
  direction : 'vertical' | 'horizontal' → default: 'vertical'
  variant   : 'default' | 'card' → default: 'default'
  disabled  : boolean → default: false — deshabilita todo el grupo
  error     : string (opcional)

Comportamiento:
  ✓ Solo una opción seleccionable a la vez
  ✓ Navegación con flechas (↑↓ vertical, ←→ horizontal) — roving tabindex
  ✓ variant='card': cada opción es una tarjeta con borde, seleccionada muestra
    borde primary y fondo primary-50
  ✓ option.disabled: esa opción no es seleccionable, opacity 0.45
  ✓ disabled global: todas las opciones deshabilitadas

Accesibilidad:
  <fieldset>
    <legend>{label}</legend>  ← solo si label definido
    <div role="radiogroup">
      <label> por cada opción con input[type=radio] oculto + caja visual
    </div>
  </fieldset>

CSS notas (variant='default'):
  - Caja radio: 18×18px, border-radius 50%, border 1.5px
  - Seleccionada: border primary-600, punto interior 8×8px bg primary-600
  - Foco: ring 3px primary-100

CSS notas (variant='card'):
  - Cada opción: padding var(--space-3) var(--space-4), border-radius md
  - Sin seleccionar: border var(--color-border), bg var(--color-bg)
  - Seleccionada: border primary-400, bg primary-50

──────────────────────────────────────────
### ML-12 · FileUpload
Átomos: Button + Icon + Typography + Spinner
──────────────────────────────────────────
Propósito:
  Zona de arrastrar-y-soltar archivos con selector de archivos alternativo.
  Muestra previsualización de archivos seleccionados con opción de eliminar.

Props:
  accept      : string (opcional) — MIME types: 'image/*', '.pdf,.docx'
  multiple    : boolean → default: false
  maxSize     : number (opcional) — bytes máximos por archivo
  maxFiles    : number (opcional)
  disabled    : boolean → default: false
  loading     : boolean → default: false
  error       : string (opcional)
  onFilesChange : (files: File[]) => void
  label       : string → default: 'Arrastra archivos aquí'
  sublabel    : string → default: 'o haz clic para seleccionar'

Estado interno:
  - files: File[] — archivos actualmente seleccionados
  - isDragging: boolean — activa estilos de drag-over
  - dragError: string | null — error de validación durante drag

Comportamiento:
  ✓ Drag-over: borde punteado primary, fondo primary-50, escalar ícono
  ✓ Drop: validar tipo (accept), tamaño (maxSize), cantidad (maxFiles)
  ✓ Error de validación: mostrar mensaje, NO añadir archivos inválidos
  ✓ Clic en la zona abre el file picker nativo
  ✓ Cada archivo aceptado aparece como fila: Icon (tipo) + nombre + tamaño + botón ×
  ✓ Botón × elimina ese archivo de la lista
  ✓ loading=true: deshabilita la zona y muestra Spinner
  ✓ Formatos de tamaño legibles: 1024 → "1 KB", 1048576 → "1 MB"

CSS notas:
  - Zona: border 2px dashed var(--color-border-strong), border-radius var(--radius-lg)
  - padding: var(--space-8), text-align center
  - isDragging: border-color primary-400, bg primary-50
  - Lista de archivos: debajo de la zona, separada con Divider
  - Fila de archivo: display flex, align-items center, gap var(--space-2)


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## MAPA DE DEPENDENCIAS — resumen rápido
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ML-01 SearchBar    → Input, Icon, Button
  ML-02 FormField    → Typography (label, error, hint)
  ML-03 UserCard     → Avatar, Typography, Badge
  ML-04 Notification → Icon, Typography, Button
  ML-05 Breadcrumb   → Icon, Typography
  ML-06 InputGroup   → Input, Button, Icon, Typography
  ML-07 TagInput     → Input, Tag, Icon
  ML-08 AvatarGroup  → Avatar, Typography
  ML-09 ProgressBar  → Typography
  ML-10 Tooltip      → Typography
  ML-11 RadioGroup   → Typography, Icon
  ML-12 FileUpload   → Button, Icon, Typography, Spinner, Divider


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PASO FINAL — Actualizar barrel y verificar
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Después de generar las 12 moléculas, actualizar @src/index.ts añadiendo:

  // ─── Molecules ────────────────────────────────
  export * from './molecules/AvatarGroup'
  export * from './molecules/Breadcrumb'
  export * from './molecules/FileUpload'
  export * from './molecules/FormField'
  export * from './molecules/InputGroup'
  export * from './molecules/Notification'
  export * from './molecules/ProgressBar'
  export * from './molecules/RadioGroup'
  export * from './molecules/SearchBar'
  export * from './molecules/TagInput'
  export * from './molecules/Tooltip'
  export * from './molecules/UserCard'

Luego ejecutar:
  npx tsc --noEmit

Reportar resultado en formato:
  ✓ ML-01 SearchBar    — 4 archivos · sin errores TS
  ✓ ML-02 FormField    — 4 archivos · sin errores TS
  ... (uno por línea)
  ─────────────────────────────────────────────────
  Total: 48 archivos | Errores TypeScript: 0


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ANTI-PATRONES — Detectar y corregir antes de guardar
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ✗ import { Button } from '../atoms/Button/Button'
    → siempre desde el barrel: '../atoms/Button'

  ✗ import { SearchBar } from '../molecules/SearchBar'
    → las moléculas NO importan otras moléculas

  ✗ fetch('/api/users')  o  useSelector(...)
    → sin lógica de negocio ni stores globales

  ✗ style={{ marginTop: '24px' }}
    → sin margin externo; el padre controla el espaciado

  ✗ color: '#2563eb'  /  padding: '16px'
    → solo var(--color-primary-600)  /  var(--space-4)

  ✗ type status = string
    → union type: 'online' | 'offline' | 'away' | 'busy'

  ✗ any
    → tipado estricto siempre

  ✗ <div onClick={...}> sin role ni keyboard handler
    → añadir role="button", tabIndex=0, onKeyDown para Enter/Space

  ✗ Stories sin estado interactivo en moléculas con callbacks
    → usar useState en el render de la story para simular el comportamiento
