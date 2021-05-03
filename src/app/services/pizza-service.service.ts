import { Injectable } from '@angular/core';
import * as data from '../Stored-Data.json';

@Injectable({
  providedIn: 'root',
})
export class PizzaService {
  constructor() {}
  choosedElement: number;
  products = (data as any).default;
  itemsOnCart: number = 0;

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
    return this.products;
  }
  editData(code, body) {
    this.findSpecificElement(code);
    this.products.splice(this.choosedElement, 1, body);
  }
  deleteData(code) {
    this.findSpecificElement(code);
    this.products.splice(this.choosedElement, 1);
  }
}
