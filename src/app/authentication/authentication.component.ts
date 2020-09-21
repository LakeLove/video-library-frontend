import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit {
  // public userId;

  constructor(public authService: AuthenticationService) { }

  public isUserLoggedIn: boolean;
  public username: string;
  private check = 0;
  private authCheck = setInterval( () => {this.isUserLoggedIn = this.authService.isAuthenticated();
  // this.userId = localStorage.getItem('userid');
                                          console.log('authCheck: Initializing');
                                          this.check++;
                                          console.log('authCheck: check #' + this.check);
                                          console.log('authCheck: isUserLoggedIn is ' + this.isUserLoggedIn);
                                          console.log('authCheck: username is ' + localStorage.getItem('username'));
                                          if (this.isUserLoggedIn && localStorage.getItem('username') != null) {
                                            console.log('authCheck: Setting username');
                                            this.setUsername();
                                            console.log('authCheck: Clearing interval');
                                            clearInterval(this.authCheck);
                                          } else if (!this.isUserLoggedIn && this.check === 5 || this.isUserLoggedIn && this.check === 50) {
                                            if (localStorage.getItem('username') != null) {
                                              console.log('authCheck: Logging out');
                                              this.logout();
                                            }
                                            console.log('authCheck: Clearing interval');
                                            clearInterval(this.authCheck);
                                          }}, 500);
  ngOnInit(): void { }
  logout(): void {
    this.authService.logout();
    this.isUserLoggedIn = this.authService.isAuthenticated();
  }
  login(): void {
    console.log('Logging in');
    this.authService.login();
    this.isUserLoggedIn = this.authService.isAuthenticated();
    this.setUsername();
  }
  setUsername(): void {
    this.username = localStorage.getItem('username') as string;
  }
}
