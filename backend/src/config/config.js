require('dotenv').config()

module.exports = {
  development: {
    dialect: 'postgres',
    host: "duddits.ru",
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  },
};
