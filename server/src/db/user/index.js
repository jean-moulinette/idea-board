const { Database } = require('../utils/dbFactory')
const { USERS_COLLECTION } = require('./constants')

module.exports = class User {
  constructor(user) {
    if (user) {
      this.hydrate(user)
    }
  }

  static async findByName(name) {
    const user = await Database.findOneIn(
      USERS_COLLECTION,
      {
        name: name,
      }
    )

    return user
  }

  static async findById(userId) {
    const query = {
      id: userId,
    }

    const user = await Database.findOneIn(
      USERS_COLLECTION,
      query,
    )

    return user
  }

  hydrate(user) {
    const {
      id,
      name,
      email,
      emailVerified,
      ownedBoards,
      guestBoards,
    } = user

    this.id = id
    this.name = name
    this.email = email
    this.emailVerified = emailVerified
    this.ownedBoards = ownedBoards
    this.guestBoards = guestBoards
  }

  serialize() {
    if (!this.hydrated) {
      throw new Error('Attempt to serialize unexisiting unhydrated User')
    }

    return {
      id: this.id,
      name: this.name,
      email: this.email,
      emailVerified: this.emailVerified,
      ownedBoards: this.ownedBoards,
      guestBoards: this.guestBoards,
    }
  }
}
