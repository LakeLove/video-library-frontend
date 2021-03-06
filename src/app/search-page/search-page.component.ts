import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoService } from '../services/video.service';
import { Video } from '../video';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  constructor(private videoService: VideoService, private route: ActivatedRoute, private router: Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ctitle = 'client';
  videos: Video[] = [];
  private cardClasses: string[] = ['bg-success', 'bg-secondary', 'bg-danger', 'bg-info'];
  term: string;
  count: number;

  ngOnInit(): void{
    this.term = this.route.snapshot.paramMap.get('term');
    this.getVideos(this.term);
  }

  getVideos(term: string): void{
      this.videoService.searchVideo(term).subscribe(videos => 
        {this.videos = videos;
          this.count = videos.length;        
        });
  }
  getCardClass(index: number): string {
    return this.cardClasses[index % 4];
  }

}
