import ResponseFactory from 'src/bootstrap/server/utils/responseFactory'

import { getRoute, postRoute } from '../../utils/routeFactory.js'
import { IDEA_BASE_ROUTE } from './constants'

export default [
  getRoute(`${IDEA_BASE_ROUTE}`, function (response: ResponseFactory) {
    response.send('ideas GET')
  }),
  postRoute(`${IDEA_BASE_ROUTE}`, function(response: ResponseFactory) {
    response.send('ideas POST')
  }),
]
