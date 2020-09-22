import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { AuthenticationComponent } from '../authentication/authentication.component';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService) { }

  canActivate() {
    if (this.authenticationService.isAuthenticated()) {
      return true;
    } else {
      this.authenticationService.login();
    }
  }

}
