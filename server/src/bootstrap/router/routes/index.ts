import baseApi from './api'
import ideasRoutes from './api/ideas/ideasRoutes'
import boardsRoutes from './api/boards/boardsRoutes'
import usersRoutes from './api/users/usersRoutes'
import viewsRoutes from './views/viewsRoutes'

export default {
  ideasRoutes,
  boardsRoutes,
  usersRoutes,
  baseApi,
  viewsRoutes,
}

export type RoutePath = string;
