ARG ENV


############################################################
# BUILDER stage
FROM node:12 AS builder
ARG ENV
ENV NODE_ENV=$ENV

WORKDIR /usr/src/app

# Copies several tools configuration files
COPY package*.json ./

RUN npm install && npm cache clean --force
# RUN npm ci --only=production && npm cache clean --force

# Bundle app source
COPY . .

CMD ["/bin/bash",  "build.sh"]
# END of BUILDER stage


############################################################
# REMOTE environment stage
FROM node:12 AS remote
ARG ENV
ENV NODE_ENV=$ENV

WORKDIR /usr/src/app

RUN npm run build

EXPOSE 4000 9200

CMD ["/bin/bash",  "start.sh"]

# END of REMOTE stage

############################################################
# LOCAL environment stage
FROM builder AS local
ARG ENV
ENV NODE_ENV=$ENV

WORKDIR /usr/src/app

EXPOSE 4000 9200

CMD ["/bin/bash",  "start.sh"]
# END of LOCAL stage