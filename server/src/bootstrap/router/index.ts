import ServerFactory from 'src/bootstrap/server/utils/serverFactory'
import { attachRoutes } from './utils/router-utils'
import ideaBoardRoutes from './routes'

const {
  ideasRoutes,
  boardsRoutes,
  // usersRoutes,
  viewsRoutes,
} = ideaBoardRoutes

const apiRoutes = [
  // ...usersRoutes,
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

export const bootstrapRouter = (server: ServerFactory) => {
  attachRoutes(server, routes)
}
