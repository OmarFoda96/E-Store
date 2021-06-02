import { ProductsModel } from './Products.Interface';
export interface CartModel {
  product: ProductsModel;
  count: number;
  priceProduct: number;
  isDone: boolean;
  createdAt: Date;
  id: number;
}
export interface StatsModel {
  countTransactionDone: string;
  countProduct: string;
  countUserWebsite: string;
}
