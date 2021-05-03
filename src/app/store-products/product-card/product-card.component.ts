import { CartService } from './../../services/cart.service';
import { PizzaService } from './../../services/pizza-service.service';
import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input('pizza') pizza;
  constructor(
    private pizzaService: PizzaService,
    private cartService: CartService,
    private toasterService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }
  pizzas = [];

  getAllProducts() {
    this.pizzas = this.pizzaService.getAllData();
  }
  itemsArray: any[] = [];

  increaseCart(pizza) {
    let pizzaCategory = this.pizzas.find((element) => {
      return element.Code == pizza.Code;
    });
    if (this.itemsArray.length < pizzaCategory.Quantity) {
      this.itemsArray.push(pizza);
      this.cartService.addNewData(pizza);
    } else {
      this.toasterService.error(
        "Sorry, We Don't have pizza of this kind anymore",
        'Addition Failed'
      );
    }
  }

  decreaseCart(pizza) {
    let pizzaCategory = this.pizzas.findIndex((element) => {
      return element.Code == pizza.Code;
    });

    this.itemsArray.splice(this.itemsArray.length - 1, 1);
    this.cartService.deleteData(pizza.code);
  }
}
