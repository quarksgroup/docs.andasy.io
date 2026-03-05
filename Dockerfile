# syntax = docker/dockerfile:1

# Adjust BUN_VERSION as desired
ARG BUN_VERSION=1.3.10

FROM oven/bun:${BUN_VERSION}-slim AS base

LABEL fly_launch_runtime="Next.js"

# Next.js app lives here
WORKDIR /app

# Throw-away build stage to reduce size of final image
FROM base AS build

# Cache Apt metadata between BuildKit builds to avoid downloads each run.
RUN --mount=type=cache,target=/var/cache/apt \
    --mount=type=cache,target=/var/lib/apt \
    apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential pkg-config python-is-python3 && \
    rm -rf /var/lib/apt/lists/*

# Install dependencies before copying the rest of the source to keep cache hits high.
COPY bun.lockb package.json ./
RUN --mount=type=cache,target=/root/.bun \
    bun install

# Build the Next.js app with the compiled and generated passes.
COPY . .
RUN bunx next build --experimental-build-mode compile
RUN bunx next build --experimental-build-mode generate

# Reinstall only production modules to drop dev deps from the final layer.
RUN rm -rf node_modules
RUN --mount=type=cache,target=/root/.bun \
    bun install --ci


# Final stage for app image
FROM base AS runner

ENV NODE_ENV=production

COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

EXPOSE 3000
CMD [ "bun", "server.js" ]
