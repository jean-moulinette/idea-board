function onRouteHandlerRejection(e, response) {
  try {
    response.sendJSON(e.message)
  } catch (newError) {
    const errorOutput = newError.message || e.message || e

    throw new Error(`Could not send error back to client:\n${errorOutput} `)
  }
}

function attachRouteToServer(server, route) {
  const { method, path, handler } = route
  const httpMethod = method.toLowerCase()

  const triggerHandler = (response, data) => new Promise((resolve, reject) => {
    try {
      handler(response, data)
      if (handler.catch) {
        handler.catch((e) => {
          onRouteHandlerRejection(e, response)
        })
      }
      resolve()
    } catch (e) {
      onRouteHandlerRejection(e, response)
      reject()
    }

    resolve('Route handler sucessfully passed')
  })

  server.attachRouteHandler(httpMethod, path, triggerHandler)
}

exports.attachRoutes = (server, routes) => {
  routes.forEach(route => attachRouteToServer(server, route))
}
