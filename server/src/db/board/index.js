const { Database } = require('src/db/utils/dbFactory')
const { BOARDS_COLLECTION } = require('./constants')

module.exports = class Board {
  constructor(board) {
    if (board) {
      this.hydrate(board)
    }
  }

  static async findByName(name) {
    const query = {
      name,
    }
    const board = await Database.findOneIn(
      BOARDS_COLLECTION,
      query,
    )

    return board
  }

  hydrate(board) {
    const {
      id,
      name,
      description,
      accessLink,
      readOnly,
      owners,
      guests,
      ideas,
    } = board

    this.id = id
    this.name = name
    this.description = description
    this.accessLink = accessLink
    this.readOnly = readOnly
    this.owners = owners
    this.guests = guests
    this.ideas = ideas
  }
}
