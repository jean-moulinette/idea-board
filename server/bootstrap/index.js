const { serverFactory } = require('bootstrap/utils.js')

exports.bootstrapServer = () => {
  const { env: { PORT } } = process
  createServer(PORT)
}

function createServer(port) {
  const server = serverFactory()
  server.startServer(port)
}
