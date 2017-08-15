const { expect } = require('chai')

const { config } = require('src/utils/config')
const { buildDatabaseConn } = require('./database-utils')

describe('database-utils', () => {
  const {
    DATABASE_HOST,
    DATABASE_PORT,
    TEST_DATABASE_NAME,
  } = config

  it('Should properly build database connection URI', () => {
    const conn = buildDatabaseConn()
    const expectedConn = `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${TEST_DATABASE_NAME}`
    expect(conn).to.equal(expectedConn)
  })
})
