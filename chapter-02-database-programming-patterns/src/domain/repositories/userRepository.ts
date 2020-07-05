import { dbConnection } from '../../infrastructure/dbConnection'
import { hashPassword } from '../../infrastructure/passwordHasher'

export type CreateUserModel = {
  firstName: string
  lastName: string
  password: string
}

export type InsertedUserModel = {
  userId: number
}

export type FetchCompleteUserModel = {
  userId: number
  firstName: string
  lastName: string
  passwordHash: string
  createdAt: string
  updatedAt: string
  deletedAt?: string
  deactivatedAt?: string
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

export async function fetchCompleteUser(userId: number): Promise<FetchCompleteUserModel | null> {
  const result = await dbConnection.oneOrNone(
    `SELECT
  "firstName", "lastName", "passwordHash", "createdAt", "updatedAt", "deletedAt", "deactivatedAt"
  FROM users_service.users
  `,
    [userId]
  )
  return result
}

export async function updatePassword(userId: number, newPassword: string): Promise<number> {
  const passwordHash = await hashPassword(newPassword)
  const result = await dbConnection.result(
    `
  UPDATE users_service.users
  SET "passwordHash" = $2
  WHERE "userId" = $1; 
`,
    [userId, passwordHash]
  )
  return result.rowCount
}

export async function softDeleteUser(userId: number): Promise<number> {
  const result = await dbConnection.result(
    `
  UPDATE users_service.users
  SET "deletedAt" = now()
  WHERE "userId" = $1; 
`,
    [userId]
  )
  return result.rowCount
}

export async function deactivateUser(userId: number): Promise<number> {
  const result = await dbConnection.result(
    `
  UPDATE users_service.users
  SET "deactivatedAt" = now()
  WHERE "userId" = $1; 
`,
    [userId]
  )
  return result.rowCount
}
