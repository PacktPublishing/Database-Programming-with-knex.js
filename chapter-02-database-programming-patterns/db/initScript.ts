import { dbConnection } from '../src/infrastructure/dbConnection.js'

async function initDb() {
  await dbConnection.any(`DROP SCHEMA IF EXISTS users_service CASCADE`)
  await dbConnection.any(`CREATE SCHEMA users_service`)
  await dbConnection.any(`CREATE TABLE users_service.users (
      userId int,
      firstName varchar(255),
      lastName varchar(255),
      passwordHash varchar(255)
);`)
}

initDb()
