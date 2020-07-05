import { createUser } from './userRepository'
import { deleteUsers } from '../../__test__/utils/dbCleaner'
import { closeConnection } from '../../infrastructure/dbConnection'

describe('userRepository', () => {
  beforeEach(async () => {
    await deleteUsers()
  })

  afterAll(() => {
    closeConnection()
  })

  describe('createUser', () => {
    it('can create user', async () => {
      const result = await createUser({
        firstName: 'John',
        lastName: 'Doe',
        password: 'dummy',
      })
      expect(result).toEqual({
        userId: 1,
      })
    })
  })
})
