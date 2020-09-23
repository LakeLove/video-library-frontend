import { Component, OnInit } from '@angular/core';
import { VideoService } from '../services/video.service';
import { Video } from '../video';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-videos',
  templateUrl: './user-videos.component.html',
  styleUrls: ['./user-videos.component.css']
})
export class UserVideosComponent implements OnInit {
  author: string;
  videos: Video[] = [];
  private cardClasses: string[] = ['bg-success', 'bg-secondary', 'bg-danger', 'bg-info'];

  constructor(private videoService: VideoService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.author = this.route.snapshot.paramMap.get('author');
    console.log(`Author = ${(this.author)}`);
    this.getAuthorVideos(this.author);
  }

  getAuthorVideos(author: string): void {
    this.videoService.getAuthorVideos(author).subscribe(videos => this.videos = videos);
  }

  getCardClass(index: number): string {
    return this.cardClasses[index % 4];
  }
}
