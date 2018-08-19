import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';
import { AuthService }      from './auth.service';
import {ApiService} from "./api.service";
import {KidsService} from "./kids.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(

      private router: Router,
      private apiService: ApiService,
   
    ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const id_parent = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    const id_kids = localStorage.getItem("id_kids");
    const token_kids = localStorage.getItem("token_kids");

      if((token != null) && (id_parent != null)){
      //  alert("hola papas");
        return true;
      } else if((token_kids != null) && (id_kids != null)){
      //  alert("hola hijos");
        return true;    
      }else{

      // alert("no");
        this.router.navigate(['/login']);
      }
  }

  /**    canActivateK(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {


    console.log("AUTH" +this.apiService.user);

    const id_kids = localStorage.getItem("id_kids");
    const token_kids = localStorage.getItem("token_kids");

      if((token_kids != null) && (id_kids != null)){
        alert("hola hijos");
        return true;    
      }else{

       alert("no");
        this.router.navigate(['/login']);
      }
  } */


  
  }