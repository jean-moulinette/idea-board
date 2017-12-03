const { BoardsRepository } = require('src/repositories/boards/boards-repo')

exports.getBoardsForUser = async (response, requestData) => {
  const { user } = requestData

  let boards

  try {
    boards = await BoardsRepository.getOwnedBoardsForUser(user)
  } catch (e) {
    response.setStatus(404)
    response.send(e.message)
  }

  response.sendJSON(boards)
}
