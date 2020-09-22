import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {

  private login: BehaviorSubject<boolean>;

  constructor() {
    this.login = new BehaviorSubject<boolean>(false);
  }

  getValue(): Observable<boolean> {
    console.log(this.login.value)
    return this.login.asObservable();    
  }
  setValue(newValue): void {
    this.login.next(newValue);
    console.log(this.login.value)
  }

}