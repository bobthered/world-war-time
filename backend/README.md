# World War Time backend

SvelteKit 3 + Svelte 5 + TypeScript, npm, Sveltewind, Tailwind CSS 4, and MongoDB Atlas through Mongoose.

## Local development

Use Node 22.18 or newer (Node 22+ is required by this framework stack).

```powershell
cd backend
npm ci
# On a fresh checkout, copy the example; do not overwrite an existing .env.
Copy-Item .env.example .env
npm run dev -- --host 127.0.0.1
```

The initial setup already includes a blank, ignored `.env`. Fill in `MONGODB_URI` there with your Atlas connection string. `MONGODB_DB` defaults to `world_war_time`. Restart the server after changing configuration. Keep the connection string out of commits and client code.

The home page works without credentials. Once configured, use **Test Atlas connection** to ping Atlas. Browsing the page does not connect or write data. A configured URI is not proof of a working connection. Atlas must allow your machine's IP and the URI must use a database user with the appropriate permissions.

## Commands

```powershell
npm run check
npm test
npm run build
npm start
```

`npm start` runs the Node adapter build, loads `.env`, and binds to `127.0.0.1:3000` using the example configuration. `ORIGIN` is read at build time into SvelteKit 3's `paths.origin`; rebuild when changing it, and use that exact origin for production form submissions. Keep this unauthenticated prototype local. For development use `npm run dev`; the development origin is inferred automatically.

## Organization

- `src/lib/components/`: shared application components.
- `src/routes/`: pages and components unique to those routes.
- `src/lib/server/database.ts`: lazy, reusable Mongoose connection with bounded connection time and retry after failure.
- Future Mongoose models belong in `src/lib/server/models/`.
- `src/env.ts`: private runtime configuration; Atlas credentials are not bundled into browser code.
- `src/app.css` and the root layout: Tailwind source scanning, palettes, and Sveltewind theme.

Use `sveltewind/components` when an appropriate component is available. A native form is used for SvelteKit's `use:enhance` action, which attaches to a DOM element. Shared wrappers should add application behavior rather than duplicate library components. See [Sveltewind installation](https://sveltewind.com/getting-started/installation) and [upstream setup examples](https://github.com/sveltewind/sveltewind).

Sveltewind 4.15.0 imports `@lucide/svelte` but lists it only as a development dependency. This application installs it explicitly so the public component exports can be bundled.

## Current scope

This is the backend foundation and Atlas setup screen. Quadrant models, acquisition API, generation, asset endpoints, and the management map are still to be implemented against the shared architecture in the root AGENTS.md. No placeholder recipe has been persisted, and no generator or exact quadrant size has been selected by this setup.

Connection lifecycle tests use a mocked driver: they cover missing configuration, shared connection attempts, redacted failure/retry, and pool reuse. They do not establish Atlas connectivity, restart persistence, or world-generation correctness. A real Atlas verification awaits the connection string.

Setup verification (2026-10-31): `npm run check` passed without errors or warnings; all four `npm test` cases passed; `npm run build` succeeded. The production server started with `npm start`; an HTTP GET returned 200 with the missing-URI screen, and the same-origin connection action returned the expected 503 configuration message. The smoke-test server was stopped afterward.
