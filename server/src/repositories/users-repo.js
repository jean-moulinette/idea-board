const { Database } = require('src/db/utils/dbFactory')
const { USERS_COLLECTION } = require('./constants')

function UsersRepository() {
  return {
    async getUser(name) {
      const user = await Database.findOneIn(
        USERS_COLLECTION,
        {
          name: name,
        }
      )

      return user
    },
  }
}

module.exports.UsersRepository = UsersRepository()
