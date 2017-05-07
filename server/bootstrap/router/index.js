const { routeFactory } = require('bootstrap/router/utils.js')
const { HTTP_METHOD } = require('bootstrap/router/constants.js')

const defaultRoutes = [
  routeFactory(HTTP_METHOD.GET, '/', handleDefault),
  routeFactory(HTTP_METHOD.POST, '/', handleDefault),
  routeFactory(HTTP_METHOD.ALL, '*', forbiddenHandler),
]

const routes = [
  ...defaultRoutes,
]

exports.attachRoutes = (server) => {
  routes.forEach(route => attachRouteToServer(server, route));
};

function attachRouteToServer(server, route) {
  const { method, path, handler } = route

  const httpMethod = method.toLowerCase()
  const onRequest = (response, data) => {
    handler(response, data)
  }

  server.attachRouteHandler(httpMethod, path, onRequest)
}

function handleDefault(response, data) {
  console.log(data)
  response.send('Hello world');
}

function forbiddenHandler(response) {
  response.send('nope')
}
