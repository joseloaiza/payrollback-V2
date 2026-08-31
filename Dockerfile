ARG IMAGE=node:22-alpine

###################################### base builder Stage ##############
FROM ${IMAGE} AS builder
WORKDIR /app

# Copiar package.json Y yarn.lock para aprovechar la caché de Docker
COPY package.json yarn.lock ./

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# 1. Instalar TODAS las dependencias de forma determinista para poder compilar (nest build)
RUN yarn install --frozen-lockfile --production=false

# 2. Copiar el código fuente y compilar
COPY . .
RUN yarn run build

# 3. Limpiar devDependencies para producción sin reinstalar desde cero
RUN if [ "$NODE_ENV" = "production" ]; then \
      rm -rf node_modules && \
      yarn install --frozen-lockfile --production=true --ignore-scripts --prefer-offline; \
    fi

###################################### final runtime stage #############
FROM ${IMAGE} AS runtime
WORKDIR /app

# Establecer variable de entorno para la ejecución
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

USER node

# Copiar solo el código compilado y las dependencias resultantes
COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/dist ./dist

EXPOSE 3000
CMD [ "node", "dist/main.js" ]