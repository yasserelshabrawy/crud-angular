import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  token:any
  loginForm!:FormGroup
  constructor(
    private fb:FormBuilder,
    private service:LoginService,
    private router:Router,
    private toaster:ToastrService
    ) { }

  ngOnInit(): void {
    this.createForm()
  }
  createForm(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role:'user'
    });
  }
  login(){
   this.service.login(this.loginForm.value).subscribe({
    next:((res)=>{
      console.log(res);
      this.token =res.token
      let userId = res.userId
      console.log(userId);

      localStorage.setItem('token' , this.token)
      localStorage.setItem('userId' , userId)
      this.toaster.success("login success" , "success")
      this.router.navigate(['/tasks'])
    })
   }
   )
  }


}
