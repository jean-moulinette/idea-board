const { getRoute } = require('src/bootstrap/router/routes/utils/routeFactory')
const { getBoardsForUser } = require('src/controllers/boards-ctrl')

const { BOARDS_BASE_ROUTE } = require('./constants')

exports.boardsRoutes = [
  getRoute(BOARDS_BASE_ROUTE, getBoardsForUser),
]
