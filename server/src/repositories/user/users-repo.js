const ERRORS = require('./constants')
const User = require('src/db/user')

function UsersRepository() {
  return {
    async getUserInfos(name) {
      let user

      try {
        user = await User.findByName(name)
      } catch (e) {
        throw new Error(ERRORS.USER_NOT_FOUND)
      }

      return user
    },
  }
}

module.exports.UsersRepository = UsersRepository()
