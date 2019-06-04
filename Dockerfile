FROM node:alpine
WORKDIR '/app'
COPY ./PACKAGE.JSON ./
RUN NPM INSTALL
COPY . .
CMD ["npm","run","start"]
