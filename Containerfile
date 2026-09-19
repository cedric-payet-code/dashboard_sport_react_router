FROM node:26-slim

WORKDIR /app

EXPOSE 5173

RUN npm install -g corepack

RUN corepack enable yarn

COPY app/package.json app/yarn.lock ./

RUN yarn install

CMD ["yarn", "dev", "--host", "0.0.0.0"]