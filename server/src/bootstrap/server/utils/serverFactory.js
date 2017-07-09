require('colors')
const express = require('express')
const { json } = require('body-parser')
const { requestFactory } = require('src/bootstrap/server/utils/requestFactory.js')
const { responseFactory } = require('src/bootstrap/server/utils/responseFactory.js')
const { bootstrapRouter } = require('src/bootstrap/router/')

exports.serverFactory = () => ({

  server: express(),

  port: null,

  startServer(port) {
    this.port = port

    this.configureServer()
    this.listen()
  },

  configureServer: function() {
    bootstrapRouter(this)
    this.addMiddleWare(json())
    this.addMiddleWare(this.handleForbiddenRoutes)
  },

  addMiddleWare: function(middleware) {
    this.server.use(middleware)
  },

  handleForbiddenRoutes: function(req, res) {
    const response = responseFactory(res)

    response.setStatus(404)
    response.send('Nope')
  },

  listen: function() {
    const port = this.port
    const successMessage = `Server running on port: ${port}`.green

    this.server.listen(port, console.log(successMessage))
  },

  attachRouteHandler: function(httpMethod, path, onRequest) {
    this.server[httpMethod](path, (req, res) => {
      const response = responseFactory(res)
      const request = requestFactory(req)

      const requestBody = request.fetchData(httpMethod)

      onRequest(response, requestBody)
    })
  },

})
