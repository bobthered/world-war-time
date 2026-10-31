# world-war-time

A PC isometric RPG prototype with a shared, procedurally generated starting world and persistent local player timelines.

The server supplies immutable quadrant recipes and assets. Gameplay and player saves remain on the client.

## Project layout

- `backend/`: SvelteKit management application and world/content API. See its README for setup.
- `game/`: planned Godot game client.
- `frontend/`: planned public website and content submissions.

See `AGENTS.md` for project requirements and architectural decisions.
