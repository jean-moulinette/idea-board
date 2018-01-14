import ResponseFactory from 'src/bootstrap/server/utils/responseFactory'
import { RequestData } from 'src/bootstrap/server/utils/requestFactory'
import { HTTP_METHOD, HttpMethodNameUpper } from 'src/bootstrap/router/constants'

import { RoutePath } from '../'

type SyncHandler = (response: ResponseFactory, requestData: RequestData) => void
type PromiseHandler = (response: ResponseFactory, requestData: RequestData) => Promise<void>
export type RouteHandler = SyncHandler | PromiseHandler

export interface RouteConfigurationObject {
  method: HttpMethodNameUpper
  path: RoutePath
  handler: RouteHandler
}

function createRouteFactory(method: HttpMethodNameUpper) {
  return function routeFactory(
    path: RoutePath,
    handler: RouteHandler
  ) {
    return {
      method,
      path,
      handler
    }
  }
}

export const getRoute = createRouteFactory(HTTP_METHOD.GET)
export const postRoute = createRouteFactory(HTTP_METHOD.POST)
export const putRoute = createRouteFactory(HTTP_METHOD.PUT)
export const allRoute = createRouteFactory(HTTP_METHOD.ALL)
