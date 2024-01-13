import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'projects/admin/src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  getTask(filter:any) {
    // let headers = new HttpHeaders()
    // headers = headers.append(
    //   'authorization',
    //   'Bearer ' + localStorage.getItem('token')
    // );
    let params = new HttpParams()
    Object.entries(filter).forEach(([key , value]:any)=>{
        if (key) {
          params = params.append(key, value);
        }
       } )
      return this.http.get(`${environment.baseApi}/tasks/all-tasks`, {params});

  }
  createTask(model: any) {
    return this.http.post(`${environment.baseApi}/tasks/add-task`, model);
  }
  editTask(model: any , id:string) {
    return this.http.put(`${environment.baseApi}/tasks/edit-task/${id}`, model);
  }
  deleteTask(id:string){
    return this.http.delete(`${environment.baseApi}/tasks/delete-task/${id}`)
  }
}
