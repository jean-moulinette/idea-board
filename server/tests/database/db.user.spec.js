const { expect } = require('chai')
const User = require('src/db/user')
const { TEST_USER } = require('database/seeds/test/constants')

describe('db user entity', () => {
  it('Should properly fetch user by it\'s name', (done) => {
    const { name } = TEST_USER

    User.findByName(name)
      .then((result) => {
        expect(result.name).to.eql(name)
        done()
      })
      .catch((reason) => {
        done(new Error(reason))
      })
  })
})
