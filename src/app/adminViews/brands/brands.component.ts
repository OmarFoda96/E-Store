import { BrandsService } from './../../services/brands.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CategoriesModel } from './../../Models/Categories.interface';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css'],
})
export class BrandsComponent implements OnInit {
  dataLoaded = false;
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  constructor(
    private modalService: NgbModal,
    config: NgbModalConfig,
    private BrandsService: BrandsService,
    private toasterService: ToastrService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  ngbModalOptions = { size: 'xl', scrollable: true, centered: true };
  BloodTypes: CategoriesModel[];

  form: FormGroup = new FormGroup({
    nameAr: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[\u0621-\u064A0-9 ]+$'),
    ]),
    nameEn: new FormControl(null, [
      Validators.required,
      Validators.pattern('[a-zA-Z .\\w!@_-]*'),
    ]),
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
  });

  get inputNameAr() {
    return this.form.controls.nameAr;
  }
  get inputNameEn() {
    return this.form.controls.nameEn;
  }
  get editNameAr() {
    return this.editForm.controls.nameAr;
  }
  get editNameEn() {
    return this.editForm.controls.nameEn;
  }

  ngOnInit(): void {
    this.refreshView();
  }
  refreshView() {
    this.dataLoaded = false;
    this.BrandsService.getAllBrands().subscribe((data: any[]) => {
      this.dataLoaded = true;
      let hos2: any[] = data;
      this.govs = data;
      this.BloodTypes = hos2
        .map((country, i) => ({ id: i + 1, ...country }))
        .slice(
          (this.page - 1) * this.pageSize,
          (this.page - 1) * this.pageSize + this.pageSize
        );
      this.collectionSize = this.BloodTypes.length;
    });
  }

  open(content) {
    this.modalService.open(content, this.ngbModalOptions);
  }
  onSubmit() {
    // debugger
    this.BrandsService.addNewBrands(this.form.value).subscribe(
      (data) => {
        this.refreshView();
        this.toasterService.success('تم اضافة صنف بنجاح', 'عملية ناجحة');
        this.modalService.dismissAll();
        this.form.reset();
      },
      (error) => {
        this.toasterService.error('لم يتم اضافة صنف بنجاح', 'عملية غير ناجحة');
      }
    );
  }
  onSubmitEdit() {
    let body = {
      id: this.selectedGov.id,
      nameAr: this.editForm.controls.nameAr.value,
      nameEn: this.editForm.controls.nameEn.value,
    };
    // debugger
    this.BrandsService.updateBrands(body).subscribe(
      (data) => {
        this.refreshView();
        this.toasterService.success('تم تعديل صنف بنجاح', 'عملية ناجحة');
        this.modalService.dismissAll();
        this.form.reset();
      },
      (error) => {
        this.toasterService.error('لم يتم تعديل صنف بنجاح', 'عملية غير ناجحة');
      }
    );
  }
  selectedGov: CategoriesModel;
  openEdit(content2, gov) {
    this.selectedGov = gov;
    this.modalService.open(content2, this.ngbModalOptions);
    this.editForm.controls.nameAr.setValue(this.selectedGov.nameAr);
    this.editForm.controls.nameEn.setValue(this.selectedGov.nameEn);
  }
  openDelete(content2, gov) {
    this.selectedGov = gov;
    this.modalService.open(content2, this.ngbModalOptions);
  }
  onDelete() {
    this.BrandsService.deleteBrands(this.selectedGov.id).subscribe(
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
  govs: CategoriesModel[];
  search(key) {
    this.BloodTypes = this.govs.filter((element) => {
      return element.nameAr.includes(key);
    });
  }
}
