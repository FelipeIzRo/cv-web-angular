# Configuración con NgModules

Este proyecto ha sido adaptado para funcionar con NgModules (en lugar de la configuración standalone).

## Cambios realizados

- Se creó `src/app/app.module.ts` con:
  - `BrowserModule` y `RouterModule.forRoot(routes)` en `imports`.
  - `AppComponent` en `declarations` y `bootstrap`.
- Se actualizó `src/main.ts` para usar `platformBrowserDynamic().bootstrapModule(AppModule, { ngZoneEventCoalescing: true })`.
- Se simplificó `src/app/app.component.ts` eliminando `imports: [RouterOutlet]`; ahora `RouterOutlet` lo provee `RouterModule` desde el módulo.
- Se añadió explícitamente `standalone: false` en `src/app/app.component.ts` para asegurar que el componente raíz esté gestionado por `NgModule` y evitar conflictos con configuraciones previas standalone.
- Se mantienen las rutas en `src/app/app.routes.ts` (puedes seguir editando ahí). El archivo `src/app/app.config.ts` ya no se usa.

## Estructura clave

- `src/app/app.module.ts`: módulo raíz de la aplicación.
- `src/app/app.routes.ts`: definición del arreglo de rutas `Routes` usado por `RouterModule.forRoot(...)`.
- `src/main.ts`: arranque de Angular con NgModules.

## Cómo añadir componentes con NgModules

1. Genera el componente (ejemplo):
   - `ng generate component features/mi-componente`
2. Decláralo en `AppModule` (o en un módulo de características si creas uno):
   - Abre `src/app/app.module.ts` y añádelo a `declarations`.
3. Si el componente se usa por rutas, añade la ruta en `src/app/app.routes.ts` y asegúrate de que `RouterModule.forRoot(routes)` esté en el módulo (ya lo está en `AppModule`).

## Cómo definir rutas

Edita `src/app/app.routes.ts` y añade entradas al arreglo `routes`, por ejemplo:

```ts
import { Routes } from '@angular/router';
import { MiComponenteComponent } from './features/mi-componente/mi-componente.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'inicio' },
  { path: 'inicio', component: MiComponenteComponent },
];
```

No es necesario modificar `AppModule`; ya consume `routes` con `RouterModule.forRoot(routes)`.

## Ejecutar la aplicación

- Desarrollo: `npm start` (equivale a `ng serve`).
- Build: `npm run build`.

## Notas sobre tests

Los tests generados para standalone pueden requerir ajustes. Por ejemplo, en `app.component.spec.ts` se usaba `imports: [AppComponent]`. Con NgModules puedes optar por:

- Configurar el módulo explícitamente:
  ```ts
  await TestBed.configureTestingModule({
    declarations: [AppComponent],
    imports: [RouterModule.forRoot([])],
  }).compileComponents();
  ```

o bien importar el `AppModule` completo si aplica:

```ts
await TestBed.configureTestingModule({
  imports: [AppModule],
}).compileComponents();
```

## Reversibilidad

Si deseas volver a standalone, revierte `main.ts` a `bootstrapApplication(...)` y elimina `AppModule`. Las rutas pueden seguir residiendo en `app.routes.ts` (compatibles con ambos enfoques).
