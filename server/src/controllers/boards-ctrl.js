const { BoardsRepository } = require('src/repositories/boards-repo')

exports.getBoardsForUser = async (response, requestData) => {
  const { user } = requestData

  let boards

  try {
    boards = await BoardsRepository.getOwnedBoardsForUser(user)
  } catch (e) {
    throw new Error(e)
  }

  response.sendJSON(boards)
}
