FROM node:10 as base

ARG NODE_OPTIONS="--max_old_space_size=3584"
ENV NODE_OPTIONS="${NODE_OPTIONS}"

# TODO do not run as root
# RUN useradd --user-group --create-home --shell /bin/false app
# ENV HOME=/home/app
# USER app
# WORKDIR $HOME/app
WORKDIR /app

FROM base as build

# TODO bring back package-lock.json
# COPY package.json package-lock.json ./
COPY package.json ./

RUN npm install

COPY . .

ARG PRISMA_HOST
ARG PRISMA_STAGE
ARG PRISMA_MANAGEMENT_API_SECRET

ARG GCLOUD_KEY_BASE64
RUN mkdir -p build
RUN sh -c 'echo "${GCLOUD_KEY_BASE64}" | base64 -d | tee build/gcloud-key.json'

RUN npm run build:prod

CMD ["npm", "run", "start"]
