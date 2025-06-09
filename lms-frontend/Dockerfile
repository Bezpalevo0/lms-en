# Stage 1 — build Astro
FROM node:20-alpine AS builder

WORKDIR /app
COPY . .
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --frozen-lockfile
RUN pnpm build

# Stage 2 — run the built site
FROM node:20-alpine

WORKDIR /app
COPY --from=builder /app .
RUN corepack enable && corepack prepare pnpm@latest --activate

EXPOSE 4321
CMD ["node", "./dist/server/entry.mjs"]
