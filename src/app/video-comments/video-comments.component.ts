import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Comment } from '../comment';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-video-comments',
  templateUrl: './video-comments.component.html',
  styleUrls: ['./video-comments.component.css']
})
export class VideoCommentsComponent implements OnChanges {

  comments: Comment[];
  @Input() videoId: number;

  constructor(private commentService: CommentService) { }

  ngOnChanges(): void {
    console.log(`Video Id = ${this.videoId}`)
    this.getVideoComments()
  }

  getVideoComments() {
    this.commentService.getComments(this.videoId).subscribe(comments => this.comments = comments);
  }

  addVideoComment(text: string): void {
    let comment:  Comment = { comment_id: null, comment_text: text.trim(), comment_timestamp: null, video_id: null} ;
    this.commentService.postComment(comment, this.videoId).subscribe(comment => this.comments.push(comment));
  }
}
