# Hono Better Auth

Hono todo api implementation using Bun, Better Auth authentication, Postgres DB and Docker.

## Local Env Setup

- Install dependencies:
```sh
bun install
```

- Start Postgres Database

```sh
bun run db:up
```

- Copy .env.sample to .env and update the env values

```sh
mv .env.sample .env
```

`Example:`
```env
DATABASE_URL=postgres://user:password@localhost:5432/todos
BETTER_AUTH_SECRET=8FfcOsK0J6ktQ5c0yMezA7cuLy6bqHOA
BETTER_AUTH_URL=http://localhost:3000
```

- Migrate Database

```sh
bun run db:migrate
```

 - To run dev server:
```sh
bun run dev
```

 - For Auth References open `http://localhost:3000/api/auth/reference`
