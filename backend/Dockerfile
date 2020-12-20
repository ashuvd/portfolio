FROM node:14

WORKDIR /app

COPY . .

ARG DB_USER
ARG DB_PASS
ARG DB_HOST
ARG DB_MIGRATE_HOST
ARG DB_PORT
ARG DB_NAME
ARG PORT
ARG HOST

ENV DB_USER ${DB_USER}
ENV DB_PASS ${DB_PASS}
ENV DB_HOST ${DB_HOST}
ENV DB_MIGRATE_HOST ${DB_MIGRATE_HOST}
ENV DB_PORT ${DB_PORT}
ENV DB_NAME ${DB_NAME}
ENV PORT ${PORT}
ENV HOST ${HOST}

RUN npm install
RUN npm run sequelize-cli -- db:migrate
RUN npm run sequelize-cli -- db:seed
RUN npm run build

EXPOSE 3333

CMD [ "npm", "run", "start:prod" ]
