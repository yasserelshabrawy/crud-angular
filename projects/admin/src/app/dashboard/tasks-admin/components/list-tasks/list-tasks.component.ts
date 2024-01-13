import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TasksService } from '../../services/tasks.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss'],
})
export class ListTasksComponent implements OnInit {
  user: any;
  timeOut: any;
  page: any = 1;
  total: any;
  filteration: any = {
    page: this.page,
    limit: 6,
  };

  constructor(
    private service: TasksService,
    public dialog: MatDialog,
  ) {}
  users: any = [
    { name: 'Yasser', id: '656f84cb557ad7a5de3a9301' },
    { name: 'Ali', id: '656f8515557ad7a5de3a9304' },
    { name: 'yaso', id: '65774be3bc3843889937d215' },
  ];

  ngOnInit(): void {
    this.getAllTasks();
  }
  search(event: any) {
    this.page = 1;
    this.filteration['page'] = event;
    this.filteration['keyword'] = event.target.value;
    console.log(this.filteration['keyword']);
    clearTimeout(this.timeOut);
    this.timeOut = setTimeout(() => {
      this.getAllTasks();
    }, 2000);
  }
  selectUser(event: any) {
    this.page = 1;
    this.filteration['page'] = event;
    this.filteration['userId'] = event.value;
    this.getAllTasks();
  }
  getAllTasks() {
    this.service.getTask(this.filteration).subscribe({
      next: (res: any) => {
        this.user = res.tasks;
        this.total = res.totalItems;
        console.log(res);


        console.log(res.tasks);
      },
    });
  }
  addTask() {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '750px',
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getAllTasks();
      }
    });
  }
  deleteTask(id: string) {
    this.service.deleteTask(id).subscribe({
      next: (res) => {
        res;
        this.getAllTasks();
      },
      error: (err) => {
        err;
      },
    });
  }
  editTask(item: any) {
    console.log(this.user);

    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '750px',
      data: item,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getAllTasks();
      }
    });
  }
  changePage(event: any) {
    console.log(event);
    this.page = event;
    this.filteration['page'] = event;
    this.getAllTasks();
  }
}
