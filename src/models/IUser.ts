import { IForm } from "./IForm";

export interface IUser {
  id?: number;
  tg_id: number;
  created_at?: string;
  giftTo: number | null;
  form?: IForm[] | null;
}
