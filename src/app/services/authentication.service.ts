import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';
import { Observable } from 'rxjs';
import { ConfigurationService } from '../services/configuration.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private auth0;

  constructor(private router: Router, private http: HttpClient, private configService: ConfigurationService) {
    this.callAuth0();
  }

  callAuth0(): void {
    this.auth0 = new auth0.WebAuth({
          clientID: this.configService.clientID,
          domain: this.configService.domain,
          responseType: 'token id_token',
          redirectUri: 'https://cashmovie.herokuapp.com',
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
    var base64Url = authResult.idToken.split('.')[1];
    var sub = (JSON.parse(window.atob(base64Url))).sub;
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('subject', sub);
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    console.log("Loading local storage");
  }

  public logout(): void {
    this.auth0.logout({
      returnTo: 'https://cashmovie.herokuapp.com/home'
    });
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('subject');
  }

  public isAuthenticated(): boolean {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  public getUsername(user_id: string, id_token: string): Observable<String> {
    return this.http
      .get<String>(`https://channel-cashmoney.us.auth0.com/api/v2/users/${user_id}?fields=username&include_fields=true`,
      {headers: new HttpHeaders().set('authorization', `Bearer ${id_token}`)});
  }

}
