const { getRoute, postRoute } = require('src/bootstrap/router/routes/utils/routeFactory.js')

const baseRoute = '/ideas'

exports.ideasRoutes = [
  getRoute(`${baseRoute}`, response => response.send('ideas GET')),
  postRoute(`${baseRoute}`, response => response.send('ideas POST')),
]
