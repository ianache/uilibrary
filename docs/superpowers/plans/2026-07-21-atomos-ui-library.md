# Capa de Átomos y Sistema de Tokens Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement full atomic design ATOMS layer (12 components) and Design Tokens system for `UIComponentLibrary` following strict WCAG 2.1 AA, CSS Modules, forwardRef, and Storybook 8 rules.

**Architecture:** Establish CSS Custom Properties in `src/tokens/tokens.css` and TypeScript exports in `src/tokens/index.ts`. Implement each atom in `src/atoms/<NombreAtomo>/` with exactly 4 files (`.tsx`, `.module.css`, `.stories.tsx`, `index.ts`), using `clsx` and strict TypeScript types. Re-export everything in `src/index.ts`.

**Tech Stack:** React 18, TypeScript 5, Vite 5, CSS Modules, clsx, Storybook 8.

## Global Constraints
- Framework: React 18, TypeScript 5, Vite 5
- Styles: CSS Modules (`.module.css`) only, no inline styles, no Tailwind
- Design Tokens: Use `var(--token-name)` from `src/tokens/tokens.css` exclusively
- Atomic Design: Atoms DO NOT import other atoms, DO NOT have external margin, DO NOT connect to global state
- Form components MUST use `React.forwardRef`
- WCAG 2.1 AA required for all interactive elements

---

### Task 1: Phase 0 - Foundation: Tokens, Dependencies & Cleanup

**Files:**
- Create: `src/tokens/tokens.css`
- Create: `src/tokens/index.ts`
- Modify: `package.json`
- Delete: `src/components/` (legacy directory)

**Interfaces:**
- Consumes: None
- Produces: CSS custom properties (`--color-*`, `--space-*`, `--radius-*`, `--font-*`, `--transition-*`) and TS token constants in `src/tokens/index.ts`.

- [ ] **Step 1: Install `clsx` dependency**

Run: `npm install clsx`
Expected: `clsx` added to `package.json` dependencies.

- [ ] **Step 2: Create `src/tokens/tokens.css`**

Write `src/tokens/tokens.css`:
```css
:root {
  /* Neutral Colors */
  --color-bg: #ffffff;
  --color-bg-muted: #f8fafc;
  --color-border: #e2e8f0;
  --color-border-strong: #cbd5e1;
  --color-text-primary: #0f172a;
  --color-text-secondary: #475569;
  --color-text-muted: #64748b;
  --color-text-disabled: #94a3b8;

  /* Primary Brand (Indigo/Blue) */
  --color-primary-100: #e0e7ff;
  --color-primary-200: #c7d2fe;
  --color-primary-600: #4f46e5;
  --color-primary-700: #4338ca;

  /* Status Colors */
  --color-success-100: #dcfce7;
  --color-success-600: #16a34a;
  --color-warning-100: #fef9c3;
  --color-warning-600: #ca8a04;
  --color-danger-100: #fee2e2;
  --color-danger-600: #dc2626;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;

  /* Radii */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;

  /* Typography */
  --font-sans: Inter, system-ui, -apple-system, sans-serif;
  --font-mono: 'Fira Code', monospace;

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 200ms ease-in-out;
}
```

- [ ] **Step 3: Create `src/tokens/index.ts`**

Write `src/tokens/index.ts`:
```typescript
import './tokens.css';

export const tokens = {
  colors: {
    bg: 'var(--color-bg)',
    bgMuted: 'var(--color-bg-muted)',
    border: 'var(--color-border)',
    borderStrong: 'var(--color-border-strong)',
    textPrimary: 'var(--color-text-primary)',
    textSecondary: 'var(--color-text-secondary)',
    textMuted: 'var(--color-text-muted)',
    textDisabled: 'var(--color-text-disabled)',
    primary100: 'var(--color-primary-100)',
    primary200: 'var(--color-primary-200)',
    primary600: 'var(--color-primary-600)',
    primary700: 'var(--color-primary-700)',
    success100: 'var(--color-success-100)',
    success600: 'var(--color-success-600)',
    warning100: 'var(--color-warning-100)',
    warning600: 'var(--color-warning-600)',
    danger100: 'var(--color-danger-100)',
    danger600: 'var(--color-danger-600)',
  },
  spacing: {
    1: 'var(--space-1)',
    2: 'var(--space-2)',
    3: 'var(--space-3)',
    4: 'var(--space-4)',
    6: 'var(--space-6)',
    8: 'var(--space-8)',
  },
  radii: {
    sm: 'var(--radius-sm)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
    full: 'var(--radius-full)',
  },
  fonts: {
    sans: 'var(--font-sans)',
    mono: 'var(--font-mono)',
  },
  transitions: {
    fast: 'var(--transition-fast)',
    base: 'var(--transition-base)',
  },
} as const;
```

- [ ] **Step 4: Remove legacy `src/components/` directory**

Remove legacy `src/components` directory.

- [ ] **Step 5: Verify type check passes**

Run: `npx tsc --noEmit`
Expected: PASS with no errors.

- [ ] **Step 6: Commit Task 1**

```bash
git add package.json package-lock.json src/tokens/
git commit -m "chore: setup tokens system and install clsx"
```

---

### Task 2: Core Actions & Form Inputs (Button & Input)

**Files:**
- Create: `src/atoms/Button/Button.tsx`
- Create: `src/atoms/Button/Button.module.css`
- Create: `src/atoms/Button/Button.stories.tsx`
- Create: `src/atoms/Button/index.ts`
- Create: `src/atoms/Input/Input.tsx`
- Create: `src/atoms/Input/Input.module.css`
- Create: `src/atoms/Input/Input.stories.tsx`
- Create: `src/atoms/Input/index.ts`

**Interfaces:**
- Consumes: `clsx`, `tokens.css`
- Produces: `Button`, `ButtonProps`, `ButtonVariant`, `ButtonSize`, `Input`, `InputProps`

- [ ] **Step 1: Create `src/atoms/Button` files**

Write `src/atoms/Button/Button.module.css`:
```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  font-family: var(--font-sans);
  font-weight: 500;
  cursor: pointer;
  margin: 0;
  transition: background-color var(--transition-fast), border-color var(--transition-fast), opacity var(--transition-fast);
}

.button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--color-primary-100);
}

.button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

/* Sizes */
.sm { height: 32px; padding: 0 var(--space-3); font-size: 13px; }
.md { height: 40px; padding: 0 var(--space-4); font-size: 14px; }
.lg { height: 48px; padding: 0 var(--space-6); font-size: 16px; }

/* Variants */
.primary { background-color: var(--color-primary-600); color: #ffffff; }
.primary:hover:not(:disabled) { background-color: var(--color-primary-700); }

.secondary { background-color: var(--color-bg); border-color: var(--color-border-strong); color: var(--color-text-primary); }
.secondary:hover:not(:disabled) { background-color: var(--color-bg-muted); }

.ghost { background-color: transparent; color: var(--color-text-primary); }
.ghost:hover:not(:disabled) { background-color: var(--color-bg-muted); }

.danger { background-color: var(--color-danger-600); color: #ffffff; }
.danger:hover:not(:disabled) { background-color: #b91c1c; }

.fullWidth { width: 100%; }

/* Internal Spinner CSS */
.spinner {
  width: 14px;
  height: 14px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 0.75s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

Write `src/atoms/Button/Button.tsx`:
```typescript
import React, { forwardRef } from 'react';
import clsx from 'clsx';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  children?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'secondary',
  size = 'md',
  loading = false,
  fullWidth = false,
  disabled,
  children,
  className,
  ...props
}, ref) => {
  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      disabled={isDisabled}
      aria-busy={loading ? 'true' : undefined}
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        className
      )}
      {...props}
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      {children}
    </button>
  );
});

Button.displayName = 'Button';
```

Write `src/atoms/Button/Button.stories.tsx` and `src/atoms/Button/index.ts`.

- [ ] **Step 2: Create `src/atoms/Input` files**

Write `src/atoms/Input/Input.module.css`:
```css
.container {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  margin: 0;
  width: 100%;
}

.label {
  font-family: var(--font-sans);
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-primary);
}

.wrapper {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  height: 40px;
  padding: 0 var(--space-3);
  background-color: var(--color-bg);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.wrapper:focus-within {
  border-color: var(--color-primary-600);
  box-shadow: 0 0 0 3px var(--color-primary-100);
}

.wrapper.hasError {
  border-color: var(--color-danger-600);
}

.wrapper.hasError:focus-within {
  box-shadow: 0 0 0 3px var(--color-danger-100);
}

.input {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-family: var(--font-sans);
  font-size: 14px;
  color: var(--color-text-primary);
}

.input:disabled {
  color: var(--color-text-disabled);
  cursor: not-allowed;
}

.hint {
  font-family: var(--font-sans);
  font-size: 12px;
  color: var(--color-text-muted);
}

.errorText {
  font-family: var(--font-sans);
  font-size: 12px;
  color: var(--color-danger-600);
}
```

Write `src/atoms/Input/Input.tsx`:
```typescript
import React, { forwardRef, useId } from 'react';
import clsx from 'clsx';
import styles from './Input.module.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  hint,
  prefix,
  suffix,
  id: customId,
  className,
  disabled,
  ...props
}, ref) => {
  const generatedId = useId();
  const inputId = customId || generatedId;
  const errorId = `${inputId}-error`;

  return (
    <div className={styles.container}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <div className={clsx(styles.wrapper, error && styles.hasError, className)}>
        {prefix}
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={styles.input}
          {...props}
        />
        {suffix}
      </div>
      {error ? (
        <span id={errorId} className={styles.errorText} role="alert">
          {error}
        </span>
      ) : hint ? (
        <span className={styles.hint}>{hint}</span>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';
```

Write `src/atoms/Input/Input.stories.tsx` and `src/atoms/Input/index.ts`.

- [ ] **Step 3: Run type check**

Run: `npx tsc --noEmit`
Expected: PASS

- [ ] **Step 4: Commit Task 2**

```bash
git add src/atoms/Button/ src/atoms/Input/
git commit -m "feat: add Button and Input atoms"
```

---

### Task 3: Complex Form Controls (Textarea, Select, Checkbox)

**Files:**
- Create: `src/atoms/Textarea/*` (4 files)
- Create: `src/atoms/Select/*` (4 files)
- Create: `src/atoms/Checkbox/*` (4 files)

**Interfaces:**
- Consumes: `clsx`, `tokens.css`
- Produces: `Textarea`, `Select`, `Checkbox` components and types.

- [ ] **Step 1: Create `src/atoms/Textarea` files**
Include character counter `N/MAX` when `showCount` and `maxLength` are provided.

- [ ] **Step 2: Create `src/atoms/Select` files**
Include inline SVG chevron icon, `appearance: none`, native options support.

- [ ] **Step 3: Create `src/atoms/Checkbox` files**
Hidden native input with 18x18px custom box, callback ref handling `node.indeterminate = true`.

- [ ] **Step 4: Run type check**

Run: `npx tsc --noEmit`
Expected: PASS

- [ ] **Step 5: Commit Task 3**

```bash
git add src/atoms/Textarea/ src/atoms/Select/ src/atoms/Checkbox/
git commit -m "feat: add Textarea, Select, and Checkbox atoms"
```

---

### Task 4: Graphic & Content Atoms (Icon & Typography)

**Files:**
- Create: `src/atoms/Icon/*` (4 files)
- Create: `src/atoms/Typography/*` (4 files)

**Interfaces:**
- Consumes: `clsx`, `tokens.css`
- Produces: `Icon` (with `iconPaths` catalog export), `Typography` component.

- [ ] **Step 1: Create `src/atoms/Icon` files**
SVG path dictionary for 33+ icons (navigation, actions, status, UI), `stroke="currentColor"`, safe fallback for unknown icon names.

- [ ] **Step 2: Create `src/atoms/Typography` files**
Variants `h1`-`h6`, `body-lg`, `body`, `body-sm`, `caption`, `overline`, `code`. Support `as` override and `truncate`.

- [ ] **Step 3: Run type check**

Run: `npx tsc --noEmit`
Expected: PASS

- [ ] **Step 4: Commit Task 4**

```bash
git add src/atoms/Icon/ src/atoms/Typography/
git commit -m "feat: add Icon and Typography atoms"
```

---

### Task 5: Data Display & Feedback (Badge, Tag, Avatar)

**Files:**
- Create: `src/atoms/Badge/*` (4 files)
- Create: `src/atoms/Tag/*` (4 files)
- Create: `src/atoms/Avatar/*` (4 files)

**Interfaces:**
- Consumes: `clsx`, `tokens.css`
- Produces: `Badge`, `Tag`, `Avatar` components and types.

- [ ] **Step 1: Create `src/atoms/Badge` files**
Pill badge with `var(--radius-full)`, variants (default, primary, success, warning, danger).

- [ ] **Step 2: Create `src/atoms/Tag` files**
Rectangular tag with `var(--radius-sm)`, removable `×` button with `e.stopPropagation()`.

- [ ] **Step 3: Create `src/atoms/Avatar` files**
Circular avatar (`xs`=24px to `xl`=64px). `src` renders `<img>`, fallback renders initials (max 2 chars) inside colored span. `forwardRef`.

- [ ] **Step 4: Run type check**

Run: `npx tsc --noEmit`
Expected: PASS

- [ ] **Step 5: Commit Task 5**

```bash
git add src/atoms/Badge/ src/atoms/Tag/ src/atoms/Avatar/
git commit -m "feat: add Badge, Tag, and Avatar atoms"
```

---

### Task 6: Feedback, Dividers & Barrel Export

**Files:**
- Create: `src/atoms/Spinner/*` (4 files)
- Create: `src/atoms/Divider/*` (4 files)
- Modify: `src/index.ts`

**Interfaces:**
- Consumes: All 12 atoms and tokens
- Produces: Centralized barrel export in `src/index.ts`

- [ ] **Step 1: Create `src/atoms/Spinner` files**
Accessible spinner with `role="status"`, `aria-label`, visual `.sr-only` text, and CSS `@keyframes spin`.

- [ ] **Step 2: Create `src/atoms/Divider` files**
Horizontal `<hr>` or vertical `<div>`, supporting text label with alignment (`start`, `center`, `end`).

- [ ] **Step 3: Update `src/index.ts` barrel file**

Write `src/index.ts`:
```typescript
export * from './tokens';
export * from './atoms/Avatar';
export * from './atoms/Badge';
export * from './atoms/Button';
export * from './atoms/Checkbox';
export * from './atoms/Divider';
export * from './atoms/Icon';
export * from './atoms/Input';
export * from './atoms/Select';
export * from './atoms/Spinner';
export * from './atoms/Tag';
export * from './atoms/Textarea';
export * from './atoms/Typography';
```

- [ ] **Step 4: Execute full TypeScript verification and Build check**

Run: `npx tsc --noEmit && npm run build`
Expected: 0 errors, successful build bundle in `dist/`.

- [ ] **Step 5: Commit Task 6**

```bash
git add src/atoms/Spinner/ src/atoms/Divider/ src/index.ts
git commit -m "feat: add Spinner and Divider atoms and update barrel export"
```
