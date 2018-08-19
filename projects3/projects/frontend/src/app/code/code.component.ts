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


@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent implements OnInit {
  private pa: Parent[];
  editParent: Parent;
  danger = false;
  mensaje: string;
  pass = false;
  war= false;


  constructor( 
    private apiService: ApiService,
    private router: Router,
    private http: HttpClient) { }

  ngOnInit() {
  }

  codes(parent){

    const email= parent.email.trim(); 
    const code = parent.code.trim(); 

    if(email == "" || code == "" ){

      this.war = true
      this.mensaje= "Todos los datos deben estar llenos";
    }else{

     this.codea(parent);

    }

  }

  codea(parent){
    const email= parent.email.trim(); 
    const code = parent.code.trim(); 
    const New: Parent ={email, code} as Parent;
  
    this.apiService.LoginCode(New)
   .subscribe( data => {
    console.log( data);
    console.log("token" + data['parent']);
    
    if(!data['success']){
      this.war = false;
      this.pass = false;
      this.danger = true;
      this.mensaje= "Error al combrobar el codigo";

     }else{
    
      const _id = data['id'];
      const pa: Parent ={email, _id } as Parent;  
      this.apiService.code(pa)
       .subscribe( datas => {
    
      if(!datas['success']){
         
        this.war = false;
      this.pass = false;
      this.danger = true;
      this.mensaje= "Error al combrobar el codigo";
       }else{
         this.apiService.user =true;

        this.apiService.storeUserData(datas['token'], datas['id'], this.apiService.user );
        setTimeout(() => {
          this.router.navigate(['/start']); // Navigate to dashboard view
        }, 1);
    
         
       }


   });

   // this.apiService.LoginParents(Parent).subscribe((data)=> {

            // Check if response was a success or error
  }

   });

  }

}
