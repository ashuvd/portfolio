import {IUser} from "@/types";

export interface IUsersState {
  loading: boolean,
  user: IUser;
  users: IUser[];
}
