import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthSystemsService } from './../services/auth-systems.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  constructor(private authSystem: AuthSystemsService, private router: Router) {}
  response = {
    status: 0,
    message: '',
  };
  token;
  loginForm: FormGroup = new FormGroup({
    nationalId: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  ngOnInit(): void {}
  get ssn() {
    return this.loginForm.controls.nationalId;
  }
  get password() {
    return this.loginForm.controls.password;
  }
  onSubmit() {
    // debugger
    this.loading = true;
    let body = {
      nationalId: this.ssn.value,
      password: this.password.value,
    };
    this.authSystem.loginUser(body).subscribe(
      (data: any) => {
        this.router.navigate(['/']);
        this.loading = false;
        localStorage.setItem('logState', 'true');
        localStorage.setItem('userToken', data.data);
        this.response.status = 0;
        // location.replace('/');
      },
      (error) => {
        this.loading = false;
        if (error.status == 400) {
          let errorMsg = error.error;

          if (errorMsg.goToRegister) {
            this.router.navigate(['/Register']);
            localStorage.setItem('logState', 'false');
          } else {
            this.response.status = 1;
            this.response.message = errorMsg.nameAr;
          }
        } else if (error.status == 500) {
          this.router.navigate(['/Error500']);
        } else {
          this.router.navigate(['/ConnectionError']);
        }
        // debugger;
        // this.response.message = 'اسم المستخدم او كلمة المرور غير صحيحة';
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
