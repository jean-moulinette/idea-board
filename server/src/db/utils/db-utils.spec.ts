import { expect } from 'chai';
import { buildDatabaseConn } from './db-utils';

describe('database-utils', () => {
  const {
    DATABASE_HOST,
    DATABASE_PORT,
    TEST_DATABASE_NAME,
  } = process.env;

  it('Should properly build database connection URI', () => {
    const conn = buildDatabaseConn();
    const expectedConn = `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${TEST_DATABASE_NAME}`;
    expect(conn).to.equal(expectedConn);
  });
});
