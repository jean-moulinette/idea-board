import { IdeaBoardUser } from '../user'

export default class Board {
  public id: string
  public name: string
  public description?: string
  public accessLink?: string
  public readOnly: boolean
  public owners: Array<IdeaBoardUser>
  public guests?: Array<IdeaBoardUser>
  public ideas?: Array<any>
}
