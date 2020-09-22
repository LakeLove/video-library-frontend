import { Component, OnInit} from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { GlobalsService } from '../services/globals.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  public loggedIn: boolean; 
  constructor(public globals: GlobalsService) { }

  ngOnInit(): void { 
    this.globals.getValue().subscribe((value) => {
      this.loggedIn = value;
    });
  }

}
