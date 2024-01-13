import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }
  getUsers(filter:any){
        let params = new HttpParams();
        Object.entries(filter).forEach(([key, value]: any) => {
          if (value) {
            params = params.append(key, value);
          }
        });
    return this.http.get(`${environment.baseApi}/auth/users` , {params})
  }
  deleteUser(id:any){
    return this.http.delete(`${environment.baseApi}/auth/user/${id}`)
  }
  changeUserStatus(model:any){
    return this.http.put(`${environment.baseApi}/auth/user-status` , model)
  }
}
