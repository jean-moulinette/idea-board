const { MongoClient } = require('mongodb')

const { getConfig } = require('utils/config')

getConfig()
  .then(connectServer)
  .catch(handlePromiseRejection)

async function connectServer(config) {
  const {
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_NAME,
    TEST_DATABASE_NAME,
  } = config

  // Database bootstrap
  const connection = `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`

  try {
    const db = await MongoClient.connect(connection)
    console.log('\nSuccessfully connected to database')
    await migrateDatabase(db)
    console.log(`\nSuccessfully created ${DATABASE_NAME} database\n`)
  } catch (e) {
    handlePromiseRejection(e)
  }

  if (!TEST_DATABASE_NAME) {
    throw new Error('Unable to find test database name. You won\'t be able to run tests')
  }

  // Test database bootstrap
  const testConnection = `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${TEST_DATABASE_NAME}`

  try {
    const db = await MongoClient.connect(testConnection)
    console.log('\nSuccessfully connected to test database')
    await migrateDatabase(db)
    console.log(`\nSuccessfully created ${TEST_DATABASE_NAME} database\n`)
  } catch (e) {
    handlePromiseRejection(e)
  }
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
