import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksAdminRoutingModule } from './tasks-admin-routing.module';
import { ListTasksComponent } from './components/list-tasks/list-tasks.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../material/material.module';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [ListTasksComponent, AddTaskComponent, ConfirmComponent],
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    TasksAdminRoutingModule,
    NgxPaginationModule,
    TranslateModule,
  ],
})
export class TasksAdminModule {}
