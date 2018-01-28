import * as chai from 'chai'
import chaiHttp = require('chai-http')
import { expect } from 'chai'

import IdeaBoardServer from 'src/bootstrap/server'
import { BOARDS_BASE_ROUTE } from 'src/bootstrap/router/routes/api/boards/constants'

import { TEST_USER, EMPTY_BOARD_USER } from 'database/seeds/test/constants'

chai.use(chaiHttp)

describe('boards API integration tests', () => {
  it('Should get all user\'s owned boards', (done) => {
    chai.request(IdeaBoardServer.app)
      .get(BOARDS_BASE_ROUTE)
      .query({
        user: TEST_USER.name,
      })
      .end((err, res) => {
        if (err)
          throw err;

        const { body, status } = res

        expect(status).to.equal(200)
        expect(body).to.be.an('array')
        expect(body.length).to.equal(1)
        done()
      })
  })

  it('Should return 404 if user does not exist', () => {
    chai.request(IdeaBoardServer.app)
    .get(BOARDS_BASE_ROUTE)
    .query({
      user: 'your-mother',
    })
    .end((err, res) => {
      if (err)
        throw err

      const { status } = res

      expect(status).to.equal(404)
    })
  })

  it('Should return 404 if user got no boards', () => {
    chai.request(IdeaBoardServer.app)
      .get(BOARDS_BASE_ROUTE)
      .query({
        user: EMPTY_BOARD_USER,
      })
      .end((err, res) => {
        if (err)
          throw err

        const { status } = res
        expect(status).to.equal(404)
      })
  })
})
