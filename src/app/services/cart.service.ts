import { Injectable } from '@angular/core';
import * as cartData from '../Cart-Data.json';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  choosedElement: number;
  products = (cartData as any).default;
  itemsOnCart: number;

  findSpecificElement(code) {
    this.choosedElement = this.products.findIndex((element) => {
      return element.Code == code;
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
