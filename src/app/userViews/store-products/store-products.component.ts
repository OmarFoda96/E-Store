import { Router } from '@angular/router';
import { element } from 'protractor';
import { CartService } from './../../services/cart.service';
import { CategoriesModel } from './../../Models/Categories.interface';
import { ProductsModel } from './../../Models/Products.Interface';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-store-products',
  templateUrl: './store-products.component.html',
  styleUrls: ['./store-products.component.css'],
})
export class StoreProductsComponent implements OnInit {
  dataLoaded: boolean = true;

  products: ProductsModel[];
  fullProducts: ProductsModel[];
  categories: CategoriesModel[];
  brands: CategoriesModel[];
  constructor(
    private productsService: ProductsService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private toasterService: ToastrService,
    public cartService: CartService,
    private router: Router
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
    config.size = 'xl';
    config.scrollable = true;
    config.centered = true;
  }
  ngOnInit(): void {
    this.getAllData();
    this.getAllCategories();
    this.getAllBrands();
  }

  getAllData() {
    this.dataLoaded = false;
    this.productsService.getAllData().subscribe((data: any[]) => {
      this.products = data;
      this.fullProducts = data;
      this.dataLoaded = true;
    });
  }

  getAllCategories() {
    this.dataLoaded = false;
    this.productsService.getAllCategories().subscribe((data: any[]) => {
      this.categories = data;
      this.dataLoaded = true;
    });
  }
  getAllBrands() {
    this.dataLoaded = false;
    this.productsService.getAllBrands().subscribe((data: any[]) => {
      this.brands = data;
      this.dataLoaded = true;
    });
  }

  searchByPrice(e) {
    this.products = this.fullProducts;
    if (e.target.value != '') {
      this.products = this.products.filter((element) => {
        return element.price === +e.target.value;
      });
    } else {
      this.products = this.fullProducts;
    }
  }
  searchByCategory(e) {
    this.products = this.fullProducts;
    if (e.target.value != '') {
      this.products = this.products.filter((element) => {
        return element.categoryId === +e.target.value;
      });
    } else {
      this.products = this.fullProducts;
    }
  }
  searchByBrand(e) {
    this.products = this.fullProducts;
    if (e.target.value != '') {
      this.products = this.products.filter((element) => {
        return element.brandId === +e.target.value;
      });
    } else {
      this.products = this.fullProducts;
    }
  }
  searchByName(e) {
    this.products = this.fullProducts;
    if (e.target.value != '') {
      this.products = this.products.filter((element) => {
        return element.nameAr.includes(e.target.value);
      });
    } else {
      this.products = this.fullProducts;
    }
  }

  totalPrice: number = 0;
  getFinalPrice() {
    let currentProducts = this.cartService.products;
    currentProducts.forEach((element) => {
      this.totalPrice += element.price;
    });
  }

  newProduct = [];
  goCart(content) {
    this.getFinalPrice();
    this.modalService.open(content);
    let currentProducts = this.cartService.products;
    currentProducts.sort((a, b) => {
      return a.id - b.id;
    });
    for (let i = 0; i < currentProducts.length; i++) {
      if (this.newProduct.length > 0) {
        let x = this.newProduct.find((el) => {
          return el.productId === currentProducts[i].id;
        });

        if (x) {
          x.count++;
        } else {
          this.newProduct.push({
            productId: currentProducts[i].id,
            count: 1,
          });
        }
      } else {
        this.newProduct.push({
          productId: currentProducts[i].id,
          count: 0,
        });
        i--;
      }
    }
  }

  balance = parseFloat(localStorage.getItem('balance'));
  sendCartItem(productList, paymentWay) {
    let body = {
      product: productList,
      isDone: false,
      totalPrice: this.totalPrice,
      paymentType: paymentWay,
    };
    this.dataLoaded = false;
    this.productsService.sendCartItem(body).subscribe((data: any) => {
      localStorage.setItem('trans', data.data);
      if (paymentWay) {
        this.productsService.confirmSell(data.data).subscribe((data) => {
          this.modalService.dismissAll();
          this.dataLoaded = true;
          this.router.navigate(['/Checkout']);
        });
      } else {
        this.router.navigate(['/Checkout']);
      }
    });
  }

  goPayment(paymentWay) {
    this.dataLoaded = false;
    if (paymentWay) {
      if (this.balance < this.totalPrice) {
        this.dataLoaded = true;
        this.toasterService.error(
          'عملية غير ناجحة',
          'عفواً, رصيدك لا يكفي لإتمام عملية الشراء'
        );
      } else {
        this.dataLoaded = true;
        this.sendCartItem(this.newProduct, paymentWay);
        this.balance = this.balance - this.totalPrice;
        localStorage.setItem('balance', this.balance.toString());
        this.productsService.balance = this.balance.toString();
      }
    } else {
      this.dataLoaded = true;
      this.sendCartItem(this.newProduct, paymentWay);
      this.modalService.dismissAll();
    }
  }
}
