import { CartService } from './../../services/cart.service';
import { PizzaService } from './../../services/pizza-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-count',
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.css'],
})
export class CountComponent implements OnInit {
  constructor(public PizzaService: CartService) {}
  ngOnInit(): void {}
}
