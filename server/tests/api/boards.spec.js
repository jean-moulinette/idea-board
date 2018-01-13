const chai = require('chai')
const chaiHttp = require('chai-http')
const { expect } = require('chai')

const { ideaBoardApp } = require('src/bootstrap/server')
const { BOARDS_BASE_ROUTE } = require('src/bootstrap/router/routes/api/boards/constants')

const { TEST_USER, EMPTY_BOARD_USER } = require('database/seeds/test/constants')

chai.use(chaiHttp)

describe('boards API integration tests', () => {
  it('Should get all user\'s owned boards', (done) => {
    chai.request(ideaBoardApp)
      .get(BOARDS_BASE_ROUTE)
      .query({
        user: TEST_USER.name,
      })
      .end((err, res) => {
        const { body, statusCode } = res

        expect(statusCode).to.equal(200)
        expect(body).to.be.an('array')
        expect(body.length).to.equal(1)
        done()
      })
  })

  it('Should return 404 if user does not exist', () => {
    chai.request(ideaBoardApp)
    .get(BOARDS_BASE_ROUTE)
    .query({
      user: 'your-mother',
    })
    .end((err, res) => {
      const { statusCode } = res
      expect(statusCode).to.equal(404)
    })
  })

  it('Should return 404 if user got no boards', () => {
    chai.request(ideaBoardApp)
      .get(BOARDS_BASE_ROUTE)
      .query({
        user: EMPTY_BOARD_USER,
      })
      .end((err, res) => {
        const { statusCode } = res
        expect(statusCode).to.equal(404)
      })
  })
})
