# Task 4: Advanced Form & Collection Fields (TagInput & AvatarGroup)

**Files:**
- Create: `src/molecules/TagInput/*` (TagInput.tsx, TagInput.module.css, TagInput.stories.tsx, index.ts)
- Create: `src/molecules/AvatarGroup/*` (AvatarGroup.tsx, AvatarGroup.module.css, AvatarGroup.stories.tsx, index.ts)
- Modify: `src/index.ts` (export TagInput, AvatarGroup)

**Interfaces:**
- Consumes: `clsx`, `src/tokens/tokens.css`, `Input` (atom), `Tag` (atom), `Icon` (atom), `Avatar` (atom), `Typography` (atom)
- Produces: `TagInput`, `TagInputProps`, `AvatarGroup`, `AvatarGroupProps`

## Acceptance Criteria & Specs

### TagInput (ML-07)
- Props: `value: string[]` (controlled), `onChange: (tags: string[]) => void`, `placeholder?: string` (default: 'Añadir etiqueta...'), `maxTags?: number`, `disabled?: boolean` (default: false), `error?: string`, `label?: string`, `tagVariant?: TagVariant` (default: 'primary'), `allowDuplicates?: boolean` (default: false). Extends `Omit<React.HTMLAttributes<HTMLDivElement>, 'value' | 'onChange'>`.
- Layout: Wrapper acts like a unified field. Clicking anywhere on the wrapper container sets focus to the inner `<input>` element. Focus-within highlights wrapper container with focus-visible primary ring.
- Input behavior:
  - Adding tag: Pressing `Enter` or `,` (comma) adds the trimmed non-empty input value as a new tag, triggers `onChange([...value, newTag])` and clears the input.
  - Deleting tag: Pressing `Backspace` when the input is empty removes the last tag in the list, triggering `onChange(value.slice(0, -1))`.
  - Duplicates: If `allowDuplicates` is false, ignore and don't add tags that already exist in the list.
  - Limit: If `maxTags` is defined and `value.length >= maxTags`, disable the input element internally (and change placeholder or disable typing) but keep existing tags removable.
- Rendering tags: Render each tag inside the wrapper using the `Tag` atom, set `removable={true}`, and wire `onRemove` to trigger removal of that tag.
- `margin: 0` on root.

### AvatarGroup (ML-08)
- Props: `users: Array<{ name: string; avatarSrc?: string; id: string }>`, `max?: number` (default: 4), `size?: 'xs' | 'sm' | 'md' | 'lg'` (default: 'sm'), `onClick?: () => void`. Extends `React.HTMLAttributes<HTMLDivElement>`.
- Accessibility: Contenedor with `aria-label="N miembros del equipo"` (or similar dynamic count label).
- Overlap layout: Avatares superpuestos in row-reverse order (`flex-direction: row-reverse` in CSS layout) to display natural Solapado. Overlap negative margin-left based on size:
  - `xs`: -6px
  - `sm`: -8px
  - `md`: -10px
  - `lg`: -12px
- Border separation: Each Avatar gets a 2px border matching the background color (`var(--color-bg)`) to separate Solapados visually.
- Overflow slot: If `users.length > max`, render the first `max` avatares and the last slot shows a text badge "+N" (e.g. `+3`) styled with background `var(--color-bg-muted)` (or neutral light) and text color secondary.
- Interactive styling: If `onClick` is provided, add cursor pointer, roving hover effect (e.g. scale(1.05) or translate) and raise the hovered avatar z-index dynamically.
- `margin: 0` on root.

## Steps
1. Create `src/molecules/TagInput/` files.
2. Create `src/molecules/AvatarGroup/` files.
3. Export them in `src/index.ts`.
4. Verify type check: `npx tsc --noEmit`.
5. Commit: `git add src/molecules/TagInput/ src/molecules/AvatarGroup/ src/index.ts ; git commit -m "feat: add TagInput and AvatarGroup molecules"`
