# Server's docker file
FROM node:8.6.0

WORKDIR /tmp
COPY package.json /tmp/
RUN npm install

WORKDIR /var/www/idea-board
COPY . /var/www/idea-board/
RUN cp -a /tmp/node_modules /var/www/idea-board/

ENV NODE_ENV=dev
ENV PORT=3000

CMD ["/usr/local/bin/node", './src/app.js']
CMD [""]
EXPOSE 3000
