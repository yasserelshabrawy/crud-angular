import { MaterialModule } from './../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [ListTasksComponent , TaskDetailsComponent],
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    TasksRoutingModule,
    NgxPaginationModule,
    TranslateModule
  ],
})
export class TasksModule {}
