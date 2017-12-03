const { getRoute } = require('../utils/routeFactory')
const { sendView } = require('../utils/routes-utils')

exports.viewsRoutes = [
  getRoute('/', sendView('index.html')),
  getRoute('*', sendView('404.html')),
]
