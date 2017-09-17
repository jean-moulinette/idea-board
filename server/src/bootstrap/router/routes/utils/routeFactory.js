/*
 * @function routeFactory
 *
 * @param {string}   method  - An HTTP method
 * @param {string}   path    - The path the route should listen to
 * @param {function} handler - A promise that'll get triggered when the route is matched
 *
 * @return {string} A good string
 */
exports.routeFactory = (method, path, handler) => ({
  method,
  path,
  handler,
})
