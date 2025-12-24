# CV Web en Angular 19

Aplicación de currículum vitae online desarrollada con Angular 19. El sitio se hospeda en GitHub Pages y los datos (por ejemplo, la ficha personal) se almacenan en Firebase (Firestore) usando `@angular/fire`.

- URL pública (GitHub Pages): `https://felipeizro.github.io/cv-web-angular/`

## Presentación

Este CV web muestra información personal y de contacto consultada en tiempo real desde Firestore. La página principal (ruta `home`) consume un servicio centralizado que lee un documento de la colección de datos personales y renderiza su contenido.

## Tecnologías

- Angular 19 (componentes standalone, ruteo)
- Firebase: Firestore (datos), Auth (opcional), Analytics (opcional) vía `@angular/fire`
- GitHub Pages para hosting estático del build de producción

## Arquitectura rápida

- Bootstrap y proveedores en `src/main.ts:1` (Firestore/Auth/Analytics con `@angular/fire`).
- Servicio de datos en `src/app/services/fire-base-service/fire-base.service.ts:1` que expone `getPersonalData()` como `Observable` desde Firestore.
- En la vista principal, `src/app/components/home/home.component.ts:1` inyecta el servicio y se suscribe a los datos personales.
- Configuración de Firebase en `src/environments/environment.ts:1` y `src/environments/environment.prod.ts:1` mediante `firebaseConfig`.

## Configuración de Firebase

1. Crea un proyecto en Firebase y habilita Firestore.
2. Copia las credenciales web en:
   - `src/environments/environment.ts:1`
   - `src/environments/environment.prod.ts:1`
3. Estructura de ejemplo en Firestore (colección y documento):
   - Colección: `DATOS_PERSONALES`
   - Documento: `<ID_DOC>` con campos como `name`, `lastname`, `age`, `phone_number`.

Nota: Ajusta las reglas de seguridad de Firestore para tu caso de uso (lectura pública vs. autenticada). Si vas a permitir escritura desde la app, configura Auth y reglas apropiadas.

## Desarrollo local

Requisitos: Node 18+, Angular CLI 19.

- Instalar dependencias: `npm install`
- Servidor de desarrollo: `npm start` o `ng serve`
- Abrir en: `http://localhost:4200/`

## Build de producción

- Generar build: `npm run build`
- Salida en: `dist/cv-web-angular` (según `angular.json`)

## Despliegue en GitHub Pages

Despliegue directo con `ng deploy` (angular-cli-ghpages):

Prerequisito (ya configurado en este repo): `angular.json` incluye `architect.deploy.builder: "angular-cli-ghpages:deploy"`. Si no lo tuvieras, ejecuta: `ng add angular-cli-ghpages`.

Comandos que funcionas en este proyecto:

- `ng deploy --base-href=https://felipeizro.github.io/cv-web-angular/`
- `ng deploy --configuration=production --base-href=https://felipeizro.github.io/cv-web-angular/`

Este comando:
- Genera el build de producción con el `baseHref` correcto (`/cv-web-angular/`).
- Publica automáticamente el contenido a la rama `gh-pages` y configura GitHub Pages.

Notas:
- Si es tu primera vez, habilita GitHub Pages en el repo (Settings → Pages) apuntando a la rama `gh-pages` y carpeta raíz.
- Para un repo de usuario/organización (por ejemplo `felipeizro/felipeizro.github.io`), el `--base-href` debe ser `/`.
- Si Git no tiene configurado usuario/email global, añade `--name "Tu Nombre" --email "tu@email"`.

## Documentación adicional

- Configuración alternativa con NgModules: `documentacion/configuracion_ngModules.md:1`

## Scripts útiles

- `npm start`: servidor de desarrollo
- `npm run build`: build de producción
- `npm test`: pruebas unitarias con Karma

---

Sugerencias y mejoras son bienvenidas. Si necesitas ayuda para adaptar el contenido del CV (secciones, estilos o datos), abre un issue o crea un PR.
