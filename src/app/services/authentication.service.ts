import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private auth0;

  constructor(private router: Router, private http: HttpClient) {
    this.callAuth0();
  }

  callAuth0(): void {
    this.auth0 = new auth0.WebAuth({
      // "Client ID is considered public information" https://auth0.com/docs/get-started/dashboard/application-settings
      clientID: 'SuV6X5oMHwf32MnD05J6TjPjjfQRNJnf',
      domain: 'channel-cashmoney.us.auth0.com',
      responseType: 'token id_token',
      // redirectUri: 'https://cashmovie.herokuapp.com',
      redirectUri: 'http://localhost:4200',
      scope: 'openid read:user_idp_tokens read:users'
    });
  }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/']);
      } else if (err) {
        this.router.navigate(['/']);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    this.getUsername(authResult);
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    console.log('Loading local storage');
  }

  public logout(): void {
    this.auth0.logout({
      // returnTo: 'https://cashmovie.herokuapp.com/home'
      returnTo: 'http://localhost:4200'
    });
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('username');
  }

  public isAuthenticated(): boolean {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt && expiresAt != null;
  }

  private getUsername(authResult): void {
    const idToken = JSON.stringify(authResult.idToken);
    const base64Url = idToken.split('.')[1];
    const sub = (JSON.parse(window.atob(base64Url))).sub;
    // const result = this.http.get<string>(`https://cashmovie.herokuapp.com/api/users/id=${sub}`);
    const result = this.http.get<string>(`http://localhost:8080/api/users/id=${sub}`);
    result.subscribe(username => {console.log(JSON.parse(JSON.stringify(username))); localStorage.setItem('username', username as string);});
  }
}
