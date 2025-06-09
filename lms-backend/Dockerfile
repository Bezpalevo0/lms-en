# Stage 1 — install dependencies + build project
FROM node:20-alpine AS builder

WORKDIR /app
COPY . .
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --frozen-lockfile
RUN pnpm build

# Stage 2 — final production environment
FROM node:20-alpine

WORKDIR /app
COPY --from=builder /app .
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --prod --frozen-lockfile

EXPOSE 1337
CMD ["pnpm", "start"]
