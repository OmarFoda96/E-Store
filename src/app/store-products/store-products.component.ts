import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PizzaService } from '../services/pizza-service.service';

@Component({
  selector: 'app-store-products',
  templateUrl: './store-products.component.html',
  styleUrls: ['./store-products.component.css'],
})
export class StoreProductsComponent implements OnInit {
  dataLoaded: boolean = true;

  pizzas;
  constructor(
    private pizzaService: PizzaService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private toasterService: ToastrService
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
  }

  getAllData() {
    this.dataLoaded = false;
    setTimeout(() => {
      this.dataLoaded = true;
      this.pizzas = this.pizzaService.getAllData();
    }, 1000);
  }
}
