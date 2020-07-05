import { checkPassword, hashPassword } from './passwordHasher'

describe('passwordHasher', () => {
  describe('hashPassword', () => {
    it('hashes password', async () => {
      const hash = await hashPassword('pass1')
      expect(hash.length).toBe(60)
    })
  })

  describe('checkPassword', () => {
    it('returns true for valid password', async () => {
      const hash = await hashPassword('pass1')
      const isValid = await checkPassword(hash, 'pass1')
      expect(isValid).toBe(true)
    })

    it('returns false for invalid password', async () => {
      const hash = await hashPassword('pass1')
      const isValid = await checkPassword(hash, 'Pass1')
      expect(isValid).toBe(false)
    })
  })
})
