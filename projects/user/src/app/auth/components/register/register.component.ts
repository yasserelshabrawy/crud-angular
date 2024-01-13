import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { group } from '@angular/animations';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  constructor(private fb: FormBuilder, private service: LoginService , private router:Router) {}

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
        role: ['user'],
      },
      { validators: this.checkPassword }
    );
  }

  createAcc() {
    this.service.createAcc(this.registerForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/auth/login'])
      },
    });
    console.log(this.registerForm);
  }
  checkPassword: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let password = group.get('password')?.value;
    let confirmPassword = group.get('confirmPassword')?.value;

    return password == confirmPassword ? null : { notmatch: true };
  };
}
