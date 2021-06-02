import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  url = environment.base_url;
  balance = localStorage.getItem('balance');

  constructor(private http: HttpClient) {}
  getAllData() {
    return this.http.get(`${this.url}/api/Products`);
  }
  getAllHistory() {
    return this.http.get(`${this.url}/GetHistoryTransaction`);
  }
  getAllCategories() {
    return this.http.get(`${this.url}/api/Category/`);
  }
  getAllBrands() {
    return this.http.get(`${this.url}/api/Brand/`);
  }
  sendCartItem(body) {
    return this.http.post(`${this.url}/api/Transaction`, body);
  }
  getCartItems(id) {
    return this.http.get(`${this.url}/api/Transaction/${id}`);
  }
  sendMailForOtp(id) {
    return this.http.get(`${this.url}/api/Transaction/SendMailOtp/${id}`);
  }
  confirmSell(id) {
    return this.http.get(`${this.url}/api/Transaction/DoneTransaction/${id}`);
  }

  refund(id) {
    return this.http.get(`${this.url}/api/Transaction/Refund/${id}`);
  }
  getAllStats() {
    return this.http.get(`${this.url}/api/Home/statics`);
  }

  getAllProducts() {
    return this.http.get(`${this.url}/api/Products/`);
  }
  addNewProducts(body) {
    return this.http.post(`${this.url}/api/Products`, body);
  }
  updateProducts(body, id) {
    return this.http.put(`${this.url}/api/Products/change/${id}`, body);
  }
  deleteProducts(id) {
    return this.http.delete(`${this.url}/api/Products/${id}`);
  }
}
