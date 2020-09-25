import { Component, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Data } from '@angular/router';
import { Video } from '../video';

@Component({
  selector: 'app-failure-popup',
  templateUrl: './failure-popup.component.html',
  styleUrls: ['./failure-popup.component.css']
})
export class FailurePopupComponent {

  video: Video;
  reason: string;
  bucketFailure: boolean = false;
  uploadFailure: boolean = false;

  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: string) {
    if(data==="bucket"){
      this.bucketFailure = true;
    }
    else if(data==="upload"){
      this.uploadFailure = true;
    }
   }

  openDialog(): void {
    const dialogRef = this.dialog.open(FailurePopupComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
