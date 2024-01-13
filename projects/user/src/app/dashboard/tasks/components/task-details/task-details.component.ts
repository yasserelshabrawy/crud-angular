import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent implements OnInit {
  productId: any;
  detail: any;
  constructor(
    private activateRoute: ActivatedRoute,
    private service: TasksService,
    private router:Router,
  ) {}
  ngOnInit(): void {
    this.activateRoute.params.subscribe((params: any) => {
      this.productId = params.id ?? '';
      console.log(this.productId);
    });
    this.details();
    console.log(this.productId);
  }

  details() {
    this.service.details(this.productId).subscribe({
      next: (res: any) => {
        this.detail = res.tasks;
        console.log(res);
      },
    });
  }
  complete(ele:any){
    const MODEL= {
      id: ele
    };
    this.service.complete(MODEL).subscribe({
      next:(res)=>{
        console.log(res);
        this.router.navigate(['/tasks'])

      }
    })
  }
}
