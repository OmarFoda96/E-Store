import { ProductsModel } from './../Models/Products.Interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  choosedElement: number;
  products: ProductsModel[] = [];
  itemsOnCart: number;

  findSpecificElement(code) {
    this.choosedElement = this.products.findIndex((element) => {
      return element.id == code;
    });
  }
  getAllData() {
    return this.products;
  }
  addNewData(body) {
    this.products.push(body);
    this.itemsOnCart = this.products.length;
    return this.products;
  }
  editData(code, body) {
    this.findSpecificElement(code);
    this.products.splice(this.choosedElement, 1, body);
    return this.products;
  }
  deleteData(code) {
    this.findSpecificElement(code);
    this.products.splice(this.choosedElement, 1);
    this.itemsOnCart = this.products.length;
    return this.products;
  }
}
