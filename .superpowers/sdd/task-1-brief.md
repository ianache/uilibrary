# Task 1: Phase 0 - Foundation: Tokens, Dependencies & Cleanup

**Files:**
- Create: `src/tokens/tokens.css`
- Create: `src/tokens/index.ts`
- Modify: `package.json`
- Delete: `src/components/` (legacy directory)

**Interfaces:**
- Consumes: None
- Produces: CSS custom properties (`--color-*`, `--space-*`, `--radius-*`, `--font-*`, `--transition-*`) and TS token constants in `src/tokens/index.ts`.

## Steps
1. Install `clsx` dependency via `npm install clsx`.
2. Create `src/tokens/tokens.css` with all specified variables.
3. Create `src/tokens/index.ts` with `as const` tokens object exporting `./tokens.css`.
4. Delete legacy `src/components/` folder.
5. Verify type check with `npx tsc --noEmit`.
6. Commit changes: `git add package.json package-lock.json src/tokens/ ; git commit -m "chore: setup tokens system and install clsx"`
