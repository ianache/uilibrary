# Capa de Moléculas Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement full atomic design MOLECULES layer (12 components) for `UIComponentLibrary` following strict WCAG 2.1 AA, CSS Modules, forwardRef, and Storybook 8 rules.

**Architecture:** Implement each molecule in `src/molecules/<NombreMolecula>/` with exactly 4 files (`.tsx`, `.module.css`, `.stories.tsx`, `index.ts`), using `clsx` and strict TypeScript types. Atoms must be imported only from their respective barrel folders (e.g. `../atoms/Button`). Re-export everything in `src/index.ts`.

**Tech Stack:** React 18, TypeScript 5, Vite 5, CSS Modules, clsx, Storybook 8.

## Global Constraints
- Framework: React 18, TypeScript 5, Vite 5
- Styles: CSS Modules (`.module.css`) only, no inline styles, no Tailwind
- Design Tokens: Use `var(--token-name)` from `src/tokens/tokens.css` exclusively
- Atomic Design: Molecules import atoms from `../atoms/*` barrels. Molecules DO NOT import other molecules, DO NOT have external margin, DO NOT connect to global state.
- Form components must support refs.
- WCAG 2.1 AA required for all interactive elements.

---

### Task 1: Core Form Molecules (SearchBar & FormField)

**Files:**
- Create: `src/molecules/SearchBar/SearchBar.tsx`
- Create: `src/molecules/SearchBar/SearchBar.module.css`
- Create: `src/molecules/SearchBar/SearchBar.stories.tsx`
- Create: `src/molecules/SearchBar/index.ts`
- Create: `src/molecules/FormField/FormField.tsx`
- Create: `src/molecules/FormField/FormField.module.css`
- Create: `src/molecules/FormField/FormField.stories.tsx`
- Create: `src/molecules/FormField/index.ts`

**Interfaces:**
- Consumes: `clsx`, `src/tokens/tokens.css`, `Button` (atom), `Input` (atom), `Icon` (atom)
- Produces: `SearchBar`, `SearchBarProps`, `FormField`, `FormFieldProps`

- [ ] **Step 1: Create `src/molecules/SearchBar` files**

Write `src/molecules/SearchBar/SearchBar.module.css`:
```css
.search {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  margin: 0;
  width: 100%;
}

.inputWrapper {
  flex: 1;
}

.button {
  flex-shrink: 0;
}
```

Write `src/molecules/SearchBar/SearchBar.tsx`:
```typescript
import React, { useState, forwardRef, useEffect } from 'react';
import clsx from 'clsx';
import { Input } from '../../atoms/Input';
import { Button } from '../../atoms/Button';
import { Icon } from '../../atoms/Icon';
import styles from './SearchBar.module.css';

export interface SearchBarProps {
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onSearch?: (query: string) => void;
  onChange?: (value: string) => void;
  loading?: boolean;
  disabled?: boolean;
  showButton?: boolean;
  buttonLabel?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(({
  placeholder = 'Buscar...',
  value,
  defaultValue = '',
  onSearch,
  onChange,
  loading = false,
  disabled = false,
  showButton = true,
  buttonLabel = 'Buscar',
  size = 'md',
  className,
}, ref) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(isControlled ? value : defaultValue);

  useEffect(() => {
    if (isControlled) {
      setInternalValue(value);
    }
  }, [value, isControlled]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!isControlled) {
      setInternalValue(val);
    }
    onChange?.(val);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch?.(internalValue);
    } else if (e.key === 'Escape') {
      if (!isControlled) {
        setInternalValue('');
      }
      onChange?.('');
    }
  };

  const handleButtonClick = () => {
    onSearch?.(internalValue);
  };

  return (
    <div role="search" aria-label="Barra de búsqueda" className={clsx(styles.search, className)}>
      <Input
        ref={ref}
        type="text"
        placeholder={placeholder}
        value={internalValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        disabled={disabled || loading}
        prefix={<Icon name="search" size={size === 'lg' ? 'lg' : size === 'sm' ? 'sm' : 'md'} />}
        className={styles.inputWrapper}
      />
      {showButton && (
        <Button
          type="button"
          size={size}
          loading={loading}
          disabled={disabled}
          onClick={handleButtonClick}
          className={styles.button}
        >
          {buttonLabel}
        </Button>
      )}
    </div>
  );
});

SearchBar.displayName = 'SearchBar';
```

Write `src/molecules/SearchBar/SearchBar.stories.tsx` and `src/molecules/SearchBar/index.ts`.

- [ ] **Step 2: Create `src/molecules/FormField` files**

Write `src/molecules/FormField/FormField.module.css`:
```css
.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  margin: 0;
  width: 100%;
}

.labelWrapper {
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.asterisk {
  color: var(--color-danger-600);
}
```

Write `src/molecules/FormField/FormField.tsx`:
```typescript
import React, { useId } from 'react';
import clsx from 'clsx';
import { Typography } from '../../atoms/Typography';
import styles from './FormField.module.css';

export interface FormFieldProps {
  label: string;
  htmlFor?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactElement;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  htmlFor,
  required = false,
  error,
  hint,
  children,
  className,
}) => {
  const defaultId = useId();
  const targetId = htmlFor || defaultId;
  const errorId = `${targetId}-error`;
  const hintId = `${targetId}-hint`;

  let describedBy = '';
  if (error) describedBy = errorId;
  else if (hint) describedBy = hintId;

  const child = React.Children.only(children);
  const clonedChild = React.cloneElement(child, {
    id: child.props.id || targetId,
    'aria-describedby': clsx(child.props['aria-describedby'], describedBy) || undefined,
    error: child.props.error || error,
  });

  return (
    <div className={clsx(styles.field, className)}>
      <div className={styles.labelWrapper}>
        <Typography variant="body" as="label" htmlFor={targetId} color="primary">
          {label}
        </Typography>
        {required && (
          <span className={styles.asterisk} aria-hidden="true">
            *
          </span>
        )}
      </div>
      {clonedChild}
      {error ? (
        <Typography id={errorId} variant="caption" color="danger" role="alert">
          {error}
        </Typography>
      ) : hint ? (
        <Typography id={hintId} variant="caption" color="muted">
          {hint}
        </Typography>
      ) : null}
    </div>
  );
};

FormField.displayName = 'FormField';
```

Write `src/molecules/FormField/FormField.stories.tsx` and `src/molecules/FormField/index.ts`.

- [ ] **Step 3: Run type check**

Run: `npx tsc --noEmit`
Expected: PASS

- [ ] **Step 4: Commit Task 1**

```bash
git add src/molecules/SearchBar/ src/molecules/FormField/
git commit -m "feat: add SearchBar and FormField molecules"
```

---

### Task 2: Display & Information Molecules (UserCard & Notification)

**Files:**
- Create: `src/molecules/UserCard/*` (4 files)
- Create: `src/molecules/Notification/*` (4 files)

**Interfaces:**
- Consumes: `clsx`, `src/tokens/tokens.css`, `Avatar` (atom), `Typography` (atom), `Badge` (atom), `Icon` (atom), `Button` (atom)
- Produces: `UserCard`, `UserCardProps`, `Notification`, `NotificationProps`

- [ ] **Step 1: Create `src/molecules/UserCard` files**
Includes initials fallback (first letter of first and last name), status to badge mapping, interactive click triggers with Space/Enter, selected state wrapper.

- [ ] **Step 2: Create `src/molecules/Notification` files**
Inline feedback. Icon aligned-self: flex-start, title/message, dismissible button × upper right, action button inline.

- [ ] **Step 3: Run type check**

Run: `npx tsc --noEmit`
Expected: PASS

- [ ] **Step 4: Commit Task 2**

```bash
git add src/molecules/UserCard/ src/molecules/Notification/
git commit -m "feat: add UserCard and Notification molecules"
```

---

### Task 3: Structure & Addon Input Controls (Breadcrumb & InputGroup)

**Files:**
- Create: `src/molecules/Breadcrumb/*` (4 files)
- Create: `src/molecules/InputGroup/*` (4 files)

**Interfaces:**
- Consumes: `clsx`, `src/tokens/tokens.css`, `Icon` (atom), `Typography` (atom), `Input` (atom), `Button` (atom)
- Produces: `Breadcrumb`, `BreadcrumbProps`, `InputGroup`, `InputGroupProps`

- [ ] **Step 1: Create `src/molecules/Breadcrumb` files**
Ordered list hierarchy `<nav><ol>`. Last item non-clickable with `aria-current="page"`. Supports `maxItems` collapsing middle nodes with `...`.

- [ ] **Step 2: Create `src/molecules/InputGroup` files**
Borders on wrapper, focus-within ring. Input inside borderless/radius-0 at touchpoints. Supports addons (text/icon) or button left/right.

- [ ] **Step 3: Run type check**

Run: `npx tsc --noEmit`
Expected: PASS

- [ ] **Step 4: Commit Task 3**

```bash
git add src/molecules/Breadcrumb/ src/molecules/InputGroup/
git commit -m "feat: add Breadcrumb and InputGroup molecules"
```

---

### Task 4: Advanced Form & Collection Fields (TagInput & AvatarGroup)

**Files:**
- Create: `src/molecules/TagInput/*` (4 files)
- Create: `src/molecules/AvatarGroup/*` (4 files)

**Interfaces:**
- Consumes: `clsx`, `src/tokens/tokens.css`, `Input` (atom), `Tag` (atom), `Icon` (atom), `Avatar` (atom), `Typography` (atom)
- Produces: `TagInput`, `TagInputProps`, `AvatarGroup`, `AvatarGroupProps`

- [ ] **Step 1: Create `src/molecules/TagInput` files**
Wraps list of tags and an input in one unified container. Pressing Enter/comma adds tag, Backspace deletes last. Supports maxTags, allowDuplicates.

- [ ] **Step 2: Create `src/molecules/AvatarGroup` files**
solapados, direction row-reverse. Overlap negative margin based on size. Last slot displays "+N" if users exceed max limit.

- [ ] **Step 3: Run type check**

Run: `npx tsc --noEmit`
Expected: PASS

- [ ] **Step 4: Commit Task 4**

```bash
git add src/molecules/TagInput/ src/molecules/AvatarGroup/
git commit -m "feat: add TagInput and AvatarGroup molecules"
```

---

### Task 5: Status Indicators & Dynamic UI (ProgressBar & Tooltip)

**Files:**
- Create: `src/molecules/ProgressBar/*` (4 files)
- Create: `src/molecules/Tooltip/*` (4 files)

**Interfaces:**
- Consumes: `clsx`, `src/tokens/tokens.css`, `Typography` (atom)
- Produces: `ProgressBar`, `ProgressBarProps`, `Tooltip`, `TooltipProps`

- [ ] **Step 1: Create `src/molecules/ProgressBar` files**
Dynamic width fill. Supports progressbar accessibility rules. striped, animated keyframes backgrounds.

- [ ] **Step 2: Create `src/molecules/Tooltip` files**
Pure CSS floating tooltip. trigger relative, tooltip absolute. invisible by default, visible on `:hover` and `:focus-within`. Flex positioning directions (`top`, `bottom`, `left`, `right`) and CSS border-tricks arrow.

- [ ] **Step 3: Run type check**

Run: `npx tsc --noEmit`
Expected: PASS

- [ ] **Step 4: Commit Task 5**

```bash
git add src/molecules/ProgressBar/ src/molecules/Tooltip/
git commit -m "feat: add ProgressBar and Tooltip molecules"
```

---

### Task 6: Advanced Form Interactivity & Final Integration (RadioGroup & FileUpload)

**Files:**
- Create: `src/molecules/RadioGroup/*` (4 files)
- Create: `src/molecules/FileUpload/*` (4 files)
- Modify: `src/index.ts`

**Interfaces:**
- Consumes: `clsx`, `src/tokens/tokens.css`, `Typography` (atom), `Icon` (atom), `Button` (atom), `Spinner` (atom), `Divider` (atom)
- Produces: `RadioGroup`, `RadioGroupProps`, `FileUpload`, `FileUploadProps`, full library exports.

- [ ] **Step 1: Create `src/molecules/RadioGroup` files**
Group level fieldset/legend, roving tabindex keyboard arrow navigation (Up/Down, Left/Right). Option card vs default variants.

- [ ] **Step 2: Create `src/molecules/FileUpload` files**
Drag and Drop drag-over styles, drop validation logic (accept, maxSize, maxFiles). Native file picker binding. Display selected list, file delete button, size formatting helper.

- [ ] **Step 3: Update `src/index.ts` barrel file**
Add exports for all 12 molecules.

- [ ] **Step 4: Run full project type check and build**

Run: `npx tsc --noEmit && npm run build`
Expected: 0 errors, successful compilation.

- [ ] **Step 5: Commit Task 6**

```bash
git add src/molecules/RadioGroup/ src/molecules/FileUpload/ src/index.ts
git commit -m "feat: add RadioGroup and FileUpload molecules and update barrel export"
```
