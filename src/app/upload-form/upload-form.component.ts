import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Video } from '../video';
import { MatDialog } from '@angular/material/dialog';

import { SuccessPopupComponent } from '../success-popup/success-popup.component';
import { VideoService } from '../services/video.service';
import { FailurePopupComponent } from '../failure-popup/failure-popup.component';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {

  uploadVideo: Video;
  uploadForm;
  private readonly usernameCheck: NodeJS.Timeout;
  username: string;

  constructor(private videoService: VideoService, private formBuilder: FormBuilder, private dialog: MatDialog) {
    this.uploadForm = this.formBuilder.group({
      title: '',
      author: localStorage.getItem('username') as string,
      description: '',
      file: [null, Validators.required]
    });
    this.usernameCheck = setInterval( () => {
      this.username = localStorage.getItem('username');
      if (this.username != null) {
        this.uploadForm.patchValue({author: this.username});
        clearInterval(this.usernameCheck); } }, 500);
  }

  ngOnInit(): void {
    this.uploadVideo = {id: null, title: '', author: '', filePath: '', date: null, description: ''};
  }

  onSubmit(uploadData): void {
    console.log('Success');
    this.uploadVideo.title = uploadData.title;
    this.uploadVideo.author = uploadData.author;
    this.uploadVideo.description = uploadData.description;
    // tslint:disable-next-line:prefer-const
    let fileName: string;

    // this.videoService.postVideo(this.uploadVideo).subscribe(video => this.uploadVideo = video)
    const videoPromise = this.videoService.uploadVideo(uploadData.file).toPromise();

    videoPromise.then((name) => {
      this.uploadVideo.filePath = name;
      const uploadPromise = this.videoService.postVideo(this.uploadVideo).toPromise();
      uploadPromise.then((uploaded) => {
        const successDialog = this.dialog.open(SuccessPopupComponent, {data: uploaded});
      })
      .catch((error) => 
      {
        console.log(error)
        const uploadFailure = this.dialog.open(FailurePopupComponent, {data: "upload"})
      }
      );
    })
    .catch((error) => 
      {
        console.log(error)
        const bucketFailure = this.dialog.open(FailurePopupComponent, {data: "bucket"})
      }

    );

    console.log(this.uploadVideo.filePath);

    console.log(this.uploadVideo.title);
  }

  onFileChange(event): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.patchValue({
        file
      });
    }
  }

}
