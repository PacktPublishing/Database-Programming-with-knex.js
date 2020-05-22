import { User } from '../types/userTypes'

export async function createUser(): Promise<User> {
  return {
    firstName: 'dummy',
    lastName: 'dummy',
    passwordHash: 'abc',
  }
}
