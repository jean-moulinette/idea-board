import ServerFactory from 'src/bootstrap/server/utils/serverFactory'
import ResponseFactory from 'src/bootstrap/server/utils/responseFactory'
import { RequestData } from 'src/bootstrap/server/utils/requestFactory'
import { RouteConfigurationObject, RouteHandler } from 'src/bootstrap/router/routes/utils/routeFactory'
import { HttpMethodNameLower } from 'src/bootstrap/router/constants'

function onRouteHandlerRejection(e: Error, response: ResponseFactory) {
  try {
    response.sendJSON(e.message)
  } catch (newError) {
    const errorOutput = newError.message || e.message || e

    throw new Error(`Could not send error back to client:\n${errorOutput} `)
  }
}

function createSafeHandler(handler: RouteHandler) {
  return function(response: ResponseFactory, data: RequestData){
    return new Promise<string>((resolve, reject) => {
      try {
       const result = handler(response, data)

       if (result instanceof Promise) {        
        result
          .then(() => {
            resolve('Route handler failed to execute')
          })
          .catch((e: Error) => {
            onRouteHandlerRejection(e, response)
            reject('Route handler failed to execute')
          })
       }
      } catch (e) {
        onRouteHandlerRejection(e, response)
        reject('Route handler failed to execute')
      }

      resolve('Route handler sucessfully passed')
    })
  }
}

function attachRouteToServer(server: ServerFactory, route: RouteConfigurationObject) {
  const { method, path, handler } = route
  const httpMethod = <HttpMethodNameLower>method.toLowerCase()

  const safeHandler = createSafeHandler(handler)

  server.attachRouteHandler(httpMethod, path, safeHandler)
}

export function attachRoutes(server: ServerFactory, routes: RouteConfigurationObject[]) {
  routes.forEach(route => attachRouteToServer(server, route))
}
