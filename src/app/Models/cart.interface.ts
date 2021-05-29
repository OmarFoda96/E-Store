import { ProductsModel } from './Products.Interface';
export interface CartModel {
  product: ProductsModel;
  count: number;
  priceProduct: number;
  isDone: boolean;
}
