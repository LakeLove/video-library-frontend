import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Comment } from './comment';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }

  private commentUrl = 'https://channelcashmoney.herokuapp.com/api/comments';

  getComments(video_id: number): Observable<Comment[]>{
      console.log(`Fetching Comments for Video Number ${video_id}`)
      return this.httpClient.get<Comment[]>(this.commentUrl + `/id=${video_id}`)
    }
}
