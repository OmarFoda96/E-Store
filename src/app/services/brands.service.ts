import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  url = environment.base_url;

  constructor(private http: HttpClient) {}

  getAllBrands() {
    return this.http.get(`${this.url}/api/Brand/`);
  }
  addNewBrands(body) {
    return this.http.post(`${this.url}/api/Brand`, body);
  }
  updateBrands(body) {
    return this.http.put(`${this.url}/api/Brand`, body);
  }
  deleteBrands(id) {
    return this.http.delete(`${this.url}/api/Brand/${id}`);
  }
}
