import { Component, OnInit } from '@angular/core';
import { Video } from '../video';
import { VideoService } from '../video.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Location } from '@angular/common';


@Component({
  selector: 'app-single-video',
  templateUrl: './single-video.component.html',
  styleUrls: ['./single-video.component.css']
})
export class SingleVideoComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private videoService: VideoService,
    private location: Location) { }

  video : Video

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(`Id = ${id}`)
    this.getVideo(id)
  }

  getVideo(id: number){
    this.videoService.getVideo(id).subscribe(video => this.video = video);
  }

}
