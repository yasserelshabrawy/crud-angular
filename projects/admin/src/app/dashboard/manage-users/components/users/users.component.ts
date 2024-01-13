import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { ToastrService } from 'ngx-toastr';
export interface PeriodicElement {
  name: string;
  email: string;
  tasksAssigned: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'name',
    'email',
    'tasksAssigned',
    'actions',
  ];
  user: any;
  dataSource: any = [];
  page: any = 1;
  total: any;
  constructor(private service: UsersService, private toaster: ToastrService) {}

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers() {
    let params = {
      page: this.page,
      limit: 10,
      name: '',
    };
    this.service.getUsers(params).subscribe({
      next: (res: any) => {
        console.log(res.users);
        this.total = res.totalItems;
        this.dataSource = res.users;
      },
    });
  }
  changePage(event: any) {
    this.page = event;
    this.getUsers();
  }
  deleteUser(id: any , index:number) {
    if (this.dataSource[index].assignedTasks > 0 ){
      this.toaster.error("can't delete this user")
    }
    else{

      this.service.deleteUser(id).subscribe({
        next: (res: any) => {
          this.toaster.success(res.massage, 'success');
          this.getUsers();
        },
      });
    }
  }
  changeUserStatus(id:string , status:string ,index:number){
     if (this.dataSource[index].assignedTasks > 0 ){
      this.toaster.error("can't update this user")
    }else{
    const Model ={
      id,
      status
    }
    this.service.changeUserStatus(Model).subscribe({
      next:(res)=>{
        this.toaster.success('user update successfully' , 'success')
        this.getUsers()
      }
    })
  }

  }
}
