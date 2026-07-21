# Task 3: Complex Form Controls (Textarea, Select, Checkbox)

**Files:**
- Create: `src/atoms/Textarea/*` (Textarea.tsx, Textarea.module.css, Textarea.stories.tsx, index.ts)
- Create: `src/atoms/Select/*` (Select.tsx, Select.module.css, Select.stories.tsx, index.ts)
- Create: `src/atoms/Checkbox/*` (Checkbox.tsx, Checkbox.module.css, Checkbox.stories.tsx, index.ts)
- Modify: `src/index.ts` (export Textarea, Select, Checkbox)

**Interfaces:**
- Consumes: `clsx`, `src/tokens/tokens.css`
- Produces: `Textarea`, `TextareaProps`, `Select`, `SelectProps`, `SelectOption`, `Checkbox`, `CheckboxProps`

## Acceptance Criteria & Specs

### Textarea (AT-03)
- Props: `label?: string`, `error?: string`, `hint?: string`, `rows?: number` (default 4), `resize?: 'none' | 'vertical' | 'horizontal' | 'both'` (default 'vertical'), `maxLength?: number`, `showCount?: boolean` (default false). Extends `React.TextareaHTMLAttributes<HTMLTextAreaElement>`.
- `forwardRef` to `<textarea>`.
- If `showCount` + `maxLength`: display "N/MAX" right-aligned in label header. Counter turns red (`var(--color-danger-600)`) when `value.length >= maxLength`.
- Focus, error, disabled styles consistent with Input. `margin: 0`.

### Select (AT-04)
- Props: `options: Array<{ value: string; label: string; disabled?: boolean }>`, `label?: string`, `placeholder?: string`, `error?: string`, `hint?: string`. Extends `Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'>`.
- `forwardRef` to `<select>`.
- Chevron SVG inline (do NOT import Icon). `appearance: none` / `-webkit-appearance: none`.
- Wrapper with focus-within matching Input visual system.
- `margin: 0`.

### Checkbox (AT-05)
- Props: `label?: string`, `description?: string`, `error?: string`, `indeterminate?: boolean` (default false), `disabled?: boolean`. Extends `Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>`.
- Native `<input type="checkbox">` opacity:0 overlaid on 18x18px visual box for full accessibility.
- `checked`: bg & border `var(--color-primary-600)` + white checkmark via CSS.
- `indeterminate`: bg & border `var(--color-primary-600)` + white dash via CSS. Set `node.indeterminate = true` in ref callback.
- Focus-visible ring 3px primary-100. Label click triggers checkbox.
- `forwardRef` to `<input>`. `margin: 0`.

## Steps
1. Create `src/atoms/Textarea/` files.
2. Create `src/atoms/Select/` files.
3. Create `src/atoms/Checkbox/` files.
4. Export them in `src/index.ts`.
5. Verify type check: `npx tsc --noEmit`.
6. Commit: `git add src/atoms/Textarea/ src/atoms/Select/ src/atoms/Checkbox/ src/index.ts ; git commit -m "feat: add Textarea, Select, and Checkbox atoms"`
