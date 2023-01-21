export interface IUser {
  id_user: number;
  username: string;
  email: string;
  fk_role: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
  password: string;
}

export interface ISingleUser {
  data: IUser;
}

export interface IDataUser {
  data: IUser[];
}
