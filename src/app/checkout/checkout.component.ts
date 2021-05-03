import { Router } from '@angular/router';
import { PizzaService } from './../services/pizza-service.service';
import { CartService } from './../services/cart.service';
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
    private pizzaService: PizzaService,
    private toasterService: ToastrService,
    private router: Router
  ) {}
  kinds = [];
  items = [];
  finalPrice: number = 0;
  dataLoaded: boolean = true;

  ngOnInit(): void {
    this.getAllPizzaKinds();
  }
  getAllPizzaKinds() {
    this.kinds = this.pizzaService.getAllData();
    this.getAllCartItems();
  }
  getAllCartItems() {
    this.items = this.cartService.getAllData();
    this.items.sort((a, b) => a.Code - b.Code);
    this.finalizeData();
  }

  finalizeData() {
    this.dataLoaded = false;
    setTimeout(() => {
      this.dataLoaded = true;
      if (this.items.length > 0) {
        this.mapOnData();
      } else {
        this.router.navigate(['/Store-Products']);
        this.toasterService.error('Sorry, you have no items in the cart');
      }
    }, 1000);
  }
  mapOnData() {
    this.kinds.forEach((kind) => {
      let filteredKind = this.items.filter((element) => {
        return element.Code == kind.Code;
      });
      kind.cartQuantity = filteredKind.length;
      kind.totalPrice = kind.Price * kind.cartQuantity;
      this.finalPrice += kind.totalPrice;
    });
    this.filterData();
  }
  filterData() {
    this.kinds = this.kinds.filter((element) => {
      return element.cartQuantity > 0;
    });
  }
  ngOnDestroy(): void {
    this.cartService.products = [];
    this.cartService.itemsOnCart = 0;
  }
}
