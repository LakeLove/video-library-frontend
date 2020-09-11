import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Video } from './video';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private httpClient: HttpClient) { }

  private videoUrl = 'https://channelcashmoney.herokuapp.com/api/videos';

  getAllVideos(): Observable<Video[]>{
    console.log("Fetching Videos")
    return this.httpClient.get<Video[]>(this.videoUrl + '/home')
  }

  getVideo(id: number): Observable<Video>{
    console.log(`Fetching Video Number ${id}`)
    return this.httpClient.get<Video>(this.videoUrl + `/id=${id}`)
  }
}
