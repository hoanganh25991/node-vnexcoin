import Sequelize from "sequelize"

const _ = console.log

const {
  DB_DIALECT: dialect = "mysql",
  DB_HOST: host = "localhost",
  DB_PORT: port = 3306,
  DB_NAME: database = "gobear",
  DB_USER: username = "gobear",
  DB_PASS: password = "dOey8JPc",
  TIMEZONE: timezone = "+08:00"
} = process.env

export const sequelize = new Sequelize({
  database,
  username,
  password,
  dialect,
  host,
  port,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  timezone
})

// Or you can simply use a connection uri
// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');
