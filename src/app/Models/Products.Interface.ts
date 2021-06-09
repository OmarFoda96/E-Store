import { CategoriesModel } from './Categories.interface';

export interface ProductsModel {
  id: number;
  image: string;
  count: number;
  price: number;
  descriptionAr: string;
  descriptionEn: string;
  nameAr: string;
  nameEn: string;
  categoryId: number;
  countRefund: number;
  category: CategoriesModel;
  brand: CategoriesModel;
  brandId: number;
  attachment: string[];
}
