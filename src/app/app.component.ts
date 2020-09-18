import { Component } from '@angular/core';
import { Video } from './video';
import { VideoService } from './services/video.service';
import { Comment } from './comment';
import { CommentService } from './services/comment.service';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';

  constructor(private authService: AuthenticationService) {
    authService.handleAuthentication();
  }
}
