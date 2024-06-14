FROM node:18-alpine AS base

# 1. Install dependencies only when needed
FROM base AS deps
WORKDIR /app

RUN apk add --no-cache libc6-compat
COPY package.json pnpm-lock.yaml* ./
RUN corepack enable pnpm && pnpm i --frozen-lockfile

# 2. Builds the source code only when needed
FROM base AS builder
WORKDIR /app

# |- Copy dependencies from "deps" container (above)
COPY --from=deps /app/node_modules ./node_modules

# |- Copy the application source code and build (including prisma generate)
COPY . .
COPY .env.development .env.production
RUN corepack enable pnpm \
    && pnpm prisma generate \
    && SKIP_ENV_VALIDATION=true pnpm next build

# 3. Final image with only the production files
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED 1

# |- Create non-root user to run the application
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# |- Copy the built app files only (not all source code)
#    see https://nextjs.org/docs/pages/api-reference/next-config-js/output
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./next/static
COPY --chown=nextjs:nodejs prisma ./prisma/
COPY --chown=nextjs:nodejs docker/docker-init.sh ./

USER nextjs

# We expose 3000 by default in the image, you can map it later with docker.
EXPOSE 3000

# server.js use the env vars "PORT" and "HOSTNAME"
ENV PORT 3000
ENV HOSTNAME 0.0.0.0

CMD docker-init.sh
