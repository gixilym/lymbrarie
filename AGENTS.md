# AGENTS.md

Lymbrarie is a personal library management web app: Next.js 14 (Pages Router), TypeScript, Firebase Firestore, Recoil, Tailwind CSS + DaisyUI (sunset theme).

## Commands

```bash
pnpm dev          # start dev server (http://localhost:3000)
pnpm build        # production build + type checking
pnpm lint         # ESLint (next/core-web-vitals)
```

**Type checking**: use `pnpm build`. `tsc` directly fails in this environment — don't run it.

## Critical Setup

- **Package manager**: pnpm only (workspace locked to pnpm@11.8.0)
- **`.npmrc`**: `enable-pre-post-scripts=true` is required so `postinstall` runs the watchpack patch
- **Watchpack patch** (`scripts/patch-watchpack.cjs`): patches Next.js's watchpack to handle `EINVAL` errors. Without it, the dev server crashes with filesystem watch errors. Runs automatically via `postinstall` and `predev`.
- **Firebase emulator**: Firestore on port 8080 (`firebase.json`). Not required for dev — app connects to production Firestore by default unless emulator is configured.

## Architecture

- **Pages Router** (not App Router). Entry: `pages/_app.tsx` → wraps with Recoil + Layout → `next-firebase-auth` init on module load.
- **`@/*`** path alias maps to repo root (set in `tsconfig.json` paths).
- **Auth**: `next-firebase-auth` with cookie-based sessions (12-day expiry). Admin SDK on server, client SDK on browser. Both init in `database/initAuth.ts`.
- **Firestore**: single collection `lymbrarie_books`. All book CRUD through `adapters/book.adapters.ts` (`BookAdapters` class). Uses `onSnapshot` for real-time sync.
- **State**: Recoil atoms in `utils/atoms.ts`. Atoms use a `globalThis` cache (`__RECOIL_ATOM_CACHE`) to survive HMR — always use `cachedAtom()` helper, never `atom()` directly.
- **Styles**: Tailwind CSS + DaisyUI plugin, theme `"sunset"`. Custom font Poppins via `font-pop` class. `globals.css` sets base styles.

## Key Dependencies

| Dep | Note |
|---|---|
| `es-toolkit` | Utility functions (not lodash). Use `isEqual`, `isNull` from here. |
| `tailwind-merge` | Available for conditional class merging. |
| `react-hot-toast` | Notification toasts. |
| `@react-spring/web` | Animations. |
| `crypto-js` | Encryption in `utils/encrypt.ts` for sensitive book data. |
| `@tinymce/tinymce-react` | Rich text editor for book notes (self-hosted in `public/tinymce/`). |
| `html2canvas-pro` | Screenshot/canvas export. |
| `dompurify` | HTML sanitization for user-generated notes content. |
| `lucide-react` | Icon library. |

## Conventions

- React components: default inline function exports, TypeScript functional components.
- ESLint ignores `react-hooks/exhaustive-deps` (intentional — see `.eslintrc.json`).
- TypeScript strict mode, `noUnusedLocals: true`. Implicit any disallowed.
- Use shared types from `utils/types.ts` (Book, BookData, Component, etc.) — don't redefine them.
- No test framework exists in this repo. No Jest, Vitest, or Playwright configs are active.
