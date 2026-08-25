# UMDAC Website 2.0

UMDAC Website 2.0 is the club’s modern web platform for events, community engagement, member access, and data-focused learning experiences.

## Stack

- Next.js 16
- TypeScript
- Tailwind CSS
- Supabase
- Server actions and app-router pages

## Local setup

1. Install dependencies

```bash
npm install
```

2. Configure local environment variables

Create a `.env.local` file in the project root using the same variable names as the example file.

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
RESEND_API_KEY=your-resend-key
```

Do not commit secrets. Local env files are already ignored by Git.

3. Start the app

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Important repository notes

- Keep all Supabase and auth logic in the existing server/client setup.
- Do not rewrite the middleware or authentication flow unless absolutely required.
- Preserve the existing app routes and project structure while adding features in a clear, maintainable way.
- Keep UI components reusable and consistent with the current design system.

## Project structure overview

```text
src/
├── app/
│   ├── actions/
│   ├── about/
│   ├── events/
│   ├── faq/
│   ├── home/
│   ├── login/
│   ├── merch/
│   ├── signup/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── not-found.tsx
├── components/
│   └── umdac-ui.tsx
├── lib/
│   ├── supabase/
│   ├── utils.ts
│   └── validation/
└── middleware.ts

supabase/
├── migrations/
└── ...
```

## Main routes

- `/` — home page
- `/about` — club overview and committee profiles
- `/events` — event browsing
- `/faq` — FAQs
- `/login` — member login
- `/signup` — member sign-up
- `/merch` — merch listings

## Team conventions

- Keep page-specific UI close to the relevant route folder when practical.
- Keep shared UI reusable and centralized.
- Use the existing `@/` import alias.
- Preserve existing backend contracts and server actions.
- Do not change database schema or authentication behavior as part of routine organization work.

## Development commands

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Security

- Never commit `.env.local`.
- Never expose service-role or secret keys through `NEXT_PUBLIC_*` variables.
- Keep local credentials in the local environment only.
