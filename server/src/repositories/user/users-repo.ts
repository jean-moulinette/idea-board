import { ERRORS } from './constants'
import User, { IdeaBoardUser } from 'src/db/user'

export default class UsersRepository {
  static async getUserInfos(name: string): Promise<IdeaBoardUser> {
    let user

    try {
      user = await User.findByName(name)
    } catch (e) {
      throw new Error(ERRORS.USER_NOT_FOUND)
    }

    return user
  }
}
