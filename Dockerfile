FROM node:11-alpine

WORKDIR /bot

COPY . .

COPY ./entrypoint.sh /usr/bin/entrypoint
RUN chmod +x /usr/bin/entrypoint

RUN npm install

ENTRYPOINT [ "entrypoint" ]