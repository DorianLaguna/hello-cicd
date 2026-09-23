# hello-cicd

Proyecto de práctica para aprender CI/CD desde cero con GitHub Actions.
Es una API mínima en Express con dos endpoints (`/health` y `/add`), tests
con Jest, lint con ESLint, y un pipeline que corre todo eso automático en
cada push.

## Correrlo localmente

```bash
npm install
npm run lint
npm test
npm start        # levanta en http://localhost:3000
```

## Qué hace el pipeline (`.github/workflows/ci.yml`)

| Job | Qué valida | Concepto que enseña |
|---|---|---|
| `lint` | Que el código pase las reglas de ESLint | Un job simple, un `step` a la vez |
| `test` | Que los tests de Jest pasen | Jobs corriendo en paralelo (no dependen entre sí) |
| `build-and-push` | Construye la imagen Docker y la sube a GHCR | **CD real**: `needs`, condicionales (`if`), permisos, secrets automáticos |

Los tres corren en `ubuntu-latest`, que consume minutos gratis de tu cuota
de GitHub (no como macOS) — así que puedes hacer push todas las veces que
quieras sin preocuparte por facturación.

## Cómo subirlo y verlo correr

```bash
cd hello-cicd
git init
git add .
git commit -m "proyecto inicial"
git branch -M main
git remote add origin https://github.com/<tu-usuario>/hello-cicd.git
git push -u origin main
```

Crea antes el repo vacío en GitHub (sin README, sin .gitignore — ya
tienes los tuyos). En cuanto hagas push, ve a la pestaña **Actions** del
repo y verás el pipeline corriendo en vivo.

## Ejercicios para romperlo a propósito

1. **Rompe el lint**: agrega una variable sin usar en `src/index.js` y
   haz push. Verás fallar el job `lint` antes de que corran los otros.
2. **Rompe un test**: cambia `add(a, b) { return a + b; }` por
   `return a - b;` y haz push. Verás fallar `test`, y `build-and-push`
   nunca arranca (`needs: [lint, test]`).
3. **Verifica el CD**: arregla todo, push a `main`, y cuando el pipeline
   termine ve a la pestaña **Packages** de tu perfil de GitHub — ahí vas
   a ver la imagen Docker que el pipeline publicó solo.
4. **Ábrelo como Pull Request** en vez de push directo a `main`: crea una
   rama, cambia algo, abre un PR. Verás que `lint` y `test` corren igual,
   pero `build-and-push` no (por el `if` que solo permite push a `main`) —
   así es como se protege producción de cambios no revisados.
