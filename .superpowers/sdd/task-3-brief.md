# Task 3: Structure & Addon Input Controls (Breadcrumb & InputGroup)

**Files:**
- Create: `src/molecules/Breadcrumb/*` (Breadcrumb.tsx, Breadcrumb.module.css, Breadcrumb.stories.tsx, index.ts)
- Create: `src/molecules/InputGroup/*` (InputGroup.tsx, InputGroup.module.css, InputGroup.stories.tsx, index.ts)
- Modify: `src/index.ts` (export Breadcrumb, InputGroup)

**Interfaces:**
- Consumes: `clsx`, `src/tokens/tokens.css`, `Icon` (atom), `Typography` (atom), `Input` (atom), `Button` (atom)
- Produces: `Breadcrumb`, `BreadcrumbProps`, `InputGroup`, `InputGroupProps`

## Acceptance Criteria & Specs

### Breadcrumb (ML-05)
- Props: `items: Array<{ label: string; href?: string; onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void }>`, `separator?: 'chevron' | 'slash'` (default: 'chevron'), `maxItems?: number`. Extends `React.HTMLAttributes<HTMLElement>`.
- Accessibility: Renders `<nav aria-label="Migas de pan"><ol>...</ol></nav>`. Semantically structured list items.
- Item rendering:
  - If it's the last item: Not clickable, text variant `primary` (using Typography variant='body-sm' or caption/body), `aria-current="page"`.
  - Otherwise: Clickable link (`href` as `<a>` or `onClick` as a generic button style `<a>` with `role="button"`), text color secondary/muted, hover turns to primary with underline.
- Collapsing: If `maxItems` is provided and `items.length > maxItems`, collapse items from the middle (excluding first, last, and last-1 items if possible). The collapsed slot shows a `...` separator button or text. If clicked, it could show the full path or remain as a simple separator. Let's make it a plain text/button "..." that can toggle showing all items (or just remain collapsed). Rendering `first, '...', last-2, last-1, last` is standard.
- Separators:
  - `chevron` -> `Icon` name="chevron-right" size="xs" (12px size, `aria-hidden="true"`).
  - `slash` -> text character "/" with color secondary.
- `margin: 0` on root.

### InputGroup (ML-06)
- Props: `inputProps: InputProps` (all props of Input atom except `prefix`/`suffix`), `addonLeft?: string | React.ReactNode`, `addonRight?: string | React.ReactNode`, `buttonLeft?: { label: string; onClick: () => void; icon?: IconName }`, `buttonRight?: { label: string; onClick: () => void; icon?: IconName }`, `size?: 'sm' | 'md' | 'lg'` (default: 'md'). Extends `React.HTMLAttributes<HTMLDivElement>`.
- Visual layout: Flex container wrapper with border `var(--color-border-strong)`, border-radius `var(--radius-md)`. Focus-within (`:focus-within`) on the wrapper activates the primary focus shadow ring: `box-shadow: 0 0 0 3px var(--color-primary-100)`.
- Input atom rendered inside: No border, no box-shadow, no border-radius.
- Addons: If `addonLeft`/`addonRight` are string, wrap in Typography and style with background `var(--color-bg-muted)` and shared border. If ReactNode, render directly.
- Buttons: Left/right buttons rendered with custom style to remove border-radius on the side touching the input.
- `margin: 0` on root.

## Steps
1. Create `src/molecules/Breadcrumb/` files.
2. Create `src/molecules/InputGroup/` files.
3. Export them in `src/index.ts`.
4. Verify type check: `npx tsc --noEmit`.
5. Commit: `git add src/molecules/Breadcrumb/ src/molecules/InputGroup/ src/index.ts ; git commit -m "feat: add Breadcrumb and InputGroup molecules"`
