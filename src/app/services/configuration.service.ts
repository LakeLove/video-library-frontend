import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  public clientID;
  public domain;

  constructor(private http: HttpClient) { }

  public getBearerToken(): Observable<string> {
    return this.http.get<string>('https://channelcashmoney.herokuapp.com/api/AUTH0_API_TOKEN');
  }

  public getClientID(): Observable<string> {
    return this.http.get<string>('https://channelcashmoney.herokuapp.com/api/AUTH0_CLIENT_ID');
  }

  public getDomain(): Observable<string> {
    return this.http.get<string>('https://channelcashmoney.herokuapp.com/api/AUTH0_DOMAIN');
  }

  public initApp(): Promise<any> {
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
