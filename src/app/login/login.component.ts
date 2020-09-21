import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/user';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {

  credentials: User;
  loginForm;

  constructor(private appService: AppService, private formBuilder: FormBuilder, private dialog: MatDialog) {
    this.loginForm = this.formBuilder.group({
      username: '',
      password: ''
    })
  }

  ngOnInit(): void {
    this.credentials = {username: '', password: ''};
  }

  


}
