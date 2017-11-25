const { MongoClient } = require('mongodb')

exports.getDatabaseHost = function() {
  const {
    DATABASE_HOST,
    DATABASE_PORT,
  } = process.env

  return `${DATABASE_HOST}:${DATABASE_PORT}`
}

exports.getDatabaseURI = function(databaseName) {
  const { DATABASE_HOST, DATABASE_PORT } = process.env
  return `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${databaseName}`
}

exports.createConstraints = async function(databaseURI, constraintsConfig) {
  const db = await MongoClient.connect(databaseURI)

  await constraintsConfig.map(async (constraintConfig) => {
    const { collection, constraints } = constraintConfig
    const dbCollection = await db.collection(collection)

    await constraints.map(async (constraint) => {
      const { options, field } = constraint

      await dbCollection.createIndex(field, options)
      db.close()
    })
  })
}
