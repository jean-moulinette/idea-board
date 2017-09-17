const { serverFactory } = require('src/bootstrap/server/utils/serverFactory')

const server = serverFactory()

exports.ideaBoardServer = server.server
exports.ideaBoardApp = server.app
exports.ideaBoard = server
