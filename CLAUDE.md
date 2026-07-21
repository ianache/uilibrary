# UIComponentLibrary — Contexto para Claude Code

## Qué es este proyecto
Biblioteca de componentes React reutilizables construida con **Atomic Design**.
Cada componente se clasifica en: Atoms → Molecules → Organisms → Templates → Pages.

## Stack
- React 18 · TypeScript 5 · Vite 5
- CSS Modules (`.module.css`) — sin Tailwind, sin styled-components
- clsx para composición de clases
- Storybook 8 para catálogo visual

## Comandos frecuentes
```bash
npm run dev            # servidor de desarrollo
npm run storybook      # catálogo en localhost:6006
npm run build          # compila la biblioteca a dist/
npx tsc --noEmit       # verificar tipos sin compilar
```

## Estructura de src/
```
src/
├── tokens/      ← design tokens (tokens.css + index.ts)
├── atoms/       ← elementos indivisibles (Button, Input, Icon…)
├── molecules/   ← combinaciones de átomos (SearchBar, FormField…)
├── organisms/   ← secciones completas (Header, Sidebar…)
├── templates/   ← layouts con slots
├── pages/       ← instancias con datos reales
└── index.ts     ← barrel export de toda la biblioteca
```

## Reglas de código — SIEMPRE aplicar

### Estilos
- Solo CSS Modules. Nunca estilos inline. Nunca Tailwind.
- Solo variables CSS de `tokens.css`. Nunca valores en duro.
  ✓ `var(--color-primary-600)` ✗ `#2563eb`
  ✓ `var(--space-4)` ✗ `16px`

### Atomic Design
- Los átomos NO importan otros átomos.
- Los átomos NO tienen margin externo (el padre controla el espaciado).
- Los átomos NO conectan con estado global ni APIs.

### TypeScript
- Props extienden el tipo HTML nativo correspondiente.
- Variantes = union types, nunca `string` genérico.
- Exportar siempre los tipos junto al componente.
- Prohibido `any`.

### Accesibilidad
- Labels siempre con htmlFor/id asociado.
- aria-invalid en campos con error.
- aria-busy en botones con loading.
- Íconos decorativos: aria-hidden="true".

### Cada componente nuevo necesita:
1. `Componente.tsx` — lógica y tipos
2. `Componente.module.css` — estilos con tokens
3. `Componente.stories.tsx` — stories de Storybook
4. `index.ts` — barrel export

## Archivos que NO tocar
- `src/tokens/tokens.css` — solo modificar si se añaden tokens nuevos
- `dist/` — generado automáticamente
- `.storybook/` — solo modificar si hay cambios de configuración global

## Convención de nombres
- Componentes: PascalCase (`UserCard`, `SearchBar`)
- Archivos CSS: mismo nombre + `.module.css`
- Stories: mismo nombre + `.stories.tsx`
- Tipos exportados: `NombreProps`, `NombreVariant`, `NombreSize`
