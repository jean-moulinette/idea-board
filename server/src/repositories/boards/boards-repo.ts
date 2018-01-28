import Database from 'src/db/utils/dbFactory'
import { BOARDS_COLLECTION } from 'src/db/board/constants'
import Board from 'src/db/board/Board'
import UsersRepository from 'src/repositories/user/users-repo'

export default class BoardsRepository {
  static async getOwnedBoardsForUser(userName: string): Promise<Board[]> {
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
  }
}
