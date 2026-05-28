# Elysia with Bun runtime


## File/folder structure

```txt
├── src/
│   ├── components/         # Reusable HTMX/JSX components (Layouts, Buttons, etc.)
│   ├── db/                 # Native Postgres client setup and database schemas
│   │   ├── index.ts        # Database connection/client initialization
│   │   └── schema.ts       # Table definitions/interfaces
│   ├── modules/            # Feature-based "Vertical Slices"
│   │   ├── auth/           # Example: Auth feature
│   │   │   ├── controller.ts # Elysia routes returning HTMX or JSON
│   │   │   ├── service.ts    # Business logic & native Postgres queries
│   │   │   └── views.tsx     # Feature-specific HTMX/JSX components
│   │   └── .../            # Other modules: achievement, auth, PEV, reward
│   ├── public/             # Static assets (CSS, HTMX script, client-side JS)
│   ├── index.tsx           # Application entry point & main Elysia instance
│   └── types.ts            # Global TypeScript types
├── .env                    # Environment variables (DATABASE_URL)
└── tsconfig.json           # TS configuration for Bun and JSX
```

## Getting Started
To get started with this template, simply paste this command into your terminal:
```bash
bun create elysia ./elysia-example
```

## Development
To start the development server run:
```bash
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.