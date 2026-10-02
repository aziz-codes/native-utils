# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project state

Freshly reset `create-expo-app` project (Expo SDK 57, React Native 0.86, React 19.2, TypeScript strict). The only real code is a root `Stack` layout and a placeholder index screen. Package manager is **npm** (`package-lock.json`, no `bun.lock`), so use `npx`, not `bunx`.

## Commands

```bash
npm start                 # expo start (also: npm run ios | android | web)
npx expo lint             # lint (eslint-config-expo flat config)
npx tsc --noEmit          # typecheck
```

There is no test runner configured. `npm run reset-project` is broken: it points at `scripts/reset-project.js`, which now lives only under `example/scripts/`.

## Layout quirks (read before adding files)

- **Routes currently live in `app/` at the repo root, not `src/app/`** as AGENTS.md describes. Expo Router picks up either location, but `src/app/` takes precedence once it exists. If you introduce `src/`, move `app/` into `src/app/` in the same change rather than splitting routes across both.
- The `@/*` path alias in `tsconfig.json` maps to `./src/*`, which does not exist yet. `@/assets/*` maps to `./assets/*`.
- `example/` (gitignored, local only) holds the original template code: themed components, `use-theme`/`use-color-scheme` hooks with `.web.tsx` platform variants, a `constants/theme.ts`, and a tabs layout. It's useful as a reference for project conventions, but it isn't part of the app, and nothing should import from it. It is excluded from `tsconfig.json` and `eslint.config.js`.

## Styling

NativeWind v4 (Tailwind CSS **v3**, not v4). Style with `className` on React Native components. Wiring: `babel.config.js` (`jsxImportSource: "nativewind"` + `nativewind/babel`), `metro.config.js` (`withNativeWind`, input `./global.css`), `global.css` imported once in `app/_layout.tsx`, `nativewind-env.d.ts` for types. Tailwind `content` globs cover `app/` and `src/`, so add a glob in `tailwind.config.js` if you put components anywhere else, or their classes won't be generated. After changing babel/metro/tailwind config, restart with `npx expo start --clear`.

## Config notes

- `app.json` enables `experiments.typedRoutes` (route types are generated into `.expo/types`, so `href` strings are type-checked) and `experiments.reactCompiler` (so avoid manual `useMemo`/`useCallback` unless profiling shows a need).
- Deep-link scheme is `nativeutils`. Web output is `static`.
- `@expo/ui`, `expo-glass-effect` and `expo-symbols` are installed for native UI primitives. Prefer them over adding third-party UI libraries.
