import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Comment } from '../comment';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-video-comments',
  templateUrl: './video-comments.component.html',
  styleUrls: ['./video-comments.component.css']
})
export class VideoCommentsComponent implements OnChanges {

  comments: Comment[];
  @Input() videoId: number | undefined;

  constructor(private commentService: CommentService) { }

  ngOnChanges(): void {
    console.log(`Video Id = ${this.videoId}`)
    this.getVideoComments()
  }

  getVideoComments(){
      this.commentService.getComments(this.videoId).subscribe(comments => this.comments = comments);
  }
}
