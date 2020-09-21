import { Component, OnInit } from '@angular/core';
import { Video } from '../video';
import { VideoService } from '../services/video.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private videoService: VideoService) { }

  ctitle = 'client';
  videos: Video[] = [];
  private cardClasses: string[] = ['bg-success', 'bg-secondary', 'bg-danger', 'bg-info'];

  ngOnInit(): void{
    this.getVideos();
  }

  getVideos(): void{
      this.videoService.getAllVideos().subscribe(videos => this.videos = videos);
  }
  getCardClass(index: number): string {
    console.log(index)
    return this.cardClasses[index % 4];
  }
}
