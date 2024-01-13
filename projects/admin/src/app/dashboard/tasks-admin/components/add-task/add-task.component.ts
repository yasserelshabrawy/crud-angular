import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { TasksService } from '../../services/tasks.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  setForm!: FormGroup;
  typeImg = '';
  formValue: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dialog: MatDialogRef<AddTaskComponent>,
    public matDialog: MatDialog,
    private service: TasksService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  users: any = [
    { name: 'Yasser', id: '656f84cb557ad7a5de3a9301' },
    { name: 'Ali', id: '656f8515557ad7a5de3a9304' },
    { name: 'yaso', id: '65774be3bc3843889937d215' },
  ];

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.setForm = this.fb.group({
      title: [this.data?.title || '', [Validators.required]],
      userId: [this.data?.userId._id || '', [Validators.required]],
      image: [this.data?.image || '', [Validators.required]],
      description: [this.data?.description || '', [Validators.required]],
      deadline: [
        this.data
          ? new Date(
              this.data?.deadline.split('-').reverse().join('-')
            ).toISOString() || ''
          : [Validators.required],
      ],
    });

    this.formValue = this.setForm.value;
  }
  selectImage(event: any) {
    this.typeImg = event.target.value;
    this.setForm.get('image')?.setValue(event.target.files[0]);
  }
  formData() {
    let newDate = moment(this.setForm.value['deadline']).format('DD-MM-YYYY');
    let formData = new FormData();
    Object.entries(this.setForm.value).forEach(([key, value]: any) => {
      if (key == 'deadline') {
        formData.append(key, newDate);
      } else formData.append(key, value);
    });
    return formData;
  }
  createTask() {
    console.log(this.setForm.value);
    let model = this.formData();
    console.log(model);

    this.service.createTask(model).subscribe((res) => {
      this.dialog.close(true);
      console.log(res);
      this.toaster.success('task add successfuly', 'sucsess');
    });
  }
  editTask() {
    console.log(this.setForm.value);
    let model = this.formData();
    console.log(model);

    this.service.editTask(model, this.data._id).subscribe((res) => {
      this.dialog.close(true);
      console.log(res);
      this.toaster.success('task update successfuly', 'succsess');
    });
  }
  close() {
    let hasChanged = false;
    Object.keys(this.formValue).forEach((key) => {
      if (this.formValue[key] !== this.setForm.value[key]) {
        hasChanged = true;
      }
    });
    if (hasChanged) {
      const dialogRef = this.matDialog.open(ConfirmComponent, {
        width: '650px',
        disableClose: true,
      });
      dialogRef.afterClosed().subscribe((res) => {
        if (res) {
        }
      });
    } else {
      this.dialog.close();
    }
  }
}
