import Database from 'src/db/utils/dbFactory'

import { BOARDS_COLLECTION } from './constants'
import { IdeaBoardUser } from '../user'

export interface IdeaBoard { // TODO replace this interface with a board entity subClass
  id: string
  name: string
  description: string
  accessLink: string
  readOnly: boolean
  owners: Array<IdeaBoardUser> // TODO type this with user subClass entity
  guests: Array<IdeaBoardUser> // TODO type this with user subClass entity
  ideas: Array<any> // TODO Replace with a real entity class
}

export default class Board {
  public id: string
  public name: string
  public description: string
  public accessLink: string
  public readOnly: boolean
  public owners: Array<IdeaBoardUser>
  public guests: Array<IdeaBoardUser>
  public ideas: Array<any>

  constructor(board: IdeaBoard) {
    if (board) {
      this.hydrate(board)
    }
  }

  static async findByName(name: string) {
    const query = {
      name,
    }
    const board = await Database.findOneIn(
      BOARDS_COLLECTION,
      query,
    )

    return board
  }

  hydrate(board: IdeaBoard) {
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
