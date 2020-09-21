import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit {

  public isUserLoggedIn: boolean;
  public hasUsername: boolean;
  public username: string;
  public userId;

  constructor(public authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    setTimeout( () => {this.isUserLoggedIn = this.authService.isAuthenticated();
                       this.userId = localStorage.getItem('userid');
                       console.log('Initializing');
                       this.hasUsername = localStorage.getItem('subject') != null && localStorage.getItem('bearer_token') != null;
                       if (this.hasUsername && this.username == null) {
                         this.setUsername();
                         console.log('Getting username');
                       }
                       // } else {
                       //   localStorage.removeItem('bearer_token');
                       //   this.isUserLoggedIn = false;
                       // }
                       }, 500);
  }

  logout(): void {
    localStorage.setItem('callback', this.router.url);
    this.authService.logout();
    localStorage.removeItem('bearer_token');
    localStorage.removeItem('username');
    this.isUserLoggedIn = this.authService.isAuthenticated();
  }
  login(): void {
    localStorage.setItem('callback', this.router.url);
    this.authService.login();
    console.log('Logging in -> setting isUserLoggedIn');
    this.isUserLoggedIn = this.authService.isAuthenticated();

  }
  setUsername(): void {
    this.authService.getUsername(localStorage.getItem('subject'), localStorage.getItem('bearer_token'))
      .subscribe(username => {
        localStorage.setItem('username', (JSON.parse(JSON.stringify(username))).username);
        this.username = localStorage.getItem('username');
      });
  }
}
