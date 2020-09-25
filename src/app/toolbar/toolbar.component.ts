import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { GlobalsService } from '../services/globals.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  public loggedIn: boolean;
  searchForm;
  searchTerm: string;

  constructor(public globals: GlobalsService, private formBuilder: FormBuilder, private router: Router) { 
    this.searchForm = this.formBuilder.group({
      term: new FormControl(this.searchTerm, [
        Validators.required,
        Validators.minLength(1)
      ])
    })
  }

  ngOnInit(): void { 
    this.globals.getValue().subscribe((value) => {
      this.loggedIn = value;
    });
  }

  onSubmit(searchData): void{
    this.searchTerm = searchData.term;
    this.searchTerm = this.searchTerm.trim();
    if(this.searchTerm != null && !(this.searchTerm ==="")){
      this.router.navigateByUrl('/search/' + this.searchTerm );
    }
  }

}
