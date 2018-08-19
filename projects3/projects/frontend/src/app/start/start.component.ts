import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewEncapsulation , Inject } from '@angular/core';
import {Parent} from '../lib/parent';
import {ApiService} from "../services/api.service";
import { ToastrService } from 'ngx-toastr';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import {MatDialogModule} from '@angular/material/dialog';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],

})

export class StartComponent{
  private pa: Parent[];
  modalRef: BsModalRef;
  closeResult: string;
  danger = false;
  mensaje: string;
  pass = false;
  war= false;

  constructor(private apiService: ApiService,
              private http: HttpClient,
              private router: Router,
          
              ){}
         

  ngOnInit():void{
    this.resetForm();
    this.refresParent();
    
  
  }

    

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.apiService.selectParent = {
      _id: "",
      name: "",
      surnames: "",
      country: "",
      birth: ""
    }
  }
   
  editparent(parent ){
    
    const _id = parent._id; 
    const name = parent.name; 
    const surnames = parent.surnames; 
    const country = parent.country; 

    if(_id == "" || name =="" || surnames == "" || country == ""){

      this.war = true;
      this.mensaje= "todos los datos deben estar llenos";
    }else{

      this.edit(parent);
    }

  }

  edit(parent ){

    const _id = parent._id; 
    const name = parent.name; 
    const surnames = parent.surnames; 
    const country = parent.country;   
    const state = "on"; 
  //alert("holaaa" + _id + name + surnames + country);
      const Parent : Parent ={_id,name, surnames, country , state} as Parent;
      this.apiService.editParents(Parent)
      .subscribe(   data => {
  
    this.refresParent();
    this.resetForm();

      
      if(!data['success']){
        this.war = false;
        this.pass = false;
        this.danger = true;
        this.mensaje= "Error al editar";
  
       }else{
        this.refresParent();
        this.resetForm();
        this.danger = false;
        this.war = false;
        this.pass = true;
        this.mensaje= "Editado exitosamente";
      
       }
    
      });

       }


       deleteparent(){
        const id = localStorage.getItem("id");

        this.apiService.deleteParent(id) .subscribe(   data => {

            if(!data['success']){
              this.war = false;
              this.pass = false;
              this.danger = true;
              this.mensaje= "Error al eliminar";
        
             }else{
             
      this.danger = false;
      this.war = false;
      this.pass = true;
      this.mensaje= "Eliminado exitosamente";
            
      setTimeout(() => {
        this.router.navigate(['/register']); // Navigate to dashboard view
      }, 1);
     }
             

            });
       } 
       
       onedit(parent: Parent){
         this.apiService.selectParent = parent;
       }
      refresParent() {
        const id = localStorage.getItem("id");
        this.apiService.getParent(id).subscribe((res) => {
          console.log(res['parent']);
          this.apiService. parentss = res['parent'] as Parent[];
          console.log(res);


        });
      }

    

}
