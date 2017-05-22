const { HTTP_METHOD } = require('src/bootstrap/router/constants.js')
const { routeFactory } = require('src/bootstrap/router/utils/routeFactory.js')

const baseRoute = '/ideas'

exports.ideasRoutes = [
  routeFactory(HTTP_METHOD.GET, `${baseRoute}`, response => response.send('ideas')),
]
