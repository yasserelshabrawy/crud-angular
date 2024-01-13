import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TasksService } from '../../services/tasks.service';
export interface PeriodicElement {
  title: string;
  description: string;
  deadLineDate: string;
  status: string;
}

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss'],
})
export class ListTasksComponent implements OnInit {
  page: any;
  total: any;
  dataSource: any = [];
  selectedStatus: string = 'In-Progress';
  tasksFilter!: FormGroup;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private service: TasksService
  ) {}

  ngOnInit(): void {
    this.createform();
    this.getAllTasks();
  }

  createform() {
    this.tasksFilter = this.fb.group({
      title: [''],
      userId: [''],
      fromDate: [''],
      toDate: [''],
    });
  }

  getAllTasks() {
    let params = {
      page: this.page,
      limit: 5,
      status: this.selectedStatus,
    };
    this.service.getUserTask(localStorage.getItem('userId'), params).subscribe({
      next: (res: any) => {
        console.log(res);
        this.dataSource = res.tasks;
        this.total = res.totalItems;
        console.log(res.totalItems);
      },
    });
  }
  changePage(event: any) {
    this.page = event;
    console.log(event);
    this.getAllTasks();
  }
  complete(ele: any) {
    const MODEL = {
      id: ele,
    };
    this.service.complete(MODEL).subscribe({
      next: (res) => {
        console.log(res);
        this.getAllTasks();
      },
    });
  }

}
