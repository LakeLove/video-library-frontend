import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators,} from '@angular/forms';
import { Video } from '../video';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';

import { SuccessPopupComponent } from '../success-popup/success-popup.component';
import { VideoService } from '../services/video.service';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {

  uploadVideo: Video;
  uploadForm;

  constructor(private videoService : VideoService, private formBuilder : FormBuilder, private dialog: MatDialog) { 
    this.uploadForm = this.formBuilder.group({
      title: '',
      author: '',
      description: '',
      file: [null, Validators.required]
    })
  }

  ngOnInit(): void {
    this.uploadVideo = {id: null, title:'', author:'', filePath:'', date: null, description:''};
  }


  onSubmit(uploadData){
    console.log('Success')
    this.uploadVideo.title = uploadData.title
    this.uploadVideo.author = uploadData.author
    this.uploadVideo.description = uploadData.description
    let fileName: string;

    //this.videoService.postVideo(this.uploadVideo).subscribe(video => this.uploadVideo = video)
    const videoPromise = this.videoService.uploadVideo(uploadData.file).toPromise()

    videoPromise.then((name) => {
      this.uploadVideo.filePath = name
      const uploadPromise = this.videoService.postVideo(this.uploadVideo).toPromise()
      uploadPromise.then((uploaded) => {
        const successDialog = this.dialog.open(SuccessPopupComponent, {data: uploaded})
      })
      })
    .catch((error)=> console.log(error))

    console.log(this.uploadVideo.filePath)

    console.log(this.uploadVideo.title)
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.patchValue({
        file: file
      });
    }
  }

}
