const { serverFactory } = require('src/bootstrap/server/utils/serverFactory.js')

exports.bootstrapServer = () => {
  const server = serverFactory()
  server.startServer()
}
