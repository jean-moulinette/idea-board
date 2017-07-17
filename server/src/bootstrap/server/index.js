const { serverFactory } = require('src/bootstrap/server/utils/serverFactory.js')

exports.bootstrapServer = () => {
  const { SERVER_PORT } = process.config

  const server = serverFactory()
  server.startServer(SERVER_PORT)
}
