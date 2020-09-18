import { Component, OnInit } from '@angular/core';
import { Video } from '../video';
import { VideoService } from '../services/video.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  ctitle = 'client';
  videos: Video[] = []

  constructor(private videoService: VideoService) { }

  ngOnInit(){
    this.getVideos()
  }

  getVideos(){
      this.videoService.getAllVideos().subscribe(videos => this.videos = videos);
  }
}
