const { getRoute } = require('src/bootstrap/router/routes/utils/routeFactory')
const { sendView } = require('src/bootstrap/router/routes/utils/routes-utils')

exports.viewsRoutes = [
  getRoute('/|/index|/index.html', sendView('index.html')),
]
