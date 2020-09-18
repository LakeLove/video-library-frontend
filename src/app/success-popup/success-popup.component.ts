import { Component, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Data } from '@angular/router';
import { Video } from '../video';

@Component({
  selector: 'app-success-popup',
  templateUrl: './success-popup.component.html',
  styleUrls: ['./success-popup.component.css']
})
export class SuccessPopupComponent {

  video: Video;

  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: Video) {
    this.video = data;
    console.log(this.video)
   }

  openDialog() {
    const dialogRef = this.dialog.open(SuccessPopupComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
