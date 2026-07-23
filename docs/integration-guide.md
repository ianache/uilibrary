# Guía de Integración: @ianache/ui-library

Esta biblioteca de componentes está construida con **React 18 + TypeScript + CSS Modules** y se distribuye como un paquete npm compilado en formato ESM y CommonJS con tipos TypeScript.

---

## 1. Instalación en cualquier proyecto

```bash
npm install @ianache/ui-library react react-dom
```

---

## 2. Importación de Estilos CSS

Para que los componentes muestren sus tokens de color, tipografía y CSS Modules, importa el archivo CSS global en el punto de entrada de tu aplicación:

```ts
// En tu entry point (index.ts, main.ts, main.js, app.module.ts, etc.)
import '@ianache/ui-library/dist/30-uicomponentlibrary.css';
```

---

## 3. Uso en React / Next.js / Vite React

Importación directa de componentes y layouts:

```tsx
import React from 'react';
import { Button, Card, DashboardLayout, Header, Sidebar } from '@ianache/ui-library';

export function App() {
  return (
    <DashboardLayout
      header={<Header title="Mi Aplicación" />}
      sidebar={<Sidebar navItems={[]} />}
    >
      <Card title="Bienvenido">
        <Button variant="primary" onClick={() => alert('Hola')}>
          Click aquí
        </Button>
      </Card>
    </DashboardLayout>
  );
}
```

---

## 4. Uso en Vue 3

En proyectos Vue 3 (Vite o Vue CLI), se puede integrar de dos formas:

### Opción A: Con `veaury` (Recomendado)
Instala `veaury`:
```bash
npm install veaury
```

En tu componente `.vue`:
```vue
<script setup>
import { applyReactComponent } from 'veaury';
import { Button as ReactButton, Card as ReactCard } from '@ianache/ui-library';

const Button = applyReactComponent(ReactButton);
const Card = applyReactComponent(ReactCard);
</script>

<template>
  <div>
    <Card title="Componente React en Vue 3">
      <Button variant="primary" @click="handleClick">
        Botón impulsado por React
      </Button>
    </Card>
  </div>
</template>
```

---

## 5. Uso en Angular 15+

En Angular, se puede envolver cualquier componente React en un componente contenedor o directiva Angular utilizando `ReactDOM.createRoot`.

### Ejemplo: Componente Wrapper Angular (`react-button.component.ts`)

```typescript
import { Component, ElementRef, Input, Output, EventEmitter, OnChanges, OnDestroy, ViewChild } from '@angular/core';
import createRoot from 'react-dom/client';
import React from 'react';
import { Button } from '@ianache/ui-library';

@Component({
  selector: 'app-react-button',
  standalone: true,
  template: `<div #container></div>`
})
export class ReactButtonComponent implements OnChanges, OnDestroy {
  @ViewChild('container', { static: true }) containerRef!: ElementRef;

  @Input() variant: 'primary' | 'secondary' | 'ghost' | 'danger' = 'primary';
  @Input() label: string = '';
  @Output() onClick = new EventEmitter<Event>();

  private root: any = null;

  ngOnChanges(): void {
    this.render();
  }

  private render(): void {
    if (!this.root && this.containerRef) {
      this.root = (createRoot as any).createRoot(this.containerRef.nativeElement);
    }

    if (this.root) {
      this.root.render(
        React.createElement(Button, {
          variant: this.variant,
          onClick: (e: any) => this.onClick.emit(e)
        }, this.label)
      );
    }
  }

  ngOnDestroy(): void {
    if (this.root) {
      this.root.unmount();
    }
  }
}
```

### Uso en plantilla Angular (`app.component.html`):
```html
<app-react-button 
  variant="primary" 
  label="Guardar Cambios" 
  (onClick)="handleSave()">
</app-react-button>
```

---

## 6. Comandos para Publicar en NPM

Para publicar este paquete en el registro oficial de NPM:

1. **Iniciar sesión en NPM**:
   ```bash
   npm login
   ```

2. **Probar empaquetado (opcional)**:
   ```bash
   npm pack
   ```

3. **Publicar el paquete en NPM público**:
   ```bash
   npm publish --access public
   ```

---

## 7. Publicación en GitHub Packages (`npm.pkg.github.com`)

Si prefieres publicar la librería directamente dentro de GitHub (GitHub Packages) de forma privada o pública vinculada a tu cuenta de GitHub:

### A. Autenticarse en GitHub Packages
Genera un **Personal Access Token (classic)** en GitHub con permiso `write:packages`. Luego ejecuta:

```bash
npm login --scope=@ianache --registry=https://npm.pkg.github.com
```
* **Username**: `ianache`
* **Password**: Tu GitHub Personal Access Token (PAT)

### B. Publicar en GitHub Packages
```bash
npm publish
```

### C. Para que otros proyectos consuman el paquete desde GitHub Packages
En los proyectos que consuman la librería (Angular, Vue, React), crea un archivo `.npmrc` en la raíz con:

```ini
@ianache:registry=https://npm.pkg.github.com
```

Y luego instala normalmente:
```bash
npm install @ianache/ui-library
```

