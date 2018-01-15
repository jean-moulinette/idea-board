import ResponseFactory from 'src/bootstrap/server/utils/responseFactory'
import { RequestData } from 'src/bootstrap/server/utils/requestFactory'
import { HTTP_METHOD, HttpMethodNameUpper } from 'src/bootstrap/router/constants'

import { RoutePath } from '../'
import { partial } from 'lodash'

type SyncHandler = (response: ResponseFactory, requestData: RequestData) => void
type PromiseHandler = (response: ResponseFactory, requestData: RequestData) => Promise<void>
export type RouteHandler = SyncHandler | PromiseHandler

export interface RouteConfigurationObject {
  method: HttpMethodNameUpper
  path: RoutePath
  handler: RouteHandler
}

const routeFactory = (
  method: HttpMethodNameUpper,
  path: RoutePath,
  handler: RouteHandler,
) => ({ method, path, handler})

export const getRoute = partial(routeFactory, HTTP_METHOD.GET)
export const postRoute = partial(routeFactory, HTTP_METHOD.POST)
export const putRoute = partial(routeFactory, HTTP_METHOD.PUT)
export const allRoute = partial(routeFactory, HTTP_METHOD.ALL)
