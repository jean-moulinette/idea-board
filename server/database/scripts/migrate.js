require('dotenv').config()
const { spawn } = require('child_process')

const constraints = require('../seeds/constraints.json')
const { getDatabaseHost, createConstraints, getDatabaseURI } = require('./utils')

main()
  .then(() => console.log('Successfully migrated'))
  .catch(e => console.log(e))

async function main() {
  const { TEST_DATABASE_NAME, DATABASE_NAME } = process.env

  const databaseHost = getDatabaseHost()

  const developementURI = getDatabaseURI(DATABASE_NAME)
  const testURI = getDatabaseURI(TEST_DATABASE_NAME)

  await Promise.all(triggerImport(databaseHost, process.env.DATABASE_NAME, 'developement'))
  await Promise.all(triggerImport(databaseHost, process.env.TEST_DATABASE_NAME, 'test'))

  await createConstraints(developementURI, constraints)
  await createConstraints(testURI, constraints)
}

function triggerImport(databaseURI, databaseName, environement) {
  const importArguments = [
    '--drop',
    '--db',
    databaseName,
    '--host',
    databaseURI,
  ]

  const importFiles = [
    `database/seeds/${environement}/users.json`,
    `database/seeds/${environement}/boards.json`,
  ]

  return importFiles.map(file => createSpawnImportProcess(importArguments, file))
}

function createSpawnImportProcess(importArgs, fileName) {
  return new Promise((resolve, reject) => {
    const importArgsWithFile = [
      ...importArgs,
      '--file',
      fileName,
    ]
    const importProcess = spawn('mongoimport', importArgsWithFile)
    importProcess.on('exit', () => resolve())
    importProcess.on('error', e => reject(e))
  })
}
