const { expect } = require('chai')

const { config } = require('src/utils/config')

describe('config util', () => {
  it('Config should contain required values :', () => {
    expect(config).to.be.an('object').that.includes.keys([
      'DATABASE_HOST',
      'DATABASE_PORT',
      'DATABASE_NAME',
      'TEST_DATABASE_NAME',
      'SERVER_PORT',
    ])
  })
})
