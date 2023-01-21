export interface IUserAdress {
  User: {
    username: string;
    email: string;
    fk_role: number;
    password: string;
  };
  UserIdUser: number;
  id: number;
  adresse_of_user: string;
  cp: number;
  ville: string;
  pays: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
}

export interface ISingleUserAdress {
  data: IUserAdress;
}
