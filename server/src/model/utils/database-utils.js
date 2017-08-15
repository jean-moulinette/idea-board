const { MongoClient } = require('mongodb')
const { config } = require('src/utils/config')

exports.buildDatabaseConn = function () {
  const {
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_NAME,
    TEST_DATABASE_NAME,
  } = config
  const { env: { NODE_ENV } } = process

  const databaseName = NODE_ENV === 'test'
    ? TEST_DATABASE_NAME
    : DATABASE_NAME

  return `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${databaseName}`
}

exports.getDatabaseSession = async function(conn) {
  try {
    return await MongoClient.connect(conn)
  } catch (e) {
    throw new Error(e)
  }
}
