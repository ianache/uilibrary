# Task 6: Advanced Form Interactivity & Final Integration (RadioGroup & FileUpload)

**Files:**
- Create: `src/molecules/RadioGroup/*` (RadioGroup.tsx, RadioGroup.module.css, RadioGroup.stories.tsx, index.ts)
- Create: `src/molecules/FileUpload/*` (FileUpload.tsx, FileUpload.module.css, FileUpload.stories.tsx, index.ts)
- Modify: `src/index.ts` (export RadioGroup, FileUpload, check all exports are alphabetized)

**Interfaces:**
- Consumes: `clsx`, `src/tokens/tokens.css`, `Typography` (atom), `Icon` (atom), `Button` (atom), `Spinner` (atom), `Divider` (atom)
- Produces: `RadioGroup`, `RadioGroupProps`, `FileUpload`, `FileUploadProps`, full library exports.

## Acceptance Criteria & Specs

### RadioGroup (ML-11)
- Props: `options: Array<{ value: string; label: string; description?: string; disabled?: boolean }>`, `value: string` (controlled), `onChange: (value: string) => void`, `name: string` (required for accessibility), `label?: string` (legend label for whole group), `direction?: 'vertical' | 'horizontal'` (default: 'vertical'), `variant?: 'default' | 'card'` (default: 'default'), `disabled?: boolean` (default: false), `error?: string`. Extends `Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'>`.
- Keyboard accessibility:
  - Roving tabindex: Only the currently selected option (or the first non-disabled option if none selected) has `tabIndex={0}`, while other options have `tabIndex={-1}`.
  - Arrow keys: Roving focus within options. Down/Right selects next non-disabled option, Up/Left selects previous non-disabled option. Selects option automatically and calls `onChange(value)` on navigation.
- Accessibility Structure: Renders `<fieldset className={styles.fieldset}>`, `<legend className={styles.legend}>{label}</legend>` (if label exists), and container `<div role="radiogroup" aria-required={...} aria-invalid={...} aria-describedby={...}>`.
- Option rendering:
  - Invisible native `<input type="radio" name={name} value={opt.value} checked={value === opt.value} disabled={opt.disabled || disabled} ... />` for screen readers.
  - Caja visual styled next to label:
    - Default variant: 18x18px circle (`border-radius: 50%`, border 1.5px). Selected: border primary-600, inner dot 8x8px bg primary-600. Focus: ring 3px primary-100.
    - Card variant: Entire option is a card container box. Selected: border primary-400, bg primary-50.
  - Option disabled: opacity 0.45.
- `margin: 0` on root fieldset.

### FileUpload (ML-12)
- Props: `accept?: string` (e.g. 'image/*', '.pdf'), `multiple?: boolean` (default: false), `maxSize?: number` (max bytes per file), `maxFiles?: number`, `disabled?: boolean` (default: false), `loading?: boolean` (default: false), `error?: string`, `onFilesChange: (files: File[]) => void`, `label?: string` (default: 'Arrastra archivos aquí'), `sublabel?: string` (default: 'o haz clic para seleccionar'). Extends `Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>`.
- Drag and drop: Handles `onDragOver`, `onDragLeave`, `onDrop`. Drag-over activates `isDragging=true` state.
- Sizing / styling: Zone border `2px dashed var(--color-border-strong)`, `border-radius: var(--radius-lg)`, padding `var(--space-8)`, text-align center. `isDragging=true` shifts border to primary-400 and bg to primary-50, scales icon slightly.
- Validation: On file drop or selection, validates:
  - Type matching `accept` MIME types / extensions.
  - File size `<= maxSize` (if defined).
  - Total count `<= maxFiles` (if defined).
  - Valid files added, invalid files rejected with error message shown in UI (`dragError`).
- Selection click: Clicking anywhere in drag-drop zone opens native file input picker (`<input type="file" ref={fileInputRef} style={{ display: 'none' }} accept={accept} multiple={multiple} onChange={...} />`).
- Selected list: Displays uploaded files list below the zone, separated by a `Divider`. Each file item renders a row: Icon (document/file/image icon) + file name + size (formated like "1.2 MB", "45 KB", "950 B") + delete icon button `×` to remove the file.
- Loading: `loading=true` displays `Spinner` inside the zone, and disables click/drop.
- `margin: 0` on root.

## Steps
1. Create `src/molecules/RadioGroup/` files.
2. Create `src/molecules/FileUpload/` files.
3. Update `src/index.ts` with all 12 molecules and tokens system re-exports.
4. Verify type check and build: `npx tsc --noEmit && npm run build`.
5. Commit: `git add src/molecules/RadioGroup/ src/molecules/FileUpload/ src/index.ts ; git commit -m "feat: add RadioGroup and FileUpload molecules and finalize barrel export"`
