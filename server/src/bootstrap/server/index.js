const { serverFactory } = require('src/bootstrap/server/utils/serverFactory.js')

exports.bootstrapServer = () => {
  const { env: { PORT } } = process

  const server = serverFactory()
  server.startServer(PORT)
}
