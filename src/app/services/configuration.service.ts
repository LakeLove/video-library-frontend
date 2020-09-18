import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  public clientID;
  public domain;
  public bearerToken;

  constructor(private http: HttpClient) { }

  public getBearerToken(): Observable<String> {
    return this.http.get<String>("https://channelcashmoney.herokuapp.com/api/AUTH0_API_TOKEN");
  }

  public getClientID(): Observable<String> {
    return this.http.get<String>("https://channelcashmoney.herokuapp.com/api/AUTH0_CLIENT_ID");
  }

  public getDomain(): Observable<String> {
    return this.http.get<String>("https://channelcashmoney.herokuapp.com/api/AUTH0_DOMAIN");
  }

  public initApp() {
    return new Promise<any>((resolve) => {
      this.getClientID().subscribe(id => this.clientID = (JSON.parse(JSON.stringify(id))));
      this.getDomain().subscribe(domain => this.domain = (JSON.parse(JSON.stringify(domain))));
      this.getBearerToken().subscribe(token => localStorage.setItem('bearer_token', (JSON.parse(JSON.stringify(token)))));
      setTimeout(() => {
        console.log('In initApp');
        resolve();
      }, 1000);
    });
  }
}
