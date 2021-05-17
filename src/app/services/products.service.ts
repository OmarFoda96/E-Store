import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  url = environment.base_url;

  constructor(private http: HttpClient) {}
  getAllData(){
    return this.http.get(`${this.url}/api/Products`);
  }
  getAllCategories() {
    return this.http.get(`${this.url}/api/Category/`);
  }
}
