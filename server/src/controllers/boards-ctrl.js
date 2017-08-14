const { BoardsRepository } = require('src/repositories/boards-repo')

exports.getBoardsForUser = function(userName) {
  return async (response) => {
    const boards = await BoardsRepository.getBoardsForUser(userName)
    response.sendJSON(boards)
  }
}
