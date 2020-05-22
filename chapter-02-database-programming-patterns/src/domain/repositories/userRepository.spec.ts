import { createUser } from './userRepository'

describe('userRepository', () => {
  describe('createUser', () => {
    it('can create user', async () => {
      const user = await createUser()
      expect(user).toMatchSnapshot()
    })
  })
})
