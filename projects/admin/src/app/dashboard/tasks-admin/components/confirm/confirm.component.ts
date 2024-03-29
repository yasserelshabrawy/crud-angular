import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnInit {
  constructor(
    public dialog: MatDialogRef<ConfirmComponent>,
    public matDialog: MatDialog
  ) {}

  ngOnInit(): void {}
  close() {
    this.dialog.close()
  }
  confirm() {
    this.matDialog.closeAll()
  }
}
