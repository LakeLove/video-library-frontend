import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Comment } from './comment';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }

  private commentUrl = 'https://channelcashmoney.herokuapp.com/api/comments';
  httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

  getComments(video_id: number): Observable<Comment[]>{
    console.log(`Fetching Comments for Video Number ${video_id}`)
    return this.httpClient.get<Comment[]>(this.commentUrl + `/id=${video_id}`)
  }

  postComment(comment: Comment, video_id: number): Observable<Comment> {
    return this.httpClient.post<Comment>(this.commentUrl + `/id=${video_id}`, comment, this.httpOptions);
  }

}
