const routesUtils = require('./utils.js')
const { routeFactory } = routesUtils

const defaultRoutes = [
  routeFactory('GET', '/', handleDefault),
  routeFactory('POST', '/', handleDefault),
  routeFactory('ALL', '*', forbiddenHandler),
]

const routes = [
  ...defaultRoutes,
]

exports.initRoutes = (server) => {
  injectRoutesInServer(routes, server)
};

function injectRoutesInServer(routes, server) {
  routes.forEach((route) => {
    const { method, path, handler } = route
    const httpMethod = method.toLowerCase()

    server[httpMethod](path, (req, res) => {
      callHandlerWithParams(req, res, handler, httpMethod)
    })
  });
}

function callHandlerWithParams(request, response, handler, method) {
  const { paramsResolver, responseFactory } = routesUtils

  const data = paramsResolver[method]
    ? paramsResolver[method](request)
    : {}
  const responseObject = responseFactory(response)
  
  handler(data, responseObject);
}

function handleDefault(data, response) {
  console.log(data)
  response.send('Hello world');
}

function forbiddenHandler(data, response) {
  response.send('nope')
}