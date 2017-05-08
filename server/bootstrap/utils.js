require('colors')
const express = require('express')
const { json } = require('body-parser')

const { attachRoutes }  = require('bootstrap/router')

exports.serverFactory = (server) => ({

  server: express(),

  port: null,

  startServer: function(port) {
    this.port = port

    this.configureServer()
    this.listen()
  },

  configureServer: function() {
    attachRoutes(this)
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

    this.server.listen(port, () => console.log(successMessage))
  },

  attachRouteHandler: function(httpMethod, path, onRequest) {
    this.server[httpMethod](path, (req, res) => {
      const response = responseFactory(res)
      const request = requestFactory(req)

      const requestBody = request.fetchData(httpMethod)

      onRequest(response, requestBody)
    })
  }

})

const responseFactory = (response) => ({

  send: function(data) {
    response.send(data)
  },

  setStatus: function(status) {
    response.status(status)
  },

})

const requestFactory = (request) => ({

  dataResolverFactory: function() {
    return {
      get: this.fetchGetParams,
      post: this.fetchPostParams,
    }
  },

  fetchGetParams: function() {
    return request.query
  },

  fetchPostParams: function() {
    return request.body
  },

  fetchData: function(httpMethod){
    const dataResolver = this.dataResolverFactory()

    return dataResolver[httpMethod]
      ? dataResolver[httpMethod]()
      : {}
  }

})
