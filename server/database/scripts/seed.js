const readline = require('readline')
const { MongoClient } = require('mongodb')

const { getConfig } = require('utils/config')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

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
    .then(seedDatabase)
    .catch(handlePromiseRejection)
}

async function seedDatabase(db) {
  const usersCollection = await getCollection('users', db)
  const boardsCollection = await getCollection('boards', db)

  const user = await promptLogin()
  await insertUser(usersCollection, user)

  await insertBoardForUser({
    boardsCollection,
    usersCollection,
    userName: user,
    boardName: `${user}'s board`,
  })

  console.log('\nSuccessfully seeded database')

  return db.close()
}

function getCollection(name, db) {
  return db.collection(name)
}

function promptLogin() {
  return new Promise((resolve, reject) => {
    const question = 'Choose a login for your super user: '
    rl.question(question, (login) => {
      const errorMsg = 'You must provide a login for your first user, operation avorted :('
      if (!login) {
        reject(errorMsg)
      }
      resolve(login)
      rl.close()
    })
  })
    .catch((reason) => {
      throw new Error(reason)
    })
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
  const error = reason.message
    ? reason.message
    : reason

  throw new Error(error)
}
