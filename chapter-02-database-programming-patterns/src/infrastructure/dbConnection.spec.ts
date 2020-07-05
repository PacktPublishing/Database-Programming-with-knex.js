import { checkDbHeartbeat, closeConnection } from './dbConnection'

describe('dbConnection', () => {
  afterAll(() => {
    closeConnection()
  })

  describe('checkDbHeartbeat', () => {
    it('correctly returns positive result when database is available', async () => {
      const heartbeatCheckResult = await checkDbHeartbeat()
      expect(heartbeatCheckResult).toEqual({
        isOk: true,
      })
    })
  })
})
