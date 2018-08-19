import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import {Parent} from '../lib/parent';
import {ApiService} from "../services/api.service";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 private pa: Parent[];
 danger = false;
 mensaje: string;
 pass = false;
 war= false;

  
  constructor(   
     private apiService: ApiService,
     private http: HttpClient,   private router: Router, ) { }

  ngOnInit(): void { 
   this.is();

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




  calcularEdad(fecha) {
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }
    console.log("edad" + edad);
    if(edad < 18){
      console.log("MENOR");
     return false;
    }else{
      return true;
    }

 
}

registerParents(parent){

  const email = parent.email.trim(); 
  const password = parent.password.trim(); 
  const passwordConfirmation = parent.passwordConfirmation.trim();
  const name = parent.name.trim(); 
  const surnames = parent.surnames.trim(); 
  const country = parent.country.trim();  
  const birth = parent.birth.trim();
  if(email== ""  || password == ""  ||  passwordConfirmation == "" || name == "" || surnames == "" || country == "" || birth == ""   ){
    this.danger =false;
    this.war = true;
    this.mensaje= "Todos los datos deben estar llenos";

  }else if(password !== passwordConfirmation){
    this.danger =false;
    this.war = true;
    this.mensaje= "las contrasenas no coinsiden";
  }else if(!(this.calcularEdad(birth))){
    this.war =false;
    this.danger = true;
    this.mensaje= "Tiene que ser mayor de edad para registrarse";

  }else{

  this.register(parent);
  }


}

register(parent){


    const email = parent.email.trim(); 
    const password = parent.password.trim(); 
    const passwordConfirmation = parent.passwordConfirmation.trim();
    const name = parent.name.trim(); 
    const surnames = parent.surnames.trim(); 
    const country = parent.country.trim();  
    const birth = parent.birth.trim();
    const state = "off"; 

      
 
    
          const Parent : Parent ={email, password,name, surnames, country , birth, state} as Parent;
          this.apiService.registerParents(Parent)
          .subscribe(   datas => {
              
              if(!datas['success']){
                this.war = false;
                this.pass = false;
                this.danger = true;
                this.mensaje= "Error al Registrar";  }
                else{   
                  this.danger = false;
                  this.war = false;
                  this.pass = true;
                  this.mensaje= "Registrado exitosamente";
                }
            
              }); 


  
  
       }



       

}

