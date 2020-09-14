import { Component } from '@angular/core';
import { Video } from './video';
import { VideoService } from './video.service';
import { Comment } from './comment';
import { CommentService } from './comment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';

  constructor() { }

}
