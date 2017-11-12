const { MongoClient } = require('mongodb')

const { config } = require('src/utils/config')
const { BOARDS_SAMPLE, TEST_USER_LOGIN, SUPER_USER_LOGIN } = require('../constants')
const { BOARDS_COLLECTION, USERS_COLLECTION } = require('src/repositories/constants')

main()

async function main() {
  const {
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_NAME,
    TEST_DATABASE_NAME,
  } = config

  // Database seed
  const connection = `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`

  try {
    const db = await MongoClient.connect(connection)
    await seedDatabase(db, SUPER_USER_LOGIN)
    console.log('\nSuccessfully seeded database')
  } catch (e) {
    handlePromiseRejection(e)
  }

  if (!TEST_DATABASE_NAME) {
    throw new Error('Unable to find TEST_DATABASE_NAME correct value in \'.config\' fime. You won\'t be able to run tests')
  }

  // Test database seed
  const testConnection = `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${TEST_DATABASE_NAME}`

  try {
    const db = await MongoClient.connect(testConnection)
    await seedDatabase(db, TEST_USER_LOGIN)
    console.log('\nSuccessfully seeded test database')
  } catch (e) {
    handlePromiseRejection(e)
  }
}

async function seedDatabase(db, userName) {
  const usersCollection = await getCollection(USERS_COLLECTION, db)
  const boardsCollection = await getCollection(BOARDS_COLLECTION, db)

  await insertUser(usersCollection, userName)

  await insertBoardForUser({
    boardsCollection,
    usersCollection,
    userName,
  })

  return db.close()
}

function getCollection(name, db) {
  return db.collection(name)
}

function insertUser(collection, userName) {
  return collection.insertOne({
    name: userName,
    ownedBoards: [],
    guestBoards: [],
  })
    .catch(handlePromiseRejection)
}

function insertBoardForUser({
  boardsCollection,
  usersCollection,
  userName,
}) {
  return boardsCollection.insertMany(BOARDS_SAMPLE)
    .then((opResult) => {
      const { insertedIds } = opResult
      const documentQuery = {
        name: userName,
      }
      const updateStatement = {
        $set: {
          ownedBoards: insertedIds,
        },
      }

      return usersCollection.findOneAndUpdate(documentQuery, updateStatement)
    })
}

function handlePromiseRejection(reason) {
  const error = reason.message
    ? reason.message
    : reason

  throw new Error(error)
}
