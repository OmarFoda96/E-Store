import { CategoriesModel } from './../Models/Categories.interface';
import { ProductsModel } from './../Models/Products.Interface';
import { ProductsService } from './../services/products.service';
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

  products:ProductsModel[];
  categories:CategoriesModel[];
  constructor(
    private productsService: ProductsService,
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
    this.getAllCategories()
  }

  getAllData() {
    this.dataLoaded = false;
    this.productsService.getAllData().subscribe(
      (data:any[])=>{
        this.products=data
        this.dataLoaded = true;
      }
    );
  }

  getAllCategories() {
    this.dataLoaded = false;
    this.productsService.getAllCategories().subscribe(
      (data:any[])=>{
        this.categories=data
        this.dataLoaded = true;
      }
    );
  }

}
