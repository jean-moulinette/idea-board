const { ideasRoutes } = require('./api/ideasRoutes')
const { boardsRoutes } = require('./api/boardsRoutes')
const { usersRoutes } = require('./api/usersRoutes')
const { viewsRoutes } = require('./views/viewsRoutes')

exports.default = {
  ideasRoutes,
  boardsRoutes,
  usersRoutes,
  viewsRoutes,
}
