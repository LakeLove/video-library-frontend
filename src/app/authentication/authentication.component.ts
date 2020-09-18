import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { ConfigurationService } from '../configuration.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit {

  public isUserLoggedIn: boolean;
  public hasUsername: boolean;
  public username;
  public userId;

  constructor(public authService: AuthenticationService, public configService: ConfigurationService) { }

  ngOnInit() {
    setTimeout( () => {this.isUserLoggedIn = this.authService.isAuthenticated();
                       this.userId = localStorage.getItem('userid');
                       console.log("Initializing");
                       this.hasUsername = localStorage.getItem('subject') != null && localStorage.getItem('bearer_token') != null;
                       if (this.hasUsername && this.username == null) {
                        this.getUsername();
                        console.log("Getting username");
                       }
                       }, 500);
  }
  logout() {
    this.authService.logout();
    localStorage.removeItem('bearer_token');
    this.isUserLoggedIn = this.authService.isAuthenticated();
  }
  login() {
    console.log("Logging in");
    this.authService.login();
    console.log("Logging in -> setting isUserLoggedIn");
    this.isUserLoggedIn = this.authService.isAuthenticated();

  }
  getUsername() {
    this.authService.getUsername(localStorage.getItem('subject'), localStorage.getItem('bearer_token'))
      .subscribe(username => this.username = (JSON.parse(JSON.stringify(username))).username);
  }
}
