const { MongoClient } = require('mongodb')

const { getConfig } = require('utils/config')

getConfig()
  .then(connectServer)
  .catch(handlePromiseRejection)

function connectServer(config) {
  const {
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_NAME,
  } = config

  const connection = `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`

  MongoClient.connect(connection)
    .then((db) => {
      console.log('\nSuccessfully connected to db server')
      return migrateDatabase(db)
    })
    .then(() => {
      console.log(`\nSuccessfully created ${DATABASE_NAME} database`)
    })
    .catch(handlePromiseRejection)
}

async function migrateDatabase(db) {
  // Dropping before any operation for a proper reset
  await dropDatabase(db)

  await createUsersCollection(db)
  console.log('Successfully created users collection')

  await createBoardsCollection(db)
  console.log('Successfully created boards collection')

  return db.close()
}

function dropDatabase(db) {
  return db.dropDatabase()
    .catch(handlePromiseRejection)
}

function createUsersCollection(db) {
  return db.createCollection('users')
    .then(usersCollection => createUniqueDocumentIndex({
      collection: usersCollection,
      name: 'userNameUnique',
      field: 'name',
    }))
    .catch(handlePromiseRejection)
}

function createUniqueDocumentIndex({
  collection,
  name,
  field,
}) {
  return collection.createIndex(name, { [field]: 1 }, { unique: true })
}

function createBoardsCollection(db) {
  return db.createCollection('boards')
    .catch(handlePromiseRejection)
}

function handlePromiseRejection(reason) {
  throw new Error(reason)
}
