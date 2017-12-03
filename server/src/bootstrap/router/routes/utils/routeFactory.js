const { HTTP_METHOD } = require('src/bootstrap/router/constants')

/*
 * @function routeFactory
 *
 * @param {string}   method  - An HTTP method
 * @param {string}   path    - The path the route should listen to
 * @param {function} handler - A promise that'll get triggered when the route is matched
 *
 * @return {string} A good string
 */
const routeFactory = (method, path, handler) => ({
  method,
  path,
  handler,
})

module.exports = {
  getRoute: routeFactory.bind(null, HTTP_METHOD.GET),
  postRoute: routeFactory.bind(null, HTTP_METHOD.POST),
  putRoute: routeFactory.bind(null, HTTP_METHOD.PUT),
  allRoute: routeFactory.bind(null, HTTP_METHOD.ALL),
}
