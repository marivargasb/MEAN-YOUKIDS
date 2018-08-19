import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {ApiService} from "./services/api.service";
import { homedir } from 'os';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  authToken;
  user;
  pass = false;
  no = false;

  constructor( private router: Router,   private apiService: ApiService,){}

  dato = "";
  
  ngOnInit():void{
  this.homediv();
    
  
  }


   homediv(){

    const token = localStorage.getItem("token");

    const token_kids = localStorage.getItem("token_kids");

      if((token != null) ||  (token_kids != null)){
        this.pass = true;
        this.no = false;
      }else{
        this.pass = false;
        this.no = true
      }
   }


}
