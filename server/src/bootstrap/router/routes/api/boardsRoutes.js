const { HTTP_METHOD } = require('src/bootstrap/router/constants.js')
const { routeFactory } = require('src/bootstrap/router/routes/utils/routeFactory.js')

const { getBoardsForUser } = require('src/controllers/boards-ctrl')

const baseRoute = '/boards'

exports.boardsRoutes = [
  routeFactory(HTTP_METHOD.GET, baseRoute, getBoardsForUser(
    'superuser'
  )),
]