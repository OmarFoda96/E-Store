import { PizzaService } from './../services/pizza-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css'],
})
export class MainViewComponent implements OnInit {
  constructor(private pizzaService: PizzaService) {}

  pizzas;
  ngOnInit(): void {
    this.getAllPizza();
  }
  getAllPizza() {
    this.pizzas = this.pizzaService.getAllData();
  }
}
