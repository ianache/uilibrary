# Task 3 Execution Report: Structure & Addon Input Controls (Breadcrumb & InputGroup)

## Executive Summary
Task 3 has been completed successfully. The `Breadcrumb` (ML-05) and `InputGroup` (ML-06) molecules have been fully implemented with complete design token styling, accessibility attributes, Storybook stories, and public API exports in `src/index.ts`. All TypeScript type checks and git commits passed cleanly.

---

## Deliverables & Changes

### 1. Breadcrumb Component (`src/molecules/Breadcrumb/`)
- **Files Created**:
  - [Breadcrumb.tsx](file:///D:/02-PERSONAL/01-PROJECTS/30-UIComponentLibrary/src/molecules/Breadcrumb/Breadcrumb.tsx)
  - [Breadcrumb.module.css](file:///D:/02-PERSONAL/01-PROJECTS/30-UIComponentLibrary/src/molecules/Breadcrumb/Breadcrumb.module.css)
  - [Breadcrumb.stories.tsx](file:///D:/02-PERSONAL/01-PROJECTS/30-UIComponentLibrary/src/molecules/Breadcrumb/Breadcrumb.stories.tsx)
  - [index.ts](file:///D:/02-PERSONAL/01-PROJECTS/30-UIComponentLibrary/src/molecules/Breadcrumb/index.ts)
- **Key Features**:
  - Full prop support: `items: Array<{ label: string; href?: string; onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void }>`, `separator?: 'chevron' | 'slash'`, `maxItems?: number`.
  - **Accessibility**: Renders semantic `<nav aria-label="Migas de pan"><ol>...</ol></nav>` structure with item elements inside `<li>`.
  - **Active Item**: Last item is highlighted with `aria-current="page"`, primary text color (`var(--color-text-primary)`), and non-clickable.
  - **Interactive Links & Buttons**: Non-last items render `<a>` if `href` is supplied, `<button type="button">` if `onClick` is supplied, with hover underline effects and secondary text color.
  - **Collapsing Logic**: When `maxItems` is specified and `items.length > maxItems`, middle items collapse into a `...` ellipsis button. Clicking `...` expands to display all items (`aria-label="Mostrar todas las páginas"`).
  - **Separators**: Supports `'chevron'` (default, using `Icon` atom `chevron-right` with size `xs`) and `'slash'` (`/` text character with muted color).

### 2. InputGroup Component (`src/molecules/InputGroup/`)
- **Files Created**:
  - [InputGroup.tsx](file:///D:/02-PERSONAL/01-PROJECTS/30-UIComponentLibrary/src/molecules/InputGroup/InputGroup.tsx)
  - [InputGroup.module.css](file:///D:/02-PERSONAL/01-PROJECTS/30-UIComponentLibrary/src/molecules/InputGroup/InputGroup.module.css)
  - [InputGroup.stories.tsx](file:///D:/02-PERSONAL/01-PROJECTS/30-UIComponentLibrary/src/molecules/InputGroup/InputGroup.stories.tsx)
  - [index.ts](file:///D:/02-PERSONAL/01-PROJECTS/30-UIComponentLibrary/src/molecules/InputGroup/index.ts)
- **Key Features**:
  - Full prop support: `inputProps`, `addonLeft`, `addonRight`, `buttonLeft`, `buttonRight`, `size` ('sm' | 'md' | 'lg').
  - **Unified Border & Focus-Within Ring**: Single wrapper container with border `var(--color-border-strong)` and border-radius `var(--radius-md)`. Focus-within (`:focus-within`) on the wrapper activates `border-color: var(--color-primary-600)` and `box-shadow: 0 0 0 3px var(--color-primary-100)`.
  - **Inner Input Stripping**: Nested `Input` atom styling (border, radius, background, box-shadow) is stripped so the wrapper handles the main container borders and focus states cleanly.
  - **Addons**: Handles text (`string`) or custom `ReactNode` addons on left and right, styled with `var(--color-bg-muted)` and matching inner borders.
  - **Action Buttons**: Integrates left/right action buttons using `Button` atom with customized inner border-radius rules for seamless edge connection.
  - **Labels & Validation**: Outer wrapper elevates `inputProps.label` and `inputProps.error`/`inputProps.hint` to wrap the group seamlessly.

### 3. Public API Exports
- Updated [src/index.ts](file:///D:/02-PERSONAL/01-PROJECTS/30-UIComponentLibrary/src/index.ts) to export `Breadcrumb` and `InputGroup` molecules.

---

## Verification & Build Summary

1. **TypeScript Type Check**:
   - Command: `npx tsc --noEmit`
   - Result: Passed with **0 errors**.

2. **Git Commit**:
   - Command: `git add src/molecules/Breadcrumb/ src/molecules/InputGroup/ src/index.ts ; git commit -m "feat: add Breadcrumb and InputGroup molecules"`
   - Commit SHA: `06884d8`
   - Files committed: 9 files (+746 lines).

---

## Concerns & Recommendations
- **None**: All criteria and visual specifications have been met cleanly without issues.

---

## Code Review Fixes (Post-Review Updates)

### 1. `InputGroup.tsx` Accessibility & ID Wiring
- **Hook & ID Generation**: Imported `useId` from `react` and generated `defaultId = useId()`.
- **Input ID Resolution**: Resolved `inputId = inputProps.id || defaultId`, ensuring `<label htmlFor={inputId}>` and `<Input id={inputId}>` match even when no custom ID is provided in `inputProps`.
- **DescribedBy & Validation Wiring**:
  - `errorId = ${inputId}-error` attached to `<p id={errorId} role="alert">`.
  - `hintId = ${inputId}-hint` attached to `<p id={hintId}>`.
  - `describedBy` resolved dynamically (`errorId` if error present, `hintId` if hint present without error).
  - Passed `aria-invalid={error ? true : undefined}` and `aria-describedby={describedBy || undefined}` to nested `<Input>`.

### 2. `Breadcrumb.tsx` Dynamic `aria-expanded`
- Updated ellipsis button in `Breadcrumb.tsx` to set `aria-expanded={isExpanded}` dynamically instead of hardcoded `false`.

### Verification & Commit
- `npx tsc --noEmit`: Passed with 0 errors.
- `npm run build`: Vite build & tsc production build passed cleanly.
- Git Commit: `15a5c3c` (`fix(accessibility): resolve Task 3 code review feedback for InputGroup and Breadcrumb`).

