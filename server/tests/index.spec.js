/* eslint-disable global-require */
require('dotenv').config()

process.on('unhandledRejection', (_, rejectedPromise) => {
  const errorMsg = 'Promise rejection catched in server\'s testing process'
  console.log(`\n${errorMsg}\n Promise: `, rejectedPromise)
})

before(async () => {
  // eslint-disable-next-line no-undef
  app = require('src/bootstrap/server').ideaBoard.startServer()
})

after(async () => {
  require('src/bootstrap/server').ideaBoard.stopServer()
})
