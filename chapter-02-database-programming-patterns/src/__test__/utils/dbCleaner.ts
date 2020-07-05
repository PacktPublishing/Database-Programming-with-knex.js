import { dbConnection } from '../../infrastructure/dbConnection'

export function deleteUsers(): Promise<any> {
  return dbConnection.any(`TRUNCATE TABLE users_service.users RESTART IDENTITY;`)
}
