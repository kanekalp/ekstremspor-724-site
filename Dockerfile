# syntax=docker/dockerfile:1.7

# ─── deps stage ────────────────────────────────────────────────
# Install only what's needed for `next build`. node_modules is
# cached between builds via Docker layer caching as long as
# package.json / lockfile don't change.
FROM node:22-alpine AS deps
WORKDIR /app

# Match the npm version that wrote the lockfile on the host, otherwise
# `npm ci` rejects lockfiles produced by newer npm with slightly different
# tree resolution (notably optional/peer dep entries).
RUN npm install -g npm@11

COPY package.json package-lock.json* ./
RUN npm ci

# ─── build stage ───────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js reads NEXT_PUBLIC_* env at build time and inlines them
# into the client bundle. Pass them via --build-arg or a .env
# file mounted into the build context. See docker-compose.yml.
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY

RUN npm run build

# ─── runner stage ──────────────────────────────────────────────
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Drop root for the running process.
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

# next.config.ts has `output: "standalone"`, so we only need the
# self-contained server bundle plus the static/public assets.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
