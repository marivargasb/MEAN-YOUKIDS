import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import {Parent} from '../lib/parent';
import {ApiService} from "../services/api.service";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { element } from 'protractor';
import { empty } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [ApiService],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private pa: Parent[];
  editParent: Parent;
  danger = false;
  mensaje: string;
  pass = false;
  war= false;


  constructor(
    private apiService: ApiService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void  {
    this.is();
  }
  LoginParents(parent){

    const email= parent.email.trim(); 
    const password = parent.password.trim(); 

    if(email == "" || password == "" ){

      this.war = true
      this.mensaje= "Todos los datos deben estar llenos";
    }else{

    this. Login(parent);


    }

  }

  Login(parent){
    this.editParent = undefined;
    const email= parent.email.trim(); 
    const password = parent.password.trim(); 

    const NewParent: Parent ={email, password} as Parent;
    this.apiService.LoginParents(NewParent)
   .subscribe( data => {
    console.log( data);
    console.log("token" + data['parent']);
    
    if(!data['success']){
      this.war = false;
      this.pass = false;
      this.danger = true;
      this.mensaje=  data['message'];

     }else{
          
     //this.start.refresParent(data['id']);

     if(data['state'] === 'off'){   
      setTimeout(() => {
        this.router.navigate(['/code']); // Navigate to dashboard view
      }, 100);

    }else{
      this.apiService.user = true; 
      this.apiService.storeUserData(data['token'], data['id'],  this.apiService.user);
     // this.apiService.LoginParents.success
      setTimeout(() => {
        this.router.navigate(['/start']); // Navigate to dashboard view
      }, 1);
    }



     }

   });


   // this.apiService.LoginParents(Parent).subscribe((data)=> {

            // Check if response was a success or error
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
