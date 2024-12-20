import { IForm } from "./IForm";
import { IUserInRoom } from "./IUserInRoom";

export interface IUser {
  id?: number;
  tg_id: number;
  created_at?: string;
  form?: IForm[] | null;
  roomDescr?: IUserInRoom[] | null
}
