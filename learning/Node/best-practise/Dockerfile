# Best-Practice Docker Image and GitHub Workflow for Node.js app. [Continuous Integration/Delivery/Deployment]
ARG VERSION=12.10.0

# Development ##################################################################
FROM mhart/alpine-node:${VERSION} AS dev
WORKDIR /app
COPY package*.json .gitignore ./
ENV HOST=0.0.0.0
ENV PORT=${PORT}
RUN npm ci --prefer-offline
COPY . .
EXPOSE 3000
CMD ["node_modules/.bin/nuxt"]

# Audit ########################################################################
# The npm audit command will exit with a 0 exit code if no vulnerabilities were
# found.
FROM dev AS audit
RUN npm audit

# Lint #########################################################################
FROM audit AS lint
RUN npm run lint

# Test #########################################################################
FROM lint AS test
RUN npm test

# Build ########################################################################
FROM test AS build
RUN npm run build \
  && npm ci --prefer-offline --prod

# Release ######################################################################
FROM mhart/alpine-node:slim-${VERSION} AS release
ENV HOST=0.0.0.0
ENV PORT=${PORT}
RUN addgroup -g 1000 -S app && \
    adduser -u 1000 -S app -G app && \
    apk add --no-cache tini curl
USER app
COPY nuxt.config.js .
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.nuxt ./.nuxt
COPY --from=build /app/api ./api
COPY --from=build /app/static ./static

HEALTHCHECK --interval=5s --timeout=2s --retries=12 \
  CMD curl --silent --fail localhost:${PORT}/health || exit 1

ENTRYPOINT ["/sbin/tini", "--"]
EXPOSE 3000
CMD ["node_modules/.bin/nuxt-start"]