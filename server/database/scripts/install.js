const { MongoClient } = require('mongodb')

const { getConfig } = require('utils/config')

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

  const user = 'superUser'

  const usersCollection = await createUsersCollection(db)
  await createUniqueDocumentIndex({
    collection: usersCollection,
    name: 'userNameUnique',
    field: 'name',
  })
  await insertUser(usersCollection, user)

  const boardsCollection = await createBoardsCollection(db)
  await insertBoardForUser({
    boardsCollection,
    usersCollection,
    userName: user,
    boardName: 'superUser\'s board',
  })

  db.close()
}

function createUniqueDocumentIndex({
  collection,
  name,
  field,
}) {
  return collection.createIndex(name, { [field]: 1 }, { unique: true })
}

function createUsersCollection(db) {
  return db.createCollection('users')
    .catch(handlePromiseRejection)
}

function insertUser(collection, userName) {
  return collection.insertOne({
    name: userName,
    ownedBoards: [],
    guestBoards: [],
  })
    .catch(handlePromiseRejection)
}

function createBoardsCollection(db) {
  return db.createCollection('boards')
    .catch(handlePromiseRejection)
}

function insertBoardForUser({
  boardsCollection,
  usersCollection,
  userName,
  boardName,
}) {
  const ideas = []

  for (let i = 0; i < 5; i += 1) {
    ideas.push(generateIdea())
  }

  return boardsCollection.insertOne({
    name: boardName,
    ideas,
  })
    .then((opResult) => {
      const { insertedId } = opResult

      const documentQuery = {
        name: userName,
      }
      const updateStatement = {
        $set: {
          ownedBoards: [insertedId],
        },
      }

      return usersCollection.findOneAndUpdate(documentQuery, updateStatement)
    })
}

function generateIdea() {
  return {
    text: 'Hello my friend',
    creationDate: new Date().toISOString(),
  }
}

function handlePromiseRejection(reason) {
  throw new Error(reason)
}
