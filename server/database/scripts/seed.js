const readline = require('readline')
const { MongoClient } = require('mongodb')

const { config } = require('src/utils/config')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

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
    const superUserName = await promptLogin()
    await seedDatabase(db, superUserName)
    console.log('\nSuccessfully seeded database')
  } catch (e) {
    handlePromiseRejection(e)
  }

  if (!TEST_DATABASE_NAME) {
    throw new Error('Unable to find test database name. You won\'t be able to run tests')
  }

  // Test database seed
  const testConnection = `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${TEST_DATABASE_NAME}`

  try {
    const db = await MongoClient.connect(testConnection)
    await seedDatabase(db, 'test-super-user')
    console.log('\nSuccessfully seeded test database')
  } catch (e) {
    handlePromiseRejection(e)
  }
}

async function seedDatabase(db, user) {
  const usersCollection = await getCollection('users', db)
  const boardsCollection = await getCollection('boards', db)

  await insertUser(usersCollection, user)

  await insertBoardForUser({
    boardsCollection,
    usersCollection,
    userName: user,
    boardName: `${user}'s board`,
  })

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
