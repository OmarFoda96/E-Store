import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from './../../../environments/environment';
import { CartModel } from './../../Models/cart.interface';
import { ProductsModel } from './../../Models/Products.Interface';
import { ProductsService } from './../../services/products.service';
import { Router } from '@angular/router';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private productsService: ProductsService,
    private toasterService: ToastrService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  url = environment.base_url;

  dataLoaded: boolean = false;
  kinds: CartModel[];
  finalPrice: number = 0;
  sellDone: boolean = true;

  ngOnInit(): void {
    this.getAllCartItems();
  }

  getAllCartItems() {
    let cartId = localStorage.getItem('trans');
    this.productsService.getCartItems(cartId).subscribe((data: any) => {
      this.dataLoaded = true;
      this.kinds = data.data;
      this.kinds.forEach((element) => {
        if (!element.isDone) {
          this.sellDone = false;
        }
      });
      this.getfinalPrice();
    });
  }
  getfinalPrice() {
    this.kinds.forEach((element) => {
      this.finalPrice += element.priceProduct * element.count;
    });
  }
  goPayment() {
    this.router.navigate(['/Payment']);
  }
  ngOnDestroy(): void {
    this.cartService.products = [];
    this.cartService.itemsOnCart = 0;
  }
  open(content) {
    this.modalService.open(content);
  }
}
