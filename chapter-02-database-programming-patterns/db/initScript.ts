import { dbConnection } from '../src/infrastructure/dbConnection'

async function initDb() {
  await dbConnection.any(`DROP SCHEMA IF EXISTS users_service CASCADE`)
  await dbConnection.any(`CREATE SCHEMA users_service`)
  await dbConnection.any(`CREATE TABLE users_service.users (
      "userId" SERIAL,
      "firstName" varchar(255),
      "lastName" varchar(255),
      "passwordHash" varchar(255),
      "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      "deactivatedAt" TIMESTAMPTZ,
      "deletedAt" TIMESTAMPTZ      
);`)

  await dbConnection.any(`
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON users_service.users
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();
`)
}

initDb()
