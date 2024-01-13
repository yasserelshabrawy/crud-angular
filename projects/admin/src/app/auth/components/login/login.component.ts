import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  token: any = '';
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
      ],
      role: 'user',
    });
  }
  login() {

    this.loginService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.token = res.token;
        localStorage.setItem('token', this.token)

        this.toaster.success('Login Success', 'Success');
        this.router.navigate(['/tasks']);

      },
      error: (err) => {
   
        err;
      },
    });
  }
}
