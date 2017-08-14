const { HTTP_METHOD } = require('src/bootstrap/router/constants')
const { routeFactory } = require('src/bootstrap/router/routes/utils/routeFactory')
const { sendView } = require('src/bootstrap/router/routes/utils/routes-utils')

exports.viewsRoutes = [
  routeFactory(HTTP_METHOD.GET, '/|/index|/index.html', sendView('index.html')),
]
