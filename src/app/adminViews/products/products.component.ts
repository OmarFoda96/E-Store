import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';
import { BrandsService } from './../../services/brands.service';
import { CategoriesService } from './../../services/categories.service';
import { ProductsModel } from './../../Models/Products.Interface';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CategoriesModel } from '../../Models/Categories.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  dataLoaded = false;
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  baseUrl = environment.base_url;
  constructor(
    private modalService: NgbModal,
    config: NgbModalConfig,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private brandsService: BrandsService,
    private router: Router,
    private toasterService: ToastrService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  ngbModalOptions = { size: 'xl', scrollable: true, centered: true };
  products: ProductsModel[];

  form: FormGroup = new FormGroup({
    nameAr: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[\u0621-\u064A0-9 ]+$'),
    ]),
    nameEn: new FormControl(null, [
      Validators.required,
      Validators.pattern('[a-zA-Z .\\w!@_-]*'),
    ]),
    count: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required]),
    descriptionAr: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[\u0621-\u064A0-9 ]+$'),
    ]),
    descriptionEn: new FormControl(null, [
      Validators.required,
      Validators.pattern('[a-zA-Z .\\w!@_-]*'),
    ]),
    categoryId: new FormControl(null, [Validators.required]),
    brandId: new FormControl(null, [Validators.required]),
  });
  editForm: FormGroup = new FormGroup({
    nameAr: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[\u0621-\u064A0-9 ]+$'),
    ]),
    nameEn: new FormControl(null, [
      Validators.required,
      Validators.pattern('[a-zA-Z .\\w!@_-]*'),
    ]),
    count: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required]),
    descriptionAr: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[\u0621-\u064A0-9 ]+$'),
    ]),
    descriptionEn: new FormControl(null, [
      Validators.required,
      Validators.pattern('[a-zA-Z .\\w!@_-]*'),
    ]),
    categoryId: new FormControl(null, [Validators.required]),
    brandId: new FormControl(null, [Validators.required]),
  });
  Attachment: FormData = new FormData();
  get inputNameAr() {
    return this.form.controls.nameAr;
  }
  get inputNameEn() {
    return this.form.controls.nameEn;
  }
  get inputcount() {
    return this.form.controls.count;
  }
  get inputprice() {
    return this.form.controls.price;
  }
  get inputdescriptionAr() {
    return this.form.controls.descriptionAr;
  }
  get inputdescriptionEn() {
    return this.form.controls.descriptionEn;
  }
  get inputcategoryId() {
    return this.form.controls.categoryId;
  }
  get inputbrandId() {
    return this.form.controls.brandId;
  }

  get editNameAr() {
    return this.editForm.controls.nameAr;
  }
  get editNameEn() {
    return this.editForm.controls.nameEn;
  }
  get editcount() {
    return this.editForm.controls.count;
  }
  get editprice() {
    return this.editForm.controls.price;
  }
  get editdescriptionAr() {
    return this.editForm.controls.descriptionAr;
  }
  get editdescriptionEn() {
    return this.editForm.controls.descriptionEn;
  }
  get editcategoryId() {
    return this.editForm.controls.categoryId;
  }
  get editbrandId() {
    return this.editForm.controls.brandId;
  }

  ngOnInit(): void {
    this.refreshView();
    this.getAllBrands();
    this.getAllCategories();
  }

  brands: CategoriesModel[];
  getAllBrands() {
    this.brandsService.getAllBrands().subscribe((data: any) => {
      this.brands = data;
    });
  }
  categories: CategoriesModel[];
  getAllCategories() {
    this.categoriesService.getAllCategories().subscribe((data: any) => {
      this.categories = data;
    });
  }
  refreshView() {
    this.dataLoaded = false;
    this.productsService.getAllProducts().subscribe((data: any[]) => {
      this.dataLoaded = true;
      let hos2: any[] = data;
      this.govs = data;
      this.products = hos2
        .map((country, i) => ({ id: i + 1, ...country }))
        .slice(
          (this.page - 1) * this.pageSize,
          (this.page - 1) * this.pageSize + this.pageSize
        );
      this.collectionSize = this.products.length;
    });
  }

  selectedFile;
  preview(e) {
    this.selectedFile = e.target.files[0];
    if (
      e.target.files.length > 0 &&
      e.target.files[0].type.indexOf('image') > -1
    ) {
      if (this.Attachment.get('Attachment'))
        this.Attachment.set(
          'Attachment',
          this.selectedFile,
          this.selectedFile.name
        );
      else
        this.Attachment.append(
          'Attachment',
          this.selectedFile,
          this.selectedFile.name
        );
    }
  }

  open(content) {
    this.modalService.open(content, this.ngbModalOptions);
  }
  onSubmit() {
    for (const key in this.form.value) {
      if (key !== 'photo') {
        this.Attachment.append(key, this.form.value[key]);
      }
    }

    // debugger
    this.productsService.addNewProducts(this.Attachment).subscribe(
      (data) => {
        this.refreshView();
        this.toasterService.success('تم اضافة صنف بنجاح', 'عملية ناجحة');
        this.modalService.dismissAll();
        this.form.reset();
        this.router.navigate(['/']).then(() => {
          this.router.navigate(['/Products']);
        });
      },
      (error) => {
        this.toasterService.error('لم يتم اضافة صنف بنجاح', 'عملية غير ناجحة');
        this.router.navigate(['/']).then(() => {
          this.router.navigate(['/Products']);
        });
      }
    );
  }
  onSubmitEdit() {
    for (const key in this.editForm.value) {
      if (key !== 'photo') {
        this.Attachment.append(key, this.editForm.value[key]);
      }
    }
    // debugger
    this.productsService
      .updateProducts(this.Attachment, this.selectedProduct.id)
      .subscribe(
        (data) => {
          this.refreshView();
          this.toasterService.success('تم تعديل صنف بنجاح', 'عملية ناجحة');
          this.modalService.dismissAll();
          this.editForm.reset();
          this.router.navigate(['/']).then(() => {
            this.router.navigate(['/Products']);
          });
        },
        (error) => {
          this.toasterService.error(
            'لم يتم تعديل صنف بنجاح',
            'عملية غير ناجحة'
          );
          this.router.navigate(['/']).then(() => {
            this.router.navigate(['/Products']);
          });
        }
      );
  }
  selectedProduct: ProductsModel;
  openEdit(content2, gov) {
    this.selectedProduct = gov;
    this.modalService.open(content2, this.ngbModalOptions);
    this.editForm.controls.nameAr.setValue(this.selectedProduct.nameAr);
    this.editForm.controls.nameEn.setValue(this.selectedProduct.nameEn);
    this.editForm.controls.count.setValue(this.selectedProduct.count);
    this.editForm.controls.price.setValue(this.selectedProduct.price);
    this.editForm.controls.descriptionAr.setValue(
      this.selectedProduct.descriptionAr
    );
    this.editForm.controls.descriptionEn.setValue(
      this.selectedProduct.descriptionEn
    );
    this.editForm.controls.categoryId.setValue(this.selectedProduct.categoryId);
    this.editForm.controls.brandId.setValue(this.selectedProduct.brandId);
  }
  openDelete(content2, gov) {
    this.selectedProduct = gov;
    this.modalService.open(content2, this.ngbModalOptions);
  }
  onDelete() {
    this.productsService.deleteProducts(this.selectedProduct.id).subscribe(
      (data: any) => {
        this.refreshView();
        this.modalService.dismissAll();
        this.toasterService.success('تم حذف صنف بنجاح', 'عملية ناجحة');
      },
      (error) => {
        this.modalService.dismissAll();
        this.toasterService.error(
          'لا يمكن حذف هذه الصنف بسبب وجود بعض المستخدمين عليها',
          'عملية غير ناجحة'
        );
      }
    );
  }
  govs: ProductsModel[];
  // search(key) {
  //   this.products = this.govs.filter((element) => {
  //     return element.nameAr.includes(key);
  //   });
  // }
}
