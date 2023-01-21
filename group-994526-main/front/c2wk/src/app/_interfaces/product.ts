export interface IProduct {
  id_product?: number;
  name: string;
  price: number;
  description: string;
  image: string;
  CategoryId: number;
  UserIdUser: number;
  id_category?: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: null | string;
}

export interface IUserProduct {
  id_product?: number;
  name: string;
  price: number;
  description: string;
  image: string;
  CategoryId: number;
  UserIdUser: number;
  id_category?: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: null | string;
  User: {
    id_user: number;
    username: string;
    email: string;
  };
}

export interface ISingleProduct {
  data: IProduct;
}

export interface IManyProduct {
  data: IProduct[];
}
