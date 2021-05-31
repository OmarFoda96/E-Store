import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { CartModel } from '../../Models/cart.interface';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  constructor(
    private productsService: ProductsService,
    private toasterService: ToastrService,
    private router: Router
  ) {}

  url = environment.base_url;

  dataLoaded: boolean = false;
  kinds: CartModel[];
  finalPrice: number = 0;
  sellDone: boolean = true;

  ngOnInit(): void {
    this.getAllHistory();
  }

  getAllHistory() {
    this.productsService.getAllHistory().subscribe((data: any) => {
      this.dataLoaded = true;
      this.kinds = data.data;
    });
  }
  goPayment() {
    this.router.navigate(['/Payment']);
  }
  refund(id) {}
}
