import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthSystemsService } from '../services/auth-systems.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [DatePipe],
})
export class RegisterComponent implements OnInit {
  loading: boolean = false;
  constructor(
    private modalservice: NgbModal,
    private authService: AuthSystemsService,
    private toasterService: ToastrService,
    private router: Router
  ) {}
  ngbModalOptions: NgbModalOptions = {
    backdrop: 'static',
    keyboard: false,
    ariaLabelledBy: 'modal-basic-title',
    scrollable: true,
  };

  ngOnInit(): void {}

  registerationForm: FormGroup = new FormGroup({
    nationalId: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  get passwordINput() {
    return this.registerationForm.controls.password;
  }

  passwordConfirmed: boolean = false;
  checkPassword(f) {
    if (f.value == this.passwordINput.value) {
      this.passwordConfirmed = false;
    } else {
      this.passwordConfirmed = true;
    }
  }
  onSubmit() {
    this.loading = true;
    this.authService.registerUser(this.registerationForm.value).subscribe(
      (data) => {
        this.loading = false;
        this.router.navigate(['/Login']);
        // location.href = '';
        this.modalservice.dismissAll();
        this.toasterService.success('تم تسجيل الحساب بنجاح', 'عملية  ناجحة');
      },
      (error) => {
        this.loading = false;
        this.toasterService.error('هذا الحساب موجود بالفعل', 'عملية غير ناجحة');
        this.modalservice.dismissAll();
        // this.errorMessage = error.error.message;
      }
    );
  }

  formIsRight: boolean = false;
  controlIsRight: boolean = true;
  numberPattern = /^[0-9]*$/;
  ssnError: string = '';
  checkNumber(e) {
    let ssn = e.target.value.split('');
    let ssnYear = parseInt(ssn[1] + ssn[2]);
    let ssnMonth = parseInt(ssn[3] + ssn[4]);
    let ssnDay = parseInt(ssn[5] + ssn[6]);
    let ssnGovernrate = parseInt(ssn[7] + ssn[8]);

    // debugger
    if (this.numberPattern.test(e.target.value) == false) {
      this.ssnError = 'يجب ادخال البيانات على هيئة ارقام فقط';
      this.controlIsRight = false;
      this.formIsRight = false;
    } else if (e.target.value == '') {
      this.ssnError = 'هذه الخانة مطلوبة';
      this.controlIsRight = false;
      this.formIsRight = false;
    } else if (e.target.value.length != 14) {
      this.ssnError = 'الرقم القومى يجب ان يكون 14 رقم';
      this.controlIsRight = false;
      this.formIsRight = false;
    } else if (
      ssn[0] == '2' &&
      (ssnYear < 40 ||
        ssnYear > 99 ||
        ssnMonth < 1 ||
        ssnMonth > 12 ||
        ssnDay < 1 ||
        ssnDay > 31 ||
        ssnGovernrate < 0 ||
        ssnGovernrate > 28)
    ) {
      this.ssnError = 'هذا الرقم القومى غير صحيح';
      this.controlIsRight = false;
      this.formIsRight = false;
    } else if (
      ssn[0] == '3' &&
      (ssnYear < 0 ||
        ssnYear > 99 ||
        ssnMonth < 1 ||
        ssnMonth > 12 ||
        ssnDay < 1 ||
        ssnDay > 31 ||
        ssnGovernrate < 0 ||
        ssnGovernrate > 28)
    ) {
      this.ssnError = 'هذا الرقم القومى غير صحيح';
      this.controlIsRight = false;
      this.formIsRight = false;
    } else if (ssn[0] != '3' && ssn[0] != '2') {
      this.ssnError = 'هذا الرقم القومى غير صحيح';
      this.controlIsRight = false;
      this.formIsRight = false;
    } else {
      this.controlIsRight = true;
      this.formIsRight = true;
    }
  }
}
