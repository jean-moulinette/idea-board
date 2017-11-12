const { MongoClient } = require('mongodb')

const { config } = require('src/utils/config')
const { REPOSITORIES_COLLECTIONS } = require('src/repositories/constants')
const { createUniqueDocumentIndex } = require('../model-utils')

main()

async function main() {
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
    console.log('\nSuccessfully connected to idea-board database')
    await migrateDatabase(db)
    console.log(`Successfully created ${DATABASE_NAME} database`)
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
    console.log(`Successfully created ${TEST_DATABASE_NAME} database`)
  } catch (e) {
    handlePromiseRejection(e)
  }
}

async function migrateDatabase(db) {
  // Dropping before any operation for a proper reset
  await dropDatabase(db)

  const collectionsCreation = REPOSITORIES_COLLECTIONS
    .map(collection => db.createCollection(collection.name))

  try {
    await Promise.all([
      ...collectionsCreation,
    ])
  } catch (e) {
    await db.close()
    throw new Error(e)
  }

  const constraintsCreation = REPOSITORIES_COLLECTIONS
    .map(generateConstraintsForCollection(db))

  try {
    await Promise.all([
      ...constraintsCreation,
    ])
  } catch (e) {
    await db.close()
    throw new Error(e)
  }

  return db.close()
}

function generateConstraintsForCollection(db) {
  return async (collectionInfo) => {
    const { constraints, name } = collectionInfo
    const collection = await db.collection(name)

    if (constraints && constraints.length > 0) {
      const constraintsCreation = constraints.map(constraint => createUniqueDocumentIndex({
        collection,
        name: constraint.name,
        field: constraint.field,
      }))

      return Promise.all([
        ...constraintsCreation,
      ])
    }

    return null
  }
}

function dropDatabase(db) {
  return db.dropDatabase()
    .catch(handlePromiseRejection)
}

function handlePromiseRejection(reason) {
  throw new Error(reason)
}
