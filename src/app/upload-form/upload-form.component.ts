import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Video } from '../video';

import { VideoService } from '../video.service';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {

  uploadVideo: Video;
  uploadForm;

  constructor(private videoService : VideoService, private formBuilder : FormBuilder) { 
    this.uploadForm = this.formBuilder.group({
      title: '',
      author: '',
      description: ''
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

    console.log(this.uploadVideo.title)
  }

}
