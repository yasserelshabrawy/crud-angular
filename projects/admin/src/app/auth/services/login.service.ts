import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Schema } from '../schema';
import { Observable } from 'rxjs';
import { environment } from 'projects/admin/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  login(model:Schema):Observable<any>{
   return this.http.post(`${environment.baseApi}/auth/login` , model)
  }
}
