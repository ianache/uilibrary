# Task 3: Pantallas y Flujos de Demostración - Parte B (PG-04 a PG-06)

**Files:**
- Create: `src/pages/ProfilePage/*` (ProfilePage.tsx, ProfilePage.stories.tsx, index.ts)
- Create: `src/pages/SettingsPage/*` (SettingsPage.tsx, SettingsPage.stories.tsx, index.ts)
- Create: `src/pages/NotFoundPage/*` (NotFoundPage.tsx, NotFoundPage.stories.tsx, index.ts)

**Interfaces:**
- Consumes: Templates (DetailLayout, BlankLayout), Organisms, Atoms, Molecules
- Produces: `ProfilePage`, `SettingsPage`, `NotFoundPage`

## Acceptance Criteria & Specs

### ProfilePage (PG-04)
- Template used: `DetailLayout` (TM-04)
- Profile details card (metaPanel, right slot): Large Avatar (xl), user name, active role Badge, location description,Joined date info, and full-width edit button opening the Modal dialog.
- Main tabs list content (left slot):
  - "Actividad": lists 5 recent history actions (e.g. "Publicó reporte de ventas", "Editó perfil"). Each item has Icon, text and timestamp.
  - "Proyectos": grid of Cards displaying active user projects with description and ProgressBar status.
  - "Configuración": displays FormFields edit boxes (visual details without remote post).
- Interactivity: Click edit opens `Modal` containing profile text boxes. Saving triggers 1s loading state and closes Modal.

### SettingsPage (PG-05)
- Template used: `DetailLayout` (TM-04, metaPanel omitted, maxWidth=800)
- Settings tabs menu:
  - "Perfil": Card with FormFields (name, email, bio Textarea, avatar upload FileUpload).
  - "Seguridad": Card showing change password fields and two-factor authentication (2FA) Checkbox.
  - "Notificaciones": Card with RadioGroup (frecuencia) and Checkbox list toggles.
  - "Apariencia": Card with RadioGroup choice (claro / oscuro / sistema).
- Interactivity: Click save shows saving=true delay for 1s, then saving=false and saving success Notification message (toast alert) for 3s.

### NotFoundPage (PG-06)
- Template used: `BlankLayout` (TM-05, centered=true)
- 404 details: Large "404" heading text, circle question mark icon illustration, "Página no encontrada" h3 title, description details, return buttons to Home page or back to previous page.
- Styling: flex column, text-align center, maxWidth 480px, gap var(--space-4). The "404" has `font-size: 8rem`, `font-weight: 700`, `line-height: 1`.

## Steps
1. Create `src/pages/ProfilePage/` files.
2. Create `src/pages/SettingsPage/` files.
3. Create `src/pages/NotFoundPage/` files.
4. Verify type check: `npx tsc --noEmit`.
5. Commit: `git add src/pages/ProfilePage/ src/pages/SettingsPage/ src/pages/NotFoundPage/ ; git commit -m "feat: add ProfilePage, SettingsPage, and NotFoundPage screen demos"`
