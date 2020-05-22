import PgPromise from 'pg-promise'
import * as pg from 'pg-promise/typescript/pg-subset'

const pgPromiseOptions: PgPromise.IInitOptions = {}
const pgPromise = PgPromise(pgPromiseOptions)

const connectionOptions: pg.IConnectionParameters = {
  host: 'localhost',
  port: 25432,
  database: 'testdb',
  user: 'testuser',
  password: 'testpass',
}

const dbConnection = pgPromise(connectionOptions)

export type HeartbeatCheckResult = {
  isOk: boolean
  error?: string
}

const HEARTBEAT_QUERY = 'SELECT 1'
export async function checkDbHeartbeat(): Promise<HeartbeatCheckResult> {
  try {
    await dbConnection.any(HEARTBEAT_QUERY)
    return {
      isOk: true,
    }
  } catch (error) {
    return {
      isOk: false,
      error,
    }
  }
}

export { dbConnection }
