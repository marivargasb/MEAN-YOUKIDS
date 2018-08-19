import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Kids} from '../lib/kids';
import {KidsService} from "../services/kids.service";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { element } from 'protractor';

@Component({
  selector: 'app-login-kids',
  templateUrl: './login-kids.component.html',
  styleUrls: ['./login-kids.component.css']
})
export class LoginKidsComponent implements OnInit {
  private ki: Kids[];
  danger = false;
  mensaje: string;
  pass = false;
  war= false;


  constructor(
    private kidsService: KidsService,
    private router: Router,
    private http: HttpClient
  ) { }


  
  ngOnInit(): void {
    this.is();
  }
  
  LoginKids(kids){
    const username= kids.username.trim(); 
    const pin = kids.pin.trim(); 


    if(username == "" || pin == "" ){

      this.war = true
      this.mensaje= "Todos los datos deben estar llenos";
    }else{

    this. Login(kids);


    }

  }



  Login(kids){

    const username= kids.username.trim(); 
    const pin = kids.pin.trim(); 
    
    const Newkids: Kids ={username, pin} as Kids;
    this.kidsService.LoginKids(Newkids)
   .subscribe( data => {
    console.log( data);
    console.log("token" + data['parent']);
    
    if(!data['success']){
      this.war = false;
      this.pass = false;
      this.danger = true;
      this.mensaje=  data['message'];

     }else{    
     this.kidsService.storeUserData(data['token'], data['id']);
     
     setTimeout(() => {
        this.router.navigate(['/home']); // Navigate to dashboard view
      }, 1);
     }

   });

  
  }

  is(){
    const id_parent = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    const id_kids = localStorage.getItem("id_kids");
    const token_kids = localStorage.getItem("token_kids");

      if((token != null) && (id_parent != null)){
        setTimeout(() => {
          this.router.navigate(['/start']); // Navigate to dashboard view
        }, 1);
      } else if((token_kids != null) && (id_kids != null)){
        setTimeout(() => {
          this.router.navigate(['/home']); // Navigate to dashboard view
        }, 1);
      }else{

      }

  }


  

}
