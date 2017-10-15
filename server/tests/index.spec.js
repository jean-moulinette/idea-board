/* eslint-disable global-require */
before(async () => {
  // eslint-disable-next-line no-undef
  app = require('src/bootstrap/server').ideaBoard.startServer()
})

after(async () => {
  require('src/bootstrap/server').ideaBoard.stopServer()
})
