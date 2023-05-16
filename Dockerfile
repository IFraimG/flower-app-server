FROM node:19.9.0-buster
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
USER node
RUN yarn install --production && yarn cache clean
COPY --chown=node:node . .
EXPOSE 8080
CMD [ "yarn", "start" ]