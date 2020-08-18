import {
  createUser,
  fetchCompleteUser,
  softDeleteUser,
  updatePassword,
  updateUser,
} from './userRepository'
import { deleteUsers } from '../../__test__/utils/dbCleaner'
import { closeConnection } from '../../infrastructure/dbConnection'
import { TEST_USER_1 } from '../../__test__/fixtures/testUsers'

describe('userRepository', () => {
  beforeEach(async () => {
    await deleteUsers()
  })

  afterAll(() => {
    closeConnection()
  })

  describe('createUser', () => {
    it('creates user', async () => {
      const result = await createUser(TEST_USER_1)
      expect(result).toEqual({
        userId: 1,
      })
    })
  })

  describe('updateUser', () => {
    it('updates user', async () => {
      const createUserResult = await createUser(TEST_USER_1)
      const { userId } = createUserResult
      const fetchUserResult1 = await fetchCompleteUser(userId)

      const updateUserResult = await updateUser(userId, {
        firstName: 'User',
        lastName: 'McUser',
      })
      const fetchUserResult2 = await fetchCompleteUser(userId)

      expect(updateUserResult).toBe(1)
      expect(fetchUserResult1).toBeDefined()
      expect(fetchUserResult2).toBeDefined()
      expect(fetchUserResult2!.firstName).toEqual('User')
      expect(fetchUserResult2!.lastName).toEqual('McUser')
    })
  })

  describe('updatePassword', () => {
    it('updates password', async () => {
      const createUserResult = await createUser(TEST_USER_1)
      const { userId } = createUserResult
      const fetchUserResult1 = await fetchCompleteUser(userId)

      const updateUserResult = await updatePassword(userId, 'dummy2')
      const fetchUserResult2 = await fetchCompleteUser(userId)

      expect(updateUserResult).toBe(1)
      expect(fetchUserResult1).toBeDefined()
      expect(fetchUserResult2).toBeDefined()
      expect(fetchUserResult1!.passwordHash).not.toEqual(fetchUserResult2!.passwordHash)
    })

    it('works correctly when user does not exist', async () => {
      const updateUserResult = await updatePassword(-1, 'dummy2')
      expect(updateUserResult).toBe(0)
    })
  })

  describe('softDeleteUser', () => {
    it('soft deletes user', async () => {
      const createUserResult = await createUser(TEST_USER_1)
      const { userId } = createUserResult
      const fetchUserResult1 = await fetchCompleteUser(userId)

      const deleteUserResult = await softDeleteUser(userId)
      const fetchUserResult2 = await fetchCompleteUser(userId)

      expect(deleteUserResult).toBe(1)
      expect(fetchUserResult1).toBeDefined()
      expect(fetchUserResult2).toBeDefined()
      expect(fetchUserResult1!.deletedAt).not.toEqual(fetchUserResult2!.deletedAt)
    })

    it('works correctly when user does not exist', async () => {
      const deleteUserResult = await softDeleteUser(-1)
      expect(deleteUserResult).toBe(0)
    })
  })
})
