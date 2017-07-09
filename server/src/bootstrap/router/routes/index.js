const { ideasRoutes } = require('./api/ideas')
const { boardsRoutes } = require('./api/boards')
const { usersRoutes } = require('./api/users')
const { viewsRoutes } = require('./views/views')

exports.default = {
  ideasRoutes,
  boardsRoutes,
  usersRoutes,
  viewsRoutes,
}
