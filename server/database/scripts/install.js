const { MongoClient } = require('mongodb')

const { getConfig } = require('config')

getConfig()
  .then(createDatabase)
  .catch(handlePromiseRejection)

function createDatabase(config) {
  const {
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_NAME,
  } = config

  const connection = `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`

  MongoClient.connect(connection)
    .then(bootStrapDatabase)
    .then(() => {
      console.log(`Successfully created database: ${DATABASE_NAME}`)
    })
    .catch(handlePromiseRejection)
}

async function bootStrapDatabase(db) {
  console.log('Successfully connected to db server')
  await createUsersCollection(db)
  await createBoardsCollection(db)
  await createIdeasCollection(db)
  db.close()
}

function createUsersCollection(db) {
  return db.createCollection('users')
    .then((collection) => {
      collection.insertOne({
        name: 'superUser',
        ownedBoards: [],
        guestBoards: [],
      })
    })
    .catch(handlePromiseRejection)
}

function createBoardsCollection(db) {
  return db.createCollection('boards')
    .then((collection) => {
      collection.insertOne({
        name: 'example board',
      })
    })
    .catch(handlePromiseRejection)
}

function createIdeasCollection(db) {
  return db.createCollection('ideas')
    .then((collection) => {
      collection.insertOne({
        text: 'Hello World',
        board: 1,
      })
    })
    .catch(handlePromiseRejection)
}

function handlePromiseRejection(reason) {
  throw new Error(reason)
}
