# World War Time — project instructions

## Scope and workflow

- This repository is the project root. Keep game, backend, and public website work here, not in a temporary chat workspace.
- Preserve the distinction between agreed requirements and proposals below. Do not treat an earlier assistant suggestion as user approval.
- Work on the task requested. Creating these instructions does not authorize scaffolding or implementing the prototype.
- Keep the initial project small: one developer/player, local gameplay, and server-provided world content. Do not introduce multiplayer infrastructure or server gameplay simulation.
- Read relevant nested AGENTS.md files before editing a subdirectory. Keep shared architecture rules here and component-specific commands and conventions in those files. Do not duplicate this entire document in each component.
- Verify behavior appropriate to each change and report what was actually tested. For world generation, prioritize boundary continuity, immutable recipes, persistence, offline play, and repeatable initial layouts.

## Game concept

- PC isometric action RPG with Zelda-like fighting mechanics; detailed combat design is still open.
- Windows is the primary platform; macOS and Linux are desirable secondary targets.
- The provided demo screenshots establish the elevated camera angle, not a required art style.
- Rendering remains open: 2D, sprite-based 2.5D, or a hybrid/3D implementation. Do not commit to an asset style based on those screenshots.
- Gameplay occurs on essentially one ground plane, with possible gentle hills. No overlapping floors, bridges with traversal underneath, cliffs, or second floors are currently planned.
- The world expands indefinitely through discovery. Co-op is a future possibility, not initial scope.

## World addressing and acquisition

- Address quadrants using a uniform two-dimensional integer X/Y grid, including negative coordinates.
- Target approximately half a mile by half a mile per quadrant. An exact internal size such as 800 meters is still a proposal.
- On entering a quadrant, ensure its centered 3x3 neighborhood is available locally.
- Request only missing definitions/assets. The server looks up those quadrants and creates any that have never been seeded.
- Server generation is triggered for missing members of the requested neighborhood, even if the player never physically enters them.
- Persist successfully acquired content locally. Previously acquired quadrants do not require periodic refresh or repeated server fetching during normal play.
- Offline, fully acquired areas remain playable. Restrict access to areas whose recipes or required assets are unavailable until they can be fetched.
- Interrupted acquisition can retry; it must not replace an existing server recipe or lose a player's saved state.
- Large server quadrants may be subdivided into smaller client rendering/simulation chunks. Acquisition does not require simulating all nine quadrants at once.

## Immutable recipes and personal timelines

- Once a quadrant is initially generated on the server, its recipe is permanent and must never be silently regenerated, reseeded, or overwritten.
- The client generates a playthrough's local instance from the initial recipe. All subsequent gameplay and state persist on the client.
- Each playthrough branches into its own timeline: actions, defeated enemies, inventory, quests, and environmental changes do not modify another player's instance or the shared server recipe.
- Preserve acquired player areas across game and content updates. New generation strategies apply to ungenerated areas, not existing recipes or local instances.
- Use sufficient recipe/schema/generator and asset identity information to interpret immutable content correctly after updates. This is compatibility bookkeeping, not an ongoing synchronization system.
- Important generated objects need stable identities so saved changes continue to refer to the same objects.
- Do not replace a locally modified quadrant by fetching its initial server state again.
- The proposed acquisition-time branch point is receipt through the 3x3 neighborhood; confirm the distinction from first physical entry if a feature depends on it.

## Generation and biomes

- The server stores compact recipes/data, not compiled maps or fully rendered terrain.
- Store significant placements such as buildings and obstructions explicitly, together with relevant NPC, enemy, quest, and asset references.
- The client may procedurally generate terrain detail, grass, road appearance, hills, and decoration under reproducible rules and placement constraints.
- Do not allow generated obstacles or terrain to invalidate required routes, entrances, or quest destinations.
- Biomes, NPCs, enemies, quests, and other predefined content have weighted probabilities, including rare content.
- Do not represent biome transitions as decimal interpolation between numerically ordered biome IDs; that restricts transitions to a linear ordering.
- Explore irregular regions and spatial blending, including Voronoi-style layouts and gradients. The exact algorithm is not yet selected.
- Visible biome boundaries should not expose the square storage grid. Regions can be designed independently of quadrant addressing.
- New generation must honor previously established neighbor edges and corners without altering existing quadrants. Include connectivity and terrain continuity in validation.
- Perlin noise, wave function collapse, and other algorithms are candidates, not mandated choices.
- The user's intended difficulty model lets the discovering player's level influence harder newly generated areas, with that difficulty retained for subsequent players. Formula, neighbor constraints, and simultaneous-discovery rules remain undecided.

## Client/server responsibilities and anti-cheat

- Run movement, combat, enemy AI, quest logic, inventory, progression, and saves locally. Do not move those to the server as an anti-cheat solution.
- The server exists to provide initial quadrant recipes and assets. Player saves/progression uploads and continuous gameplay connections are not required.
- Keep all persistent playthrough state on the client; server storage should not duplicate each player's world.
- Reduce cheating through proportionate local measures such as save integrity checks, validation, robust reward logic, and release-build hygiene. Do not claim local anti-tampering eliminates determined cheating.
- A client-reported level is not cryptographically proven progression. Address its eventual impact on shared generation with bounded rules if needed, without expanding the initial prototype into an authoritative online game.
- Initial scale is one person testing locally. Avoid premature hosting, distributed systems, account, or concurrency complexity.

## Assets and submissions

- Ship an initial asset set and support acquiring missing required assets from the server as new areas are acquired.
- Retain required assets locally for offline play and existing timelines. Avoid silently replacing old asset identities with incompatible content.
- Long-term intent includes user submissions for biomes, NPCs, enemies, quests, and related assets through a public website.
- AI-assisted submissions are an idea to explore, not a required provider or approved integration.
- Submission formats, validation/review, behavior templates, and publishing workflow remain to be designed. Do not load arbitrary unreviewed contributor code as game content.

## Intended repository organization and stack

- game/: Godot development project; GDScript is the intended learning/development direction.
- backend/: SvelteKit application for backend management and world/content API. The user intends to write this; agree on contracts before assuming responsibility for implementation.
- frontend/: Separate public website, including eventual user submissions. Folder name may be adjusted when scaffolding is requested; website/ was an earlier proposal.
- The user knows JavaScript/TypeScript and previously used PHP. Prefer TypeScript for web/backend code.
- The user requested SvelteKit 3; verify available compatible versions before setup rather than silently assuming or substituting a version.
- Shared contracts, content definitions, tools, and design docs may receive separate folders when needed. These are proposed additions, not existing scaffolding.
- Godot is the current intended game direction. Final rendering setup, backend database, hosting, package manager, and exact dependencies are not yet selected. PostgreSQL/Node.js were recommendations, not approved infrastructure requirements.

## Proposed first prototype (not yet authorized by this file)

- Placeholder player movement and elevated camera.
- Large quadrants with several placeholder biomes and seamless edges.
- Persistent initial recipes, 3x3 acquisition, and manageable local rendering chunks.
- Local playthrough saves and one persistent interaction to demonstrate branching state.
- Offline movement in acquired areas and clear restriction at unavailable areas.
- Verify reload persistence and a second playthrough receiving the same initial content while the first retains its changes.
- Defer public submissions, production hosting, co-op, elaborate anti-tampering, and full combat until the foundation is proven.
- Confirm prototype rendering and who implements the backend before building those components.
