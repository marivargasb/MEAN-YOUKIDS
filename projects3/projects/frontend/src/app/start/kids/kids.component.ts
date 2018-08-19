import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { Kids } from '../../lib/kids';
import { KidsService } from "../../services/kids.service";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-kids',
  templateUrl: './kids.component.html',
  styleUrls: ['./kids.component.css']
})
export class KidsComponent implements OnInit {
  private ki: Kids[];
  danger = false;
  mensaje: string;
  pass = false;
  war= false;

  constructor(
    private KidsService: KidsService,
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder,
   ) {
  

     }
     

  ngOnInit(): void {
    this.getKids();
    this.resetForm();

 
  }


  AddKids(kids){

    const name = kids.name.trim();
    const username = kids.username.trim();
    const pin = kids.pin.trim();
    const birth = kids.birth.trim();


    if(name == ""  || username == ""  ||  pin == "" || birth == ""  ){

      this.war = true
      this.mensaje= "Todos los datos deben estar llenos";
  
    }else if(kids.pin.length!=6){

      this.war = true;
      this.mensaje= "Pin debe tener 6 caracteres";

    }else if(isNaN(parseInt(kids.birth))){

      this.war = true;
      this.mensaje= "Edad no es un numero";

    }else if(kids.birth > 17){

      this.war = true;
      this.mensaje= "Este no es un kids";

    }else{
   
      this.Add(kids);
   


    }

  }
 

  Add(kids) {
    alert("add kids");

    const id = kids._id.trim();
    const name = kids.name.trim();
    const username = kids.username.trim();
    const pin = kids.pin.trim();
    const birth = kids.birth.trim();
    const id_parent = localStorage.getItem("id");

    if (id == "") {
      const Kids: Kids = { name, username, pin, birth, id_parent } as Kids;

      this.KidsService.AddKids(Kids)
        .subscribe(data => {
          if (!data['success']) {
            this.war = false;
            this.pass = false;
            this.danger = true;
            this.mensaje= "Error al Registrar";
          } else { 
            this.danger = false;
            this.war = false;
            this.pass = true;
            this.mensaje= "Registrado exitosamente";
          this.getKids();
          this.resetForm();
        }
        });

    } else {

      const Kids: Kids = { name, username, pin, birth } as Kids;
      this.KidsService.uploadKids(kids)
        .subscribe(data => {

          this.getKids();
          this.resetForm();


          if (!data['success']) {
            this.war = false;
            this.pass = false;
            this.danger = true;
            this.mensaje= "Error al editar";
          } else {
            this.getKids();
            this.resetForm();
            this.danger = false;
            this.war = false;
            this.pass = true;
            this.mensaje= "Editado exitosamente";
          }

        });
    }

  }



  getKids() {
    //alert("aqui");
    const id_parent = localStorage.getItem("id");
    this.KidsService.getKIds(id_parent)
      .subscribe(data => {
        console.log(data['kids'] + "alert get");
        this.KidsService.kidss = data['kids'] as Kids[];


      });

  }

  editKids(emp) {
    this.KidsService.selectkids = emp;
  }


  deleteKids(id){

    this.KidsService.deleteKids(id) .subscribe(   data => {
   if(!data['success']){  
     this.war = false;
    this.pass = false;
    this.danger = true;
    this.mensaje= "Error al eliminar";
     }else{      this.danger = false;
      this.war = false;
      this.pass = true;
      this.mensaje= "Eliminado exitosamente";
         this.getKids();
         this.resetForm();
   }  });
        
   }



  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.KidsService.selectkids = {
      _id: "",
      name: "",
      username: "",
      pin: "",
      birth: ""
    }

  }

}
