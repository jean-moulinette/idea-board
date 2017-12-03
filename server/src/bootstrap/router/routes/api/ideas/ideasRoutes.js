const { getRoute, postRoute } = require('src/bootstrap/router/routes/utils/routeFactory.js')
const { IDEA_BASE_ROUTE } = require('./constants')

exports.ideasRoutes = [
  getRoute(`${IDEA_BASE_ROUTE}`, response => response.send('ideas GET')),
  postRoute(`${IDEA_BASE_ROUTE}`, response => response.send('ideas POST')),
]
