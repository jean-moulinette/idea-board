function attachRouteToServer(server, route) {
  const { method, path, handler } = route

  const httpMethod = method.toLowerCase()
  const onRequest = (response, data) => {
    handler(response, data)
      .catch((e) => {
        response.sendJSON(e.message)
      })
  }

  server.attachRouteHandler(httpMethod, path, onRequest)
}

exports.attachRoutes = (server, routes) => {
  routes.forEach(route => attachRouteToServer(server, route))
}
