const { BoardsRepository } = require('src/repositories/boards-repo')

exports.getBoards = async (response) => {
  const ideas = BoardsRepository.getBoards()

  response.send(JSON.stringify(ideas))
}
