import * as chai from 'chai';
import chaiHttp = require('chai-http');
// tslint:disable-next-line no-duplicate-imports
import { expect } from 'chai';

import IdeaBoardServer from 'src/bootstrap/server';
import { BOARDS_BASE_ROUTE } from 'src/bootstrap/router/routes/api/boards/constants';

import { TEST_USER, EMPTY_BOARD_USER } from 'database/seeds/test/constants';

chai.use(chaiHttp);

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

        const { body, status } = res;

        expect(status).to.equal(200);
        expect(body).to.be.an('array');
        expect(body.length).to.equal(1);
        done();
      });
  });

  it('Should return 422 when request data is malformed', (done) => {
    chai.request(IdeaBoardServer.app)
    .get(BOARDS_BASE_ROUTE)
    .query({})
    .end((_, res) => {
      const { status } = res;

      expect(status).to.equal(422);
      done();
    });
  });

  it('Should return 404 if user does not exist', (done) => {
    chai.request(IdeaBoardServer.app)
    .get(BOARDS_BASE_ROUTE)
    .query({
      user: 'your-mother',
    })
    .end((_, res) => {
      const { status } = res;

      expect(status).to.equal(404);
      done();
    });
  });

  it('Should return 404 if user got no boards', (done) => {
    chai.request(IdeaBoardServer.app)
      .get(BOARDS_BASE_ROUTE)
      .query({
        user: EMPTY_BOARD_USER,
      })
      .end((_, res) => {
        const { status } = res;
        expect(status).to.equal(404);
        done();
      });
  });
});
