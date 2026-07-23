# PROMPT MAESTRO — Organismo Planner
# UIComponentLibrary · Claude Code
# Usar con: claude (en la raíz del proyecto)
# ══════════════════════════════════════════════════════════════

Eres un experto en diseño de sistemas de componentes React con TypeScript,
CSS Modules y Atomic Design. Tu tarea es construir el organismo PLANNER
de la biblioteca UIComponentLibrary siguiendo la especificación completa
incluida aquí.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## CONTEXTO DEL PROYECTO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Proyecto    : UIComponentLibrary
- Metodología : Atomic Design — capa de ORGANISMOS
- Stack       : React 18 · TypeScript 5 · Vite 5 · CSS Modules · clsx
- Catálogo    : Storybook 8
- Ruta base   : src/organisms/Planner/

Lee estos archivos ANTES de escribir cualquier código:
  @src/tokens/tokens.css
  @src/atoms/Button/index.ts
  @src/atoms/Icon/index.ts
  @src/atoms/Typography/index.ts
  @src/atoms/Badge/index.ts
  @src/atoms/Spinner/index.ts
  @src/atoms/Tooltip/index.ts
  @src/index.ts


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## DESCRIPCIÓN FUNCIONAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

El Planner es un calendario de horario tipo "agenda de columnas" con:

  IZQUIERDA  : línea de tiempo vertical con marcas de hora configurables
  DERECHA    : columnas paralelas, cada una con header personalizable y
               cards de eventos que ocupan espacio proporcional al tiempo

La parametría (hora inicio, hora fin, granularidad, nº de columnas) se
expone mediante una barra de píldoras colapsables: cada parámetro es una
píldora independiente que al pulsarse despliega solo su propio control.
Pulsar "Aplicar" cierra el panel y actualiza el planner.


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ESTRUCTURA DE ARCHIVOS A GENERAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

src/organisms/Planner/
├── Planner.tsx                  ← componente raíz + tipos públicos
├── Planner.module.css           ← estilos del layout general
├── Planner.stories.tsx          ← stories de Storybook
├── index.ts                     ← barrel export
│
├── PlannerToolbar.tsx           ← barra de píldoras con panel colapsable
├── PlannerToolbar.module.css
│
├── PlannerTimeline.tsx          ← columna izquierda de horas
├── PlannerTimeline.module.css
│
├── PlannerGrid.tsx              ← área de columnas + filas de fondo
├── PlannerGrid.module.css
│
├── PlannerColumn.tsx            ← una columna: header + eventos posicionados
├── PlannerColumn.module.css
│
└── plannerUtils.ts              ← funciones puras (cálculos de posición, formato)

TOTAL: 11 archivos


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## TIPOS TYPESCRIPT — definir en Planner.tsx y exportar todos
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```ts
// ── Parametría ───────────────────────────────────────────────
export type PlannerGranularity = 15 | 30 | 60   // minutos por slot

export interface PlannerConfig {
  startHour   : number            // 0–23, ej: 7 → 7:00 AM
  endHour     : number            // 0–23, ej: 18 → 6:00 PM
  granularity : PlannerGranularity
  slotHeight ?: number            // px por slot → default: 48
}

// ── Parámetros ocultables en el toolbar ─────────────────────
export type PlannerParamKey = 'startHour' | 'endHour' | 'granularity' | 'columns'

// ── Columnas ─────────────────────────────────────────────────
export interface PlannerColumn<TMeta = unknown> {
  id   : string
  meta : TMeta    // datos libres para renderColumnHeader
}

// ── Eventos ──────────────────────────────────────────────────
export interface PlannerEvent<TMeta = unknown> {
  id          : string
  columnId    : string
  startMin    : number   // minutos desde startHour, ej: 60 = 1h después
  durationMin : number   // duración total en minutos
  color      ?: string   // valor CSS directo (hex, var(--...), hsl(...))
  meta        : TMeta    // datos libres para renderEventCard
}

// ── Props del organismo ───────────────────────────────────────
export interface PlannerProps<TCol = unknown, TEvent = unknown> {
  // Configuración de tiempo
  config            : PlannerConfig
  onConfigChange   ?: (config: PlannerConfig) => void

  // Columnas y eventos
  columns           : PlannerColumn<TCol>[]
  events            : PlannerEvent<TEvent>[]

  // Render props — átomos personalizables
  renderColumnHeader: (col: PlannerColumn<TCol>, index: number) => React.ReactNode
  renderEventCard   : (event: PlannerEvent<TEvent>) => React.ReactNode

  // Toolbar — qué parámetros mostrar como píldoras
  // Si se omite, se muestran todos. Si es [] se oculta el toolbar entero.
  visibleParams    ?: PlannerParamKey[]
  // Límites para los selectores del toolbar
  minStartHour     ?: number   // default: 0
  maxEndHour       ?: number   // default: 23
  maxColumns       ?: number   // default: 10

  // Callbacks de interacción
  onEventClick     ?: (event: PlannerEvent<TEvent>) => void
  onSlotClick      ?: (columnId: string, startMin: number) => void
  onEventMove      ?: (id: string, newColumnId: string, newStartMin: number) => void
  onEventResize    ?: (id: string, newDurationMin: number) => void

  // Estados
  loading          ?: boolean
  className        ?: string
}
```


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ESPECIFICACIÓN: plannerUtils.ts
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Funciones puras sin dependencias de React. Exportar todas.

```ts
// Cuántos slots caben en el rango
export function calcSlotCount(config: PlannerConfig): number {
  return ((config.endHour - config.startHour) * 60) / config.granularity
}

// Posición vertical y altura de un evento en píxeles
export function calcEventPosition(
  event      : PlannerEvent,
  config     : PlannerConfig,
  slotHeight : number,
): { top: number; height: number } {
  const top    = (event.startMin / config.granularity) * slotHeight
  const height = Math.max(slotHeight * 0.6, (event.durationMin / config.granularity) * slotHeight - 4)
  return { top, height }
}

// Desde coordenada Y en píxeles → minutos desde startHour
export function pxToMinutes(
  px         : number,
  config     : PlannerConfig,
  slotHeight : number,
): number {
  const raw = Math.round((px / slotHeight) * config.granularity)
  return Math.max(0, raw - (raw % config.granularity))  // snap a granularidad
}

// Formato de hora: 7, 30 → "7:30 AM"
export function formatTime(totalHour: number, minutes: number): string {
  const h = Math.floor(totalHour) + Math.floor(minutes / 60)
  const m = minutes % 60
  const ap = h >= 12 ? 'PM' : 'AM'
  const hh = h % 12 || 12
  return `${hh}:${String(m).padStart(2, '0')} ${ap}`
}

// Texto de rango de un evento: "8:00 AM – 9:30 AM"
export function formatEventRange(event: PlannerEvent, config: PlannerConfig): string {
  const absStart = config.startHour * 60 + event.startMin
  const absEnd   = absStart + event.durationMin
  return `${formatTime(0, absStart)} – ${formatTime(0, absEnd)}`
}

// Verificar si dos eventos se superponen en la misma columna
export function eventsOverlap(a: PlannerEvent, b: PlannerEvent): boolean {
  return a.columnId === b.columnId &&
    a.startMin < b.startMin + b.durationMin &&
    b.startMin < a.startMin + a.durationMin
}

// Agrupar eventos superpuestos en "tracks" paralelos (para mostrarlos lado a lado)
export function groupOverlappingEvents(
  events: PlannerEvent[]
): Map<string, number> {  // id → track index (0 = primer track, 1 = segundo, etc.)
  const trackMap = new Map<string, number>()
  const sorted = [...events].sort((a, b) => a.startMin - b.startMin)
  const tracks: number[] = []   // tracks[i] = minuto de fin del último evento en track i

  for (const ev of sorted) {
    let assigned = -1
    for (let t = 0; t < tracks.length; t++) {
      if (ev.startMin >= tracks[t]) { assigned = t; break }
    }
    if (assigned === -1) { assigned = tracks.length; tracks.push(0) }
    tracks[assigned] = ev.startMin + ev.durationMin
    trackMap.set(ev.id, assigned)
  }
  return trackMap
}
```


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ESPECIFICACIÓN: PlannerToolbar
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Barra con píldoras colapsables. Cada parámetro es una píldora independiente.

```tsx
interface PlannerToolbarProps {
  config        : PlannerConfig
  columnCount   : number
  onApply       : (config: PlannerConfig, columnCount: number) => void
  visibleParams : PlannerParamKey[]   // cuáles píldoras mostrar
  minStartHour  : number
  maxEndHour    : number
  maxColumns    : number
}
```

Estado interno:
  - activeParam: PlannerParamKey | null  — cuál panel está abierto
  - draft: PlannerConfig                 — copia de trabajo (se descarta si se cierra sin aplicar)
  - draftCols: number                    — columnas en borrador

Comportamiento:
  ✓ Pulsar una píldora INACTIVA → abrir su panel, cerrar el anterior si había uno, activar estilos de la píldora
  ✓ Pulsar la píldora ACTIVA → cerrar el panel sin aplicar (descarta el borrador)
  ✓ Pulsar "Aplicar" → llamar onApply(draft, draftCols), cerrar el panel
  ✓ Al abrir un panel: inicializar el borrador con los valores actuales
  ✓ Cada píldora muestra el valor actual formateado (ej: "7:00 AM", "30 min", "3")
  ✓ Panel se anima con max-height transition (0 → valor fijo) vía CSS
  ✓ Panel muestra SOLO el control del parámetro activo (los otros están presentes en el DOM pero con display:none para no reflowear)
  ✓ Si visibleParams está vacío: no renderizar nada (return null)
  ✓ Si un PlannerParamKey no está en visibleParams: no renderizar esa píldora

Cada píldora tiene:
  - Ícono (usar Icon atom):
      startHour   → 'clock'
      endHour     → 'clock'  (diferenciado con texto)
      granularity → 'adjustments-horizontal' o similar
      columns     → 'layout-columns' o similar
  - Label fijo ("Inicio", "Fin", "Granularidad", "Columnas")
  - Valor actual formateado:
      startHour   → formatTime(config.startHour, 0)      ej: "7:00 AM"
      endHour     → formatTime(config.endHour, 0)        ej: "6:00 PM"
      granularity → `${config.granularity} min`
      columns     → `${columnCount}`

Panel expandible:
  - Aparece debajo de las píldoras
  - Borde, border-radius, fondo var(--color-bg-subtle)
  - Dentro: solo el control del parámetro activo + botón "Aplicar"
  - Controles:
      startHour   → <Select> con opciones del minStartHour al endHour-1 (en pasos de 1h)
      endHour     → <Select> con opciones del startHour+1 al maxEndHour (en pasos de 1h)
      granularity → <Select> con opciones [15, 30, 60] (etiquetas "15 min", etc.)
      columns     → <Input type="number"> min=1 max={maxColumns}
  ✓ Usar átomos Select e Input de la biblioteca (src/atoms/)

CSS del toolbar:
  - Wrapper: display flex, align-items center, gap var(--space-2), flex-wrap wrap, padding-bottom var(--space-3)
  - Píldora base: display inline-flex, align-items center, gap var(--space-1), padding var(--space-1) var(--space-3), border-radius var(--radius-full), border 1px solid var(--color-border-strong), cursor pointer, font-size var(--font-size-xs), transition var(--transition-fast)
  - Píldora default: bg var(--color-bg), color var(--color-text-secondary)
  - Píldora hover: bg var(--color-bg-subtle)
  - Píldora activa: bg var(--color-primary-50), border-color var(--color-primary-300), color var(--color-primary-700)
  - Panel: overflow hidden, transition max-height 220ms ease, opacity 180ms ease
  - Panel cerrado: max-height 0, opacity 0, pointer-events none
  - Panel abierto: max-height 160px, opacity 1, pointer-events auto
  - Panel interior: display flex, flex-wrap wrap, align-items flex-end, gap var(--space-3), padding var(--space-3), border-radius var(--radius-md), border 1px solid var(--color-border), bg var(--color-bg-subtle), margin-bottom var(--space-3)
  - @media (prefers-reduced-motion: reduce): transition none en panel y píldoras


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ESPECIFICACIÓN: PlannerTimeline
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```tsx
interface PlannerTimelineProps {
  config     : PlannerConfig
  slotHeight : number
}
```

Renderiza una lista de slots verticales, cada uno con su etiqueta de hora.

Comportamiento:
  ✓ Un <div> por cada slot (calcSlotCount(config) slots en total)
  ✓ Slots de hora en punto (minutos === 0): etiqueta visible + clase "major"
  ✓ Slots intermedios:
      granularity=15 → mostrar ":15", ":30", ":45" en texto pequeño
      granularity=30 → mostrar ":30" en texto muy pequeño
      granularity=60 → sin etiqueta intermedia
  ✓ La etiqueta se alinea al top-right del slot (marca el inicio del intervalo)
  ✓ Slot major tiene fondo ligeramente diferente (var(--color-bg-subtle))

CSS:
  - Wrapper: width 64px, flex-shrink 0, border-right 1px solid var(--color-border-strong), background var(--color-bg), position sticky, left 0, z-index 5
  - Slot: height = slotHeight, display flex, align-items flex-start, justify-content flex-end, padding 4px 8px 0 0, border-bottom 1px solid var(--color-border)
  - Slot major: background var(--color-bg-subtle)
  - Etiqueta: font-size var(--font-size-xs), color var(--color-text-muted), white-space nowrap
  - Etiqueta major: color var(--color-text-secondary), font-weight var(--font-weight-medium)


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ESPECIFICACIÓN: PlannerColumn
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```tsx
interface PlannerColumnProps<TCol, TEvent> {
  column            : PlannerColumn<TCol>
  events            : PlannerEvent<TEvent>[]     // solo los de esta columna
  config            : PlannerConfig
  slotHeight        : number
  renderColumnHeader: (col: PlannerColumn<TCol>, index: number) => React.ReactNode
  renderEventCard   : (event: PlannerEvent<TEvent>) => React.ReactNode
  index             : number
  onEventClick     ?: (event: PlannerEvent<TEvent>) => void
  onSlotClick      ?: (columnId: string, startMin: number) => void
}
```

Estructura interna:
  - El componente renderiza SOLO el cuerpo de la columna (no el header — ese va en PlannerGrid)
  - Un <div> por cada slot (fila de fondo), aplicando clase "major" para horas en punto
  - Los eventos se posicionan con position:absolute sobre las filas de fondo
  - Usar calcEventPosition() y groupOverlappingEvents() de plannerUtils

Superposición de eventos (overlapping):
  ✓ Llamar groupOverlappingEvents(events) para obtener el track de cada evento
  ✓ Si el evento está en track 0 y no hay overlapping: ocupa el 100% del ancho (left 4px, right 4px)
  ✓ Si hay overlapping: dividir el ancho entre los tracks presentes en ese bloque de tiempo
      - track 0: left 4px, right 50%+2px
      - track 1: left 50%+2px, right 4px
      - track 2+: dividir en tercios, etc.
  ✓ El card del evento se renderiza con position:absolute, usando top y height de calcEventPosition()
  ✓ Clic en slot vacío → onSlotClick(column.id, startMin calculado desde el click Y)
  ✓ Clic en evento → onEventClick(event) + stopPropagation para no disparar onSlotClick

Wrapper del card de evento:
  <div
    role="button"
    tabIndex={0}
    aria-label={`Evento: ${formatEventRange(event, config)}`}
    onClick={() => onEventClick?.(event)}
    onKeyDown={(e) => (e.key==='Enter'||e.key===' ') && onEventClick?.(event)}
    style={{ position:'absolute', top, height, left, right, background: event.color }}
    className={styles.eventWrapper}
  >
    {renderEventCard(event)}   ← render prop del consumidor
  </div>

CSS de la columna:
  - Wrapper: flex 1, position relative, border-right 1px solid var(--color-border)
  - Última columna: border-right none
  - Fila de fondo: height = slotHeight, border-bottom 1px solid var(--color-border), width 100%
  - Fila major: background color-mix(in srgb, var(--color-bg-subtle) 50%, transparent)
  - Evento wrapper: position absolute, border-radius var(--radius-md), overflow hidden, cursor pointer, transition var(--transition-fast) (para hover)
  - Evento wrapper hover: filter brightness(0.95)
  - Evento wrapper focus-visible: outline 2px solid var(--color-primary-500), outline-offset 1px


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ESPECIFICACIÓN: PlannerGrid
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```tsx
interface PlannerGridProps<TCol, TEvent> {
  columns           : PlannerColumn<TCol>[]
  events            : PlannerEvent<TEvent>[]
  config            : PlannerConfig
  slotHeight        : number
  renderColumnHeader: (col: PlannerColumn<TCol>, index: number) => React.ReactNode
  renderEventCard   : (event: PlannerEvent<TEvent>) => React.ReactNode
  onEventClick     ?: (event: PlannerEvent<TEvent>) => void
  onSlotClick      ?: (columnId: string, startMin: number) => void
}
```

Estructura:
  - Header row fijo (sticky top:0, z-index 10):
      - Corner cell (64px, igual que el ancho del timeline) — esquina superior izquierda, vacía o con label "Hora"
      - Una celda de header por columna → renderColumnHeader(col, index) dentro de un wrapper con border-right
  - Body scrollable:
      - PlannerTimeline a la izquierda
      - Una PlannerColumn por cada columna, recibiendo solo los events de esa columna:
          events.filter(e => e.columnId === col.id)

CSS del grid:
  - Wrapper: border 1px solid var(--color-border-strong), border-radius var(--radius-lg), overflow hidden, background var(--color-bg)
  - Header row: display flex, border-bottom 1px solid var(--color-border-strong), background var(--color-bg-subtle), position sticky, top 0, z-index 10
  - Corner: width 64px, flex-shrink 0, height 52px, border-right 1px solid var(--color-border-strong), display flex, align-items center, justify-content center
  - Header cell: flex 1, height 52px, border-right 1px solid var(--color-border), overflow hidden
  - Header cell última: border-right none
  - Body: display flex, overflow-y auto, max-height 520px
  - Columns area: display flex, flex 1


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ESPECIFICACIÓN: Planner.tsx (raíz)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Orquesta PlannerToolbar + PlannerGrid. Maneja el estado de columnas visible.

```tsx
export function Planner<TCol = unknown, TEvent = unknown>({
  config: configProp,
  onConfigChange,
  columns,
  events,
  renderColumnHeader,
  renderEventCard,
  visibleParams = ['startHour', 'endHour', 'granularity', 'columns'],
  minStartHour  = 0,
  maxEndHour    = 23,
  maxColumns    = 10,
  onEventClick,
  onSlotClick,
  onEventMove,
  onEventResize,
  loading = false,
  className,
}: PlannerProps<TCol, TEvent>) {

  const [config, setConfig]     = useState<PlannerConfig>(configProp)
  const [colCount, setColCount] = useState<number>(columns.length)

  // Sync si el padre cambia configProp desde fuera
  useEffect(() => { setConfig(configProp) }, [configProp])

  const handleApply = (newConfig: PlannerConfig, newColCount: number) => {
    setConfig(newConfig)
    setColCount(newColCount)
    onConfigChange?.(newConfig)
  }

  const slotHeight = config.slotHeight ?? 48
  const visibleColumns = columns.slice(0, colCount)

  return (
    <div className={clsx(styles.root, className)}>
      {visibleParams.length > 0 && (
        <PlannerToolbar
          config={config}
          columnCount={colCount}
          onApply={handleApply}
          visibleParams={visibleParams}
          minStartHour={minStartHour}
          maxEndHour={maxEndHour}
          maxColumns={maxColumns}
        />
      )}
      {loading ? (
        <div className={styles.loadingOverlay}>
          <Spinner size="lg" label="Cargando planner..." />
        </div>
      ) : (
        <PlannerGrid
          columns={visibleColumns}
          events={events}
          config={config}
          slotHeight={slotHeight}
          renderColumnHeader={renderColumnHeader}
          renderEventCard={renderEventCard}
          onEventClick={onEventClick}
          onSlotClick={onSlotClick}
        />
      )}
    </div>
  )
}
```

CSS del root:
  - display flex, flex-direction column
  - Sin margin externo
  - Loading overlay: display flex, align-items center, justify-content center, min-height 200px, border 1px solid var(--color-border), border-radius var(--radius-lg)


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ESPECIFICACIÓN: Planner.stories.tsx
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

title: 'Organisms/Planner' · tags: ['autodocs']

Tipos de columna y evento para los stories:
```ts
type SalaMeta  = { nombre: string; piso: string; capacidad: number }
type EventMeta = { titulo: string; responsable: string; tipo: 'reunión'|'taller'|'capacitación' }
```

Datos mock (usar en todos los stories):
```ts
const mockColumns: PlannerColumn<SalaMeta>[] = [
  { id:'sala-a', meta:{ nombre:'Sala A', piso:'Piso 3', capacidad:20 } },
  { id:'sala-b', meta:{ nombre:'Sala B', piso:'Piso 1', capacidad:8  } },
  { id:'sala-c', meta:{ nombre:'Sala C', piso:'Piso 2', capacidad:30 } },
  { id:'sala-d', meta:{ nombre:'Sala D', piso:'Piso 4', capacidad:12 } },
]

const mockEvents: PlannerEvent<EventMeta>[] = [
  { id:'e1', columnId:'sala-a', startMin:60,  durationMin:90,  color:'#B5D4F4',
    meta:{ titulo:'Kick-off Q3',      responsable:'Ana Torres',   tipo:'reunión'      } },
  { id:'e2', columnId:'sala-a', startMin:180, durationMin:60,  color:'#B5D4F4',
    meta:{ titulo:'Demo cliente',     responsable:'Carlos Ruiz',  tipo:'reunión'      } },
  { id:'e3', columnId:'sala-b', startMin:30,  durationMin:120, color:'#CECBF6',
    meta:{ titulo:'Sprint planning',  responsable:'Equipo Dev',   tipo:'reunión'      } },
  { id:'e4', columnId:'sala-b', startMin:210, durationMin:60,  color:'#CECBF6',
    meta:{ titulo:'1:1 CTO',          responsable:'Luis Mendoza', tipo:'reunión'      } },
  { id:'e5', columnId:'sala-c', startMin:0,   durationMin:150, color:'#9FE1CB',
    meta:{ titulo:'Onboarding nuevos',responsable:'RRHH',         tipo:'capacitación' } },
  { id:'e6', columnId:'sala-c', startMin:210, durationMin:45,  color:'#9FE1CB',
    meta:{ titulo:'Retrospectiva',    responsable:'Scrum Master',  tipo:'reunión'     } },
  { id:'e7', columnId:'sala-a', startMin:90,  durationMin:60,  color:'#F5C4B3',
    meta:{ titulo:'Overlap test',     responsable:'QA Team',      tipo:'reunión'      } },
  { id:'e8', columnId:'sala-d', startMin:60,  durationMin:180, color:'#FAC775',
    meta:{ titulo:'Workshop diseño',  responsable:'UX Team',      tipo:'taller'       } },
]
```

Render props reutilizables en los stories:
```tsx
const renderHeader = (col: PlannerColumn<SalaMeta>) => (
  <div style={{ padding:'6px 10px' }}>
    <Badge variant="primary" size="sm">{col.meta.nombre}</Badge>
    <Typography variant="body-sm" style={{ marginTop:2 }}>{col.meta.piso}</Typography>
    <Typography variant="caption" color="secondary">Cap. {col.meta.capacidad}</Typography>
  </div>
)

const renderEvent = (ev: PlannerEvent<EventMeta>) => (
  <div style={{ padding:'5px 8px', height:'100%', display:'flex', flexDirection:'column', gap:2 }}>
    <Typography variant="body-sm" truncate style={{ fontWeight:500 }}>
      {ev.meta.titulo}
    </Typography>
    <Typography variant="caption" color="secondary">{ev.meta.responsable}</Typography>
    <Badge variant={ev.meta.tipo==='taller'?'warning':ev.meta.tipo==='capacitación'?'success':'primary'} size="sm">
      {ev.meta.tipo}
    </Badge>
  </div>
)
```

Stories requeridas:

  1. Default
     config: { startHour:7, endHour:18, granularity:30 }
     columns: mockColumns.slice(0,3), events: mockEvents
     Todas las píldoras visibles

  2. AllParams — todas las columnas y todas las píldoras
     config: { startHour:8, endHour:17, granularity:15 }
     columns: mockColumns, events: mockEvents
     maxColumns: 4

  3. HiddenParams — sin toolbar
     visibleParams: []
     config fijo, sin posibilidad de cambiar desde UI

  4. PartialParams — solo granularity y columns visibles
     visibleParams: ['granularity', 'columns']

  5. Granularity15min
     config: { startHour:9, endHour:12, granularity:15 }
     Para mostrar la densidad de la línea de tiempo con slots pequeños

  6. Granularity60min
     config: { startHour:7, endHour:18, granularity:60 }

  7. OverlappingEvents — columnas con eventos que se superponen
     Solo sala-a con e1, e7 (se superponen en startMin:60-150 y 90-150)
     columns: [mockColumns[0]], events: [mockEvents[0], mockEvents[6]]

  8. Loading
     loading: true

  9. SingleColumn
     columns: [mockColumns[0]], events: mockEvents.filter(e=>e.columnId==='sala-a')

  Decorator para todas las stories:
  ```tsx
  decorators: [(Story) => (
    <div style={{ padding:'16px', background:'var(--color-bg-subtle)', minHeight:'600px' }}>
      <Story />
    </div>
  )]
  ```


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ESPECIFICACIÓN: index.ts
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```ts
export { Planner } from './Planner'
export type {
  PlannerProps,
  PlannerConfig,
  PlannerColumn,
  PlannerEvent,
  PlannerGranularity,
  PlannerParamKey,
} from './Planner'
export {
  calcSlotCount,
  calcEventPosition,
  pxToMinutes,
  formatTime,
  formatEventRange,
  eventsOverlap,
  groupOverlappingEvents,
} from './plannerUtils'
```


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PASO FINAL — Actualizar barrel y verificar
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Añadir a @src/index.ts en la sección de organismos:

  export * from './organisms/Planner'

Luego ejecutar:
  npx tsc --noEmit

Reportar en formato:
  ✓ plannerUtils.ts          — funciones puras · sin errores TS
  ✓ PlannerTimeline          — 2 archivos · sin errores TS
  ✓ PlannerColumn            — 2 archivos · sin errores TS
  ✓ PlannerGrid              — 2 archivos · sin errores TS
  ✓ PlannerToolbar           — 2 archivos · sin errores TS
  ✓ Planner (raíz)           — 2 archivos · sin errores TS
  ✓ index.ts                 — barrel correcto
  ✓ Planner.stories.tsx      — 9 stories · sin errores TS
  ────────────────────────────────────────────────────────────
  Total: 11 archivos | Errores TypeScript: 0


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## REGLAS GLOBALES — NUNCA ROMPER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ARQUITECTURA
  ✓ Sub-componentes internos (PlannerTimeline, etc.) NO se exportan desde index.ts
    Solo Planner y los tipos públicos son parte de la API externa
  ✓ plannerUtils.ts SÍ se exporta (utilidades reutilizables)
  ✓ El Planner NO importa otros organismos
  ✓ Sin fetch, sin axios, sin estado global
  ✗ Sin margin externo en el wrapper raíz

POSICIONAMIENTO
  ✓ Los eventos se posicionan con position:absolute sobre filas de fondo
  ✓ La columna body tiene position:relative y min-height = slots * slotHeight
  ✓ Nunca position:fixed — rompe el iframe del entorno de desarrollo

ESTILOS
  ✓ Solo CSS Modules + var(--token) de tokens.css
  ✓ Nunca valores en duro: color:#2563eb → var(--color-primary-600)
  ✓ event.color es un valor CSS libre del consumidor — aplicar via style inline
    (no via className, porque no conocemos el valor en build time)
  ✓ @media (prefers-reduced-motion: reduce) en todas las transiciones

TYPESCRIPT
  ✓ Generics <TCol, TEvent> en Planner, PlannerGrid y PlannerColumn
  ✓ plannerUtils.ts usa PlannerEvent<unknown> y PlannerConfig (no any)
  ✓ Exportar todos los tipos desde index.ts
  ✗ Prohibido any

ACCESIBILIDAD
  ✓ Eventos: role="button", tabIndex=0, aria-label con rango de tiempo, onKeyDown
  ✓ Slots vacíos: si onSlotClick existe → el slot es clicable con role="button"
  ✓ Timeline: aria-hidden="true" (decorativo, la información está en los eventos)
  ✓ Panel del toolbar: aria-expanded en la píldora activa

ANTI-PATRONES
  ✗ style={{ marginTop:'16px' }} en el wrapper raíz
  ✗ Importar PlannerColumn desde './PlannerColumn/PlannerColumn' — solo './PlannerColumn'
  ✗ Calcular posición de eventos con strings de template literal de px — usar la función calcEventPosition()
  ✗ Hardcodear colores de eventos — vienen del prop event.color
  ✗ Stories sin el decorator de padding/fondo
  ✗ console.log en el código de producción
