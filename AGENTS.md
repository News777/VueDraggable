# Repository Guidelines

## Project Structure & Module Organization

The publishable Vue 3 library lives in `src/`. `src/index.ts` is the public entry point; the main component, composables, geometry helpers, styles, and colocated tests are under `src/components/MovableBox/`. Shared public types belong in `src/types/`. Use `dev/` for the local Vite playground and `examples/` for consumer-facing examples. `packages/AutoDraggable/` contains the earlier component implementation; avoid mixing changes between it and the current `src/` implementation without explaining why. `lib/` is generated package output and should be updated through the build, not edited by hand.

## Build, Test, and Development Commands

Use Node.js 18 or newer and pnpm 9.

- `pnpm install --frozen-lockfile` installs the exact locked dependencies.
- `pnpm dev` starts the Vite playground, normally at `http://localhost:5173`.
- `pnpm test` runs the Vitest suite once; `pnpm test:watch` reruns affected tests while editing.
- `pnpm type-check` validates Vue and TypeScript types with `vue-tsc`.
- `pnpm build-only` generates JavaScript, CSS, and declarations in `lib/`.
- `pnpm build` performs type checking and the production build.

Before opening a pull request, run `pnpm test`, `pnpm type-check`, and `pnpm build`.

## Coding Style & Naming Conventions

Write Vue components with `<script setup lang="ts">` and type all public props, emits, exposed methods, and exports. Use two-space indentation, LF endings, single quotes, semicolons, and a 100-character print width, as configured by EditorConfig and Prettier. Component files use PascalCase (`MovableBox.vue`); composables use `useXxx.ts`; utility modules use descriptive lowercase names. Avoid `any`, unused variables, debugging statements, and unrestricted console output. Keep component styles scoped and preserve responsive and RTL behavior.

## Testing Guidelines

Tests use Vitest, jsdom, and `@vue/test-utils`. Colocate tests as `*.spec.ts` under `src/`; the configured suite only includes `src/**/*.spec.ts`. Describe observable behavior, such as dragging, resizing, emitted payloads, and minimum-size constraints. Add or update tests for every behavior change. No numeric coverage threshold is configured, so prioritize meaningful regression cases.

## Commit & Pull Request Guidelines

Follow the repository's Conventional Commit pattern: `feat(components): add snap guides`, `fix: prevent negative width`, or `docs(readme): clarify events`. Keep each commit focused. Pull requests should complete `.github/pull_request_template.md`: summarize the problem and solution, list changes, document verification, link relevant issues, and include screenshots or recordings for visible interaction changes. Update README examples, public API documentation, and `CHANGELOG.md` when applicable. Report security vulnerabilities privately as directed in `SECURITY.md`.
