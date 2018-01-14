const { Database } = require('../utils/dbFactory')
const { USERS_COLLECTION } = require('./constants')

export interface IdeaBoardUser { // TODO replace this interface with a user entity subClass
  id: string
  name: string
  email: string
  emailVerified: boolean
  ownedBoards: any[] // TODO Replace with real interface
  guestBoards: any[] // TODO Replace with real interface
}

export default class User {
  private id: string
  private name: string
  private email: string
  private emailVerified: boolean
  private ownedBoards: any[] // TODO Replace with real interface
  private guestBoards: any[] // TODO Replace with real interface
  
  public hydrated: boolean

  public constructor(user: IdeaBoardUser) {
    this.hydrated = false

    if (user) {
      this.hydrate(user)
    }
  }

  public static async findByName(name: string) {
    const user = await Database.findOneIn(
      USERS_COLLECTION,
      {
        name: name,
      }
    )

    return user
  }

  public static async findById(userId: string) {
    const query = {
      id: userId,
    }

    const user = await Database.findOneIn(
      USERS_COLLECTION,
      query,
    )

    return user
  }

  public hydrate(user: IdeaBoardUser) {
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
