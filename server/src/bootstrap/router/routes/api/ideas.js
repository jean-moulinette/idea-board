const { HTTP_METHOD } = require('src/bootstrap/router/constants.js')
const { routeFactory } = require('src/bootstrap/router/routes/utils/routeFactory.js')

const baseRoute = '/ideas'

exports.ideasRoutes = [
  routeFactory(HTTP_METHOD.GET, `${baseRoute}`, response => response.send('ideas GET')),
  routeFactory(HTTP_METHOD.POST, `${baseRoute}`, response => response.send('ideas POST')),
]
