import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http:HttpClient) {

   }
  getUserTask(id:any , userId:any){
        let params = new HttpParams()
    Object.entries(userId).forEach(([key , value]:any)=>{
        if (key) {
          params = params.append(key, value);
        }
       } )
  return this.http.get(`${environment.baseApi}/tasks/user-tasks/${id}` , {params})
  }
  complete(model:any){
    return this.http.put(`${environment.baseApi}/tasks/complete`, model)
  }
  details(id:any){
    return this.http.get(`${environment.baseApi}/tasks/task/${id}`)
  }
}
