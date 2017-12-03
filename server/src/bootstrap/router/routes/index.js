const { baseApi } = require('./api')
const { ideasRoutes } = require('./api/ideas/ideasRoutes')
const { boardsRoutes } = require('./api/boards/boardsRoutes')
const { usersRoutes } = require('./api/users/usersRoutes')
const { viewsRoutes } = require('./views/viewsRoutes')

exports.default = {
  ideasRoutes,
  boardsRoutes,
  usersRoutes,
  baseApi,
  viewsRoutes,
}
