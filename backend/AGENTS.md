# Backend conventions

- Read the root AGENTS.md for shared world and client/server architecture.
- This component uses SvelteKit 3, Svelte 5, TypeScript, and npm. Keep package-lock.json updated; do not introduce another package manager.
- Use MongoDB Atlas with Mongoose models. Keep connection code and models under src/lib/server/. Read credentials from private server environment variables; never expose or log the URI.
- Prefer available components imported from `sveltewind/components` over custom equivalents, including HTML primitives. Consult https://sveltewind.com and the installed package's types before using an API.
- Shared application components belong in `src/lib/components/`. Components unique to a page or route belong beside that page in `src/routes/`. Do not wrap library components without an application-specific reason.
- Keep Tailwind CSS 4 and Sveltewind palettes/source scanning in src/app.css. Initialize the Sveltewind theme in the root layout.
- Use SvelteKit 3's `#lib` imports and Svelte 5 runes. Keep database access out of browser modules.
- Management inspection must be read-only. Generation requires an explicit POST/action. Do not expose recipe edit/delete operations.
- Never overwrite existing quadrant recipes. Coordinate identity and shared boundary constraints must be protected by persistence safeguards, not merely UI conventions.
- Keep `.env` untracked; `.env.example` documents configuration without credentials. The app must start without Atlas credentials and clearly describe unavailable database operations.

## Commands (run from backend/)

- `npm ci`: install the locked dependencies.
- `npm run dev -- --host 127.0.0.1`: local development.
- `npm run check`: Svelte and TypeScript checks.
- `npm test`: automated tests.
- `npm run build`: production build.
- `npm start`: run the Node build (loads .env).

Record actual verification and any unavailable Atlas integration checks in the handoff. Do not claim database persistence was tested using mocks alone.
