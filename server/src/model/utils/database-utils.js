const { MongoClient, ObjectID } = require('mongodb')


exports.buildDatabaseConn = function () {
  const {
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_NAME,
  } = global.config

  return `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`
}

exports.getDatabaseSession = async function(conn) {
  try {
    return await MongoClient.connect(conn)
  } catch (e) {
    throw new Error(e)
  }
}
