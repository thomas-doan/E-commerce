export interface ICategory {
  id: number;
  category: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
}

export interface IDataCategory {
  data: ICategory[];
}
