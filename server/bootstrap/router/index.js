const { HTTP_METHOD } = require('bootstrap/router/constants.js')
const { routeFactory } = require('bootstrap/router/utils/routeFactory.js')
const { attachRoutes }  = require('bootstrap/router/utils/utils.js')

const defaultRoutes = [
  routeFactory(HTTP_METHOD.GET, '/', handleDefault),
  routeFactory(HTTP_METHOD.POST, '/', handleDefault),
]

const routes = [
  ...defaultRoutes,
]

function handleDefault(response, data) {
  console.log(data)
  response.send('Hello world');
}

exports.bootstrapRouter = (server) => {
  attachRoutes(server, routes)
}
