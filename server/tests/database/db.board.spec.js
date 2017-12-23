const { expect } = require('chai')
const Board = require('src/db/board')
const { TEST_USER_BOARD } = require('database/seeds/test/constants')

describe('db board entity', () => {
  it('Should properly fetch board from db by it\'s name', (done) => {
    const { name } = TEST_USER_BOARD
    Board.findByName(name)
      .then((result) => {
        expect(result.name).to.eql(name)
        done()
      })
      .catch((reason) => {
        done(new Error(reason))
      })
  })
})
