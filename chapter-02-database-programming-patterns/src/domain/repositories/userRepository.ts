import { dbConnection } from '../../infrastructure/dbConnection'
import { hashPassword } from '../../infrastructure/passwordHasher'

export type CreateUserModel = {
  firstName: string
  lastName: string
  password: string
}

export type InsertedUserModel = {
  userId: string
}

export async function createUser(user: CreateUserModel): Promise<InsertedUserModel> {
  const passwordHash = await hashPassword(user.password)
  const result = await dbConnection.one(
    `INSERT INTO users_service.users 
  ("firstName", "lastName", "passwordHash")
  VALUES($1, $2, $3) RETURNING "userId"`,
    [user.firstName, user.lastName, passwordHash]
  )
  return result
}
