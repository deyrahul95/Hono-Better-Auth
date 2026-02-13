# Hono Better Auth

Hono todo api implementation using Bun, Better Auth authentication, Postgres DB and Docker.

## Local Env Setup

- Install dependencies:
```sh
bun install
```

- Start Postgres Database

```sh
docker compose up -d
```

- Copy .env.sample to .env and update the database url

```sh
mv .env.sample .env
```

`Example:`
```env
DATABASE_URL=postgres://<username>:<password>@localhost:<port>/<db name>
```

To run:
```sh
bun run dev
```

open http://localhost:3000
