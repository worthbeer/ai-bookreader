# AI Book Reader

Upload PDF books, browse your library, and interact with them through voice AI. Built to explore Next.js 16 with React 19, VAPI for voice interfaces, and Clerk + MongoDB as a production-grade auth and persistence stack.

---

## What It Does

- **Upload PDFs** — drag-and-drop upload with react-hook-form validation and Zod schema enforcement; files stored in Vercel Blob
- **Book library** — all uploaded books displayed as cards with cover image, title, and author, persisted in MongoDB
- **Voice interaction** — VAPI Web SDK powers a voice AI session on each book page; ask questions, get summaries, navigate by voice
- **Auth** — Clerk handles sign-up, sign-in, and session management; protected routes enforce authentication before any book or upload access

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 App Router |
| Runtime | React 19 |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS 4 + shadcn/ui |
| Auth | Clerk |
| Database | MongoDB + Mongoose |
| File Storage | Vercel Blob |
| Voice AI | VAPI Web SDK |
| PDF Parsing | PDF.js (pdfjs-dist) |
| Forms | React Hook Form + Zod |
| Notifications | Sonner |

---

## Architecture Notes

**Why VAPI** — VAPI manages the full voice session lifecycle: wake word, transcription, LLM call, and TTS response. The alternative was wiring together Whisper + an LLM + a TTS API manually; VAPI trades control for speed of integration.

**Why Clerk over NextAuth** — Clerk provides pre-built UI components (sign-in, sign-up, user button) and handles session tokens, JWTs, and middleware in a single package. For a project focused on the AI and voice layers, not the auth layer, that tradeoff is correct.

**Why Vercel Blob over S3** — Zero configuration for a Next.js/Vercel deployment. The tradeoff: less control over storage lifecycle and no multi-cloud portability.

**MongoDB over a relational DB** — Book metadata (title, author, slug, coverURL, segments) is document-shaped with no relational dependencies that would benefit from joins. Mongoose adds schema validation on top.

---

## Running Locally

Create a `.env.local` file in the project root:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

MONGODB_URI=

BLOB_READ_WRITE_TOKEN=

NEXT_PUBLIC_VAPI_WEB_TOKEN=
VAPI_PRIVATE_KEY=
```

```bash
npm install
npm run dev
```

App runs at `http://localhost:3000`.

---

## Skills Demonstrated

- Voice AI integration with VAPI — session lifecycle, controls, transcript rendering
- Clerk auth with protected routes and middleware in Next.js App Router
- MongoDB + Mongoose for document persistence with typed models
- File upload pipeline: client validation → server route → Vercel Blob → MongoDB reference
- Next.js 16 / React 19 bleeding-edge features in a working app
