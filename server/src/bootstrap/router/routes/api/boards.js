const { HTTP_METHOD } = require('src/bootstrap/router/constants.js')
const { routeFactory } = require('src/bootstrap/router/routes/utils/routeFactory.js')

const { getBoards } = require('src/controllers/boards-ctrl')

const baseRoute = '/boards'

exports.boardsRoutes = [
  routeFactory(HTTP_METHOD.GET, baseRoute, getBoards),
]
