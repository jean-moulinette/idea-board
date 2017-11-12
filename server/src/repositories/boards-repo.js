const { Database } = require('src/db/utils/dbFactory')
const { UsersRepository } = require('src/repositories/users-repo')
const { BOARDS_COLLECTION } = require('./constants')

function BoardsRepository() {
  return {
    async getOwnedBoardsForUser(userName) {
      let user
      let userBoards

      try {
        user = await UsersRepository.getUser(userName)
      } catch (e) {
        throw new Error(e)
      }
      const { ownedBoards } = user

      const query = {
        _id: {
          $in: ownedBoards,
        },
      }

      try {
        userBoards = await Database.findIn(BOARDS_COLLECTION, query)
      } catch (e) {
        throw new Error(e)
      }

      return userBoards
    },
  }
}

module.exports.BoardsRepository = BoardsRepository()
