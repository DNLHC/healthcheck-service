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
