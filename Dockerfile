# Common build stage
FROM node:14.20.0 as common-build-stage

COPY . ./app

WORKDIR /app

# Install runtime dependencies
# RUN npm install yarn -g

RUN yarn install

EXPOSE 3000

# Dvelopment build stage
FROM common-build-stage as development-build-stage

ENV NODE_ENV development

CMD ["npm", "run", "dev"]

# Production build stage
FROM common-build-stage as production-build-stage

ENV NODE_ENV production

CMD ["yarn", "start"]
