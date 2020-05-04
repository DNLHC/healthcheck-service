FROM node:12-slim as base

RUN apt-get update && apt-get install psmisc -y

ENV NODE_ENV=production
EXPOSE ${APP_PORT}

RUN mkdir /app && chown -R node:node /app

WORKDIR /app
USER node

COPY --chown=node:node package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production

FROM base as dev
ENV NODE_ENV=development
ENV PATH=/app/node_modules/.bin:$PATH
RUN yarn install --frozen-lockfile
CMD ["yarn", "run", "dev"]

FROM base as source
COPY --chown=node:node . .

FROM source as test
ENV NODE_ENV=test
ENV PATH=/app/node_modules/.bin:$PATH
COPY --from=dev /app/node_modules /app/node_modules
RUN yarn run lint
CMD [ "yarn", "run", "test" ]

FROM source as prod
CMD ["yarn run start"]
