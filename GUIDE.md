# Guía de Publicación, Pruebas, Distribución y Consumo de Componentes

Esta guía detalla el ciclo de vida completo de la librería de componentes **`30-uicomponentlibrary`** (organizada bajo **Atomic Design**), abarcando desde su compilación y publicación hasta su uso e integración en proyectos **React**, **Vue 3** y **Angular**.

---

## 1. 🛠️ Compilación y Distribución

La librería está configurada con **Vite (Modo Librería)** y **TypeScript** para generar artefactos optimizados en formatos **ESM** (`dist/index.mjs`) y **CommonJS** (`dist/index.js`), junto con las definiciones de tipos (`dist/*.d.ts`).

### Compilar la librería
```bash
npm run build
```

### Configuración del `package.json` para distribución
```json
{
  "name": "@ianache/uilibrary",
  "version": "1.0.0",
  "main": "dist/index.js",
  "module": "dist/index.mjs",
  "types": "dist/index.d.ts",
  "files": [
    "dist"
  ]
}
```

### Publicación en Registros NPM / GitHub Packages
```bash
# 1. Login en el registro (NPM o GitHub Packages)
npm login

# 2. Publicar paquete público
npm publish --access public
```

---

## 2. 🧪 Pruebas Locales antes de Publicar

### Opción A: Probar con `npm pack` (Recomendado)
Genera un archivo empaquetado (`.tgz`) idéntico al que se descargará desde NPM:

```bash
npm pack
# Genera un archivo tipo: ianache-uilibrary-1.0.0.tgz
```

En el proyecto cliente (React / Vue / Angular):
```bash
npm install /ruta/a/ianache-uilibrary-1.0.0.tgz
```

### Opción B: Probar con `npm link`
```bash
# En el directorio de la librería de componentes:
npm link

# En el proyecto cliente:
npm link @ianache/uilibrary
```

---

## 3. ⚛️ Consumo en Aplicaciones React

Al estar construida nativamente en React y TypeScript, la integración es directa con soporte de autocompletado y validación de tipos.

### Instalación
```bash
npm install @ianache/uilibrary
```

### Uso de Componentes (Atoms, Molecules, Organisms, Templates)
```tsx
import React from 'react';
import { Button, FormField, LoginForm, DashboardLayout } from '@ianache/uilibrary';

export const App = () => {
  return (
    <DashboardLayout headerTitle="Mi Aplicación React">
      <div style={{ padding: '20px' }}>
        <Button label="Click Aquí" variant="primary" onClick={() => alert('Hola!')} />
        
        <FormField label="Correo Electrónico" placeholder="usuario@empresa.com" />
        
        <LoginForm onSubmit={(data) => console.log('Login:', data)} />
      </div>
    </DashboardLayout>
  );
};
```

---

## 4. 🟢 Consumo en Aplicaciones Vue 3

Para consumir componentes React en **Vue 3**, la mejor práctica es utilizar el paquete [`veaury`](https://github.com/kalacloud/veaury) o utilizar `applyReactInVue`.

### Instalación en el proyecto Vue
```bash
npm install @ianache/uilibrary react react-dom veaury
```

### Integración usando `applyReactInVue`
```vue
<!-- src/components/ReactButton.vue -->
<template>
  <div>
    <ButtonVue :label="buttonText" variant="primary" @click="handleClick" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { applyReactInVue } from 'veaury';
import { Button } from '@ianache/uilibrary';

// Envolver el componente React para Vue 3
const ButtonVue = applyReactInVue(Button);

const buttonText = ref('Botón desde Vue');

const handleClick = () => {
  console.log('Evento click capturado en Vue');
};
</script>
```

---

## 5. 🅰️ Consumo en Aplicaciones Angular

En **Angular (v14+)**, se pueden renderizar componentes de React mediante un contenedor React (`ReactDOM.createRoot`) encapsulado en una **Directiva** o **Componente Wrapper** de Angular.

### Instalación en el proyecto Angular
```bash
npm install @ianache/uilibrary react react-dom @types/react @types/react-dom
```

### Crear un Wrapper Component en Angular
```typescript
// react-wrapper.component.ts
import { Component, ElementRef, Input, OnChanges, OnDestroy, ViewChild } from '@angular/core';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Button, LoginForm } from '@ianache/uilibrary';

@Component({
  selector: 'app-react-login',
  template: `<div #reactContainer></div>`,
  standalone: true
})
export class ReactLoginComponent implements OnChanges, OnDestroy {
  @ViewChild('reactContainer', { static: true }) containerRef!: ElementRef;
  @Input() title: string = 'Login desde Angular';

  private root?: ReactDOM.Root;

  ngOnChanges(): void {
    this.render();
  }

  private render(): void {
    if (!this.root && this.containerRef) {
      this.root = ReactDOM.createRoot(this.containerRef.nativeElement);
    }

    this.root?.render(
      React.createElement(LoginForm, {
        title: this.title,
        onSubmit: (data: any) => console.log('Login recibido en Angular:', data)
      })
    );
  }

  ngOnDestroy(): void {
    this.root?.unmount();
  }
}
```

### Uso en la plantilla de Angular
```html
<!-- app.component.html -->
<app-react-login title="Inicia Sesión en Angular"></app-react-login>
```

---

## 6. 📊 Resumen de Comandos Principales

| Comando | Descripción |
| :--- | :--- |
| `npm run build` | Compila los componentes produciendo bundles ESM/CJS y tipos `.d.ts`. |
| `npm run storybook` | Inicia el entorno de desarrollo visual interactivo de Storybook. |
| `npm run build-storybook` | Genera la versión estática desplegable de Storybook. |
| `npm pack` | Empaqueta la librería localmente para pruebas de integración. |
| `npm publish` | Publica la versión actual en el registro NPM especificado. |
