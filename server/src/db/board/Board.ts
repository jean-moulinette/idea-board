import { IdeaBoardUser } from '../user';

export default class Board {
  public id: string;
  public name: string;
  public description?: string;
  public accessLink?: string;
  public readOnly: boolean;
  public owners: IdeaBoardUser[];
  public guests?: IdeaBoardUser[];
  public ideas?: any[];
}
