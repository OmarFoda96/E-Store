import { ProductsService } from './../services/products.service';
import { Router } from '@angular/router';
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
    private productsService: ProductsService,
    private toasterService: ToastrService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
  }
  dataLoaded:boolean=false
 
}
