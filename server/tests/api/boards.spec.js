const chai = require('chai')
const chaiHttp = require('chai-http')
const { expect } = require('chai')

const { ideaBoardApp } = require('src/bootstrap/server')
const { BOARDS_BASE_ROUTE } = require('src/bootstrap/router/routes/api/boards/constants')

const { TEST_USER_LOGIN, BOARDS_SAMPLE } = require('database/constants')

chai.use(chaiHttp)

describe('boards API integration tests', () => {
  it('Should get all user\'s owned boards', (done) => {
    chai.request(ideaBoardApp)
      .get(BOARDS_BASE_ROUTE)
      .query({
        user: TEST_USER_LOGIN,
      })
      .end((err, res) => {
        const { body, statusCode } = res

        expect(statusCode).to.equal(200)
        expect(body).to.be.an('array')
        expect(body.length).to.equal(BOARDS_SAMPLE.length)
        done()
      })
  })
})
