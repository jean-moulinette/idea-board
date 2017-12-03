const { attachRoutes } = require('./utils/router-utils')
const {
  ideasRoutes,
  boardsRoutes,
  usersRoutes,
  viewsRoutes,
} = require('./routes').default

const apiRoutes = [
  ...usersRoutes,
  ...boardsRoutes,
  ...ideasRoutes,
]

const views = [
  ...viewsRoutes,
]

const routes = [
  ...apiRoutes,
  ...views,
]

exports.bootstrapRouter = (server) => {
  attachRoutes(server, routes)
}
