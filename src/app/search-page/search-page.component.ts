import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../services/video.service';
import { Video } from '../video';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  constructor(private videoService: VideoService, private route: ActivatedRoute) { }

  ctitle = 'client';
  videos: Video[] = [];
  private cardClasses: string[] = ['bg-success', 'bg-secondary', 'bg-danger', 'bg-info'];

  ngOnInit(): void{
    const term = this.route.snapshot.paramMap.get('term');
    this.getVideos(term);
  }

  getVideos(term: string): void{
      this.videoService.searchVideo(term).subscribe(videos => this.videos = videos);
  }
  getCardClass(index: number): string {
    return this.cardClasses[index % 4];
  }

}
