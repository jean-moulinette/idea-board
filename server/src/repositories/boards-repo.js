const { Database } = require('src/model/utils/databaseFactory')
const { UsersRepository } = require('src/repositories/users-repo')
const { BOARDS_COLLECTION } = require('./constants')

function BoardsRepository() {
  return {
    async getBoardsForUser(userName) {
      const user = await UsersRepository.getUser(userName)
      const { ownedBoards } = user

      const userBoards = await Database.findIn(
        BOARDS_COLLECTION,
        {
          _id: {
            $in: ownedBoards,
          },
        }
      )

      return userBoards
    },
  }
}

module.exports.BoardsRepository = BoardsRepository()
