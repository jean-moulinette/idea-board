const { Database } = require('src/db/utils/dbFactory')
const { BOARDS_COLLECTION } = require('src/db/boards/constants')
const { UsersRepository } = require('src/repositories/user/users-repo')

function BoardsRepository() {
  return {
    async getOwnedBoardsForUser(userName) {
      let user
      let userBoards

      try {
        user = await UsersRepository.getUserInfos(userName)
      } catch (e) {
        throw new Error(e)
      }

      const { ownedBoards } = user
      const query = {
        _id: {
          $in: ownedBoards,
        },
      }

      // TODO REPLACE WITH BOARDS DB MODEL OBJECT + HANDLE ERROR
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
