import { ProductsModel } from './../../../Models/Products.Interface';
import { ProductsService } from './../../../services/products.service';
import { CartService } from './../../../services/cart.service';
import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input('product') product: ProductsModel;
  url = environment.base_url;

  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private toasterService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }
  products: ProductsModel[] = [];

  getAllProducts() {
    this.productsService.getAllData().subscribe((data: any[]) => {
      this.products = data;
    });
  }
  itemsArray: any[] = [];

  increaseCart(product) {
    let productCategory = this.products.find((element) => {
      return element.id == product.id;
    });
    if (this.itemsArray.length < productCategory.count) {
      this.itemsArray.push(product);
      this.cartService.addNewData(product);
    } else {
      this.toasterService.error(
        'عفواً, لا وجد المزيد من هذا المنتج',
        'إضافة غير ناجحة'
      );
    }
  }

  decreaseCart(product) {
    this.itemsArray.splice(this.itemsArray.length - 1, 1);
    this.cartService.deleteData(product.id);
  }
}
