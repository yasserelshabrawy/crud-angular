import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  createAcc(model: any) {
    return this.http.post(`${environment.baseApi}/auth/createAccount`, model);
  }
  login(model: any):Observable<any> {
    return this.http.post(`${environment.baseApi}/auth/login`, model);
  }
}
