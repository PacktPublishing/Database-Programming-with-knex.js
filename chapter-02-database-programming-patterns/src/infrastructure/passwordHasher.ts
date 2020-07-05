import { hash, compare } from 'bcrypt'

const SALT_ROUND_AMOUNT = 10

export function hashPassword(plainTextPassword: string): Promise<string> {
  return hash(plainTextPassword, SALT_ROUND_AMOUNT)
}

export function checkPassword(passwordHash: string, providedPassword: string): Promise<boolean> {
  return compare(providedPassword, passwordHash)
}
