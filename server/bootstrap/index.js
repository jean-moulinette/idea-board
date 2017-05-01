const express = require('express')
const bodyParser = require('body-parser')
const colors = require('colors')

const routesBootsraper = require('./routes/index.js')

exports.init = () => {
  const { env: { PORT } } = process

  const server = createServer()
  startServer(server, PORT)
};

function createServer() {
  const server = express()
  configureServer(server)
  routesBootsraper.initRoutes(server)

  return server
}

function configureServer(server) {
  server.use(bodyParser.json())
}

function startServer(server, port) {
  const successMessage = `Server running on port: ${port}`.green
  server.listen(port, () => console.log(successMessage))
}
