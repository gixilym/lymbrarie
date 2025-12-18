# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Lymbrarie is a personal library management web application built with Next.js, TypeScript, Firebase, and Recoil for state management. Users can manage their book collections, track reading states, add notes, mark favorites, and discover book recommendations.

## Development Commands

### Core Commands
- `pnpm dev` - Start development server at http://localhost:3000
- `pnpm build` - Build for production (also runs type checking via TypeScript)
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

### Type Checking
**IMPORTANT**: Always use `pnpm build` for type checking. Do NOT run `tsc` or `npx tsc` directly as they fail in this environment.

## Project Structure

```
lymbrarie/
├── adapters/          # Data layer adapters (e.g., BookAdapters for Firestore operations)
├── components/        # React components (30+ UI components)
├── database/          # Firebase initialization and configuration
├── hooks/             # Custom React hooks (useGuest, useIsMobile, useLoad, useLocalStorage, usePopUp, useTitles)
├── pages/             # Next.js pages (Pages Router)
│   ├── api/          # API routes
│   ├── book/         # Dynamic book detail pages
│   ├── guest/        # Guest mode pages (0-3)
│   └── recommendation/ # Book recommendation pages
├── public/            # Static assets
├── translations/      # i18n files (en, es)
└── utils/             # Utilities, types, constants, atoms, helpers
```

## Architecture

### State Management
- **Recoil** for global state management (see `utils/atoms.ts`)
- Key atoms:
  - `popupsAtom` - Controls modal visibility (add_book, edit_book, delete_book, profile, settings, offline, login, recommendation)
  - `searchAtom` - Search query state
  - `stateAtom` - Current book state filter
  - `shuffleAtom` - Shuffle/randomization mode
  - `showFavsAtom` - Toggle favorites view
  - `menuAtom`, `coverAtom`, `zeroAtom`, `animListAtom` - UI state

### Data Layer
- **Firebase Firestore** as the database
- **BookAdapters** class (`adapters/book.adapters.ts`) handles all book CRUD operations:
  - `getBooks(UID)` - Fetch user's books
  - `syncBooks(ArgsSync)` - Real-time sync with Firestore using `onSnapshot`
  - `manageBook(bookId, data)` - Create/update book
  - `deleteBook(bookId)` - Delete book
- Collection: `lymbrarie_books`

### Authentication
- **next-firebase-auth** for authentication flow
- Firebase Admin SDK for server-side auth
- Cookie-based sessions (12-day expiry)
- Auth pages: `/login` (auth page), `/` (app page)

### Internationalization
- **i18next** and **react-i18next**
- Supported languages: English (`en`), Spanish (`es`)
- Translations in `translations/` directory
- Provider: `I18Provider` component

### Styling
- **Tailwind CSS** with **DaisyUI** plugin
- Theme: "sunset" (DaisyUI theme)
- Custom font: Poppins (`@fontsource/poppins`)
- Path aliases: `@/*` maps to project root

## Key Types (utils/types.ts)

```typescript
interface Book {
  id: string
  data: BookData
}

interface BookData {
  owner?: string
  title?: string
  state?: string      // Reading state
  author?: string
  image?: string
  gender?: string     // Genre
  loaned?: string
  notes?: string
  isFav?: boolean
  url?: string
}

interface UserData {
  name?: string | null
  email?: string | null
  image?: string | null
  id: string
}
```

## Important Constants (utils/consts.ts)

- **Book States**: Defined by UI, typically "Pending", "Reading", "Completed", "Recommended"
- **Genres**: 23+ predefined genres from "fiction" to "science" (see `GENDERS` array)
- **Pages**: All route constants defined in `PAGES` object
- **APIs**: Google Books API for book search (`API_BOOKS`)
- **Cloudinary**: Image upload service (`CLOUDINARY_URL`)

## Environment Variables

Required in `.env.local`:
- `FIREBASE_API_KEY`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`
- `API_KEY_BOOKS` (Google Books API)
- `COOKIE_SECRET_CURRENT`
- `COOKIE_SECRET_PREVIOUS`

## Next.js Configuration

- **Image Optimization**: Enabled with remote patterns for:
  - Cloudinary (res.cloudinary.com)
  - Google user photos (lh3.googleusercontent.com)
  - GitHub avatars (avatars.githubusercontent.com)
  - Google Books (books.google.com)
- **Console Removal**: Automatically removes console statements in production
- **Strict Mode**: Enabled
- **Sitemap**: Generated post-build via `next-sitemap`

## Code Conventions

### TypeScript
- Strict mode enabled (`noUnusedLocals: true`)
- No implicit any types
- Explicit return types preferred
- Use utility types from `utils/types.ts`

### React Components
- All components use default inline function exports
- Functional components with TypeScript
- Hooks follow React best practices
- Memo components when needed (see `MemoComponent` type)

### ESLint Rules
- Extends `next/core-web-vitals`
- `react-hooks/exhaustive-deps` disabled (intentional for this project)
- `react/react-in-jsx-scope` disabled (Next.js auto-imports React)

## Special Features

### Guest Mode
- Accessible at `/guest` with sub-pages 0-3
- Allows users to explore without authentication

### Book Recommendations
- Special recommendation system at `/recommendation`
- Featured book stored in `BOOK_RECO` constant

### Writer Mode
- Special page at `/writer` (TinyMCE rich text editor integration)

### Rich Text Notes
- Book notes use TinyMCE editor (local installation in `/public/tinymce/`)
- Configured with dark theme (`oxide-dark` skin)
- Plugins: lists, link, emoticons, searchreplace, autolink, autosave, wordcount
- Notes stored as HTML in Firestore
- **Auto-save**: Changes are automatically saved 2 seconds after user stops typing
- **Full-screen editor**: Modal sized at 95vw x 95vh with editor occupying 100% of available space
- No manual save button required - saves automatically on change and when closing
- Error recovery page renders HTML notes using `dangerouslySetInnerHTML`

### Search
- Google Books API integration
- Search page at `/search`

### Image Handling
- Uses `html2canvas-pro` for screenshot/canvas features
- Cloudinary for image uploads and storage
- Sharp for image optimization (Next.js)

## Third-Party Integrations

- **TinyMCE**: Rich text editor (`@tinymce/tinymce-react`)
- **React Spring**: Animation library (`@react-spring/web`)
- **React Dropzone**: File upload handling
- **React Select**: Dropdown select components
- **React Hot Toast**: Notification system
- **es-toolkit**: Utility functions (used in adapters for `isEqual`, `isNull`)
- **crypto-js**: Encryption utilities (see `utils/encrypt.ts`)
