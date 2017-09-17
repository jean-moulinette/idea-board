const { serverFactory } = require('src/bootstrap/server/utils/serverFactory')

exports.bootstrapServer = () => {
  const server = serverFactory()
  server.startServer()

  return server
}
