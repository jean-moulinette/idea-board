require('colors')
const express = require('express')
const { json } = require('body-parser')

const { Database } = require('src/db/utils/dbFactory')
const { requestFactory } = require('src/bootstrap/server/utils/requestFactory')
const { responseFactory } = require('src/bootstrap/server/utils/responseFactory')
const { bootstrapRouter } = require('src/bootstrap/router/')

exports.serverFactory = () => ({

  app: express(),

  server: null,

  startServer() {
    const { env: { NODE_ENV } } = process
    this.port = NODE_ENV === 'test'
      ? process.env.TEST_SERVER_PORT
      : process.env.SERVER_PORT || process.env.PORT

    this.initializeDatabase()
    this.configureServer()

    this.server = this.listen()
  },

  stopServer() {
    this.server.close()
  },

  initializeDatabase: function() {
    Database.connect()
  },

  configureServer: function() {
    this.addMiddleWare(json())
    bootstrapRouter(this)
  },

  addMiddleWare: function(middleware) {
    this.app.use(middleware)
  },

  listen: function() {
    const port = this.port
    const successMessage = `Server running on port: ${port}`.green

    return this.app.listen(port, console.log(successMessage))
  },

  attachRouteHandler: function(httpMethod, path, onRequest) {
    this.app[httpMethod](path, (req, res) => {
      const response = responseFactory(res)
      const request = requestFactory(req)

      const requestBody = request.fetchData(httpMethod)

      onRequest(response, requestBody)
    })
  },

})
