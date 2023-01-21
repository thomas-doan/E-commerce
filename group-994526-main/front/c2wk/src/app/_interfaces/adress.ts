export interface IAdress {
  id: number;
  pays: string;
  ville: string;
  adresse_of_user: number;
  cp: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
  UserIdUser: number;
}

export interface IDataAdress {
  data: IAdress[];
}
