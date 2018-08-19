
import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {KidsService} from "./kids.service";


@Injectable()

export class AuthService{

public logueado: boolean= false
login(){

    if(this.logueado){

        return true
    }else{

        console.log("no puedes pasar");
        return false;
    }
 
}

}