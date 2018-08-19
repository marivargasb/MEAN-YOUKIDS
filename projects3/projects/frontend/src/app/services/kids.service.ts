import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Http, Headers, RequestOptions, RequestMethod,  } from '@angular/http';
import { Observable, of, throwError } from 'rxjs';
import { Kids } from '../lib/kids';
import { rendererTypeName } from '@angular/compiler';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/map';
import { AlertPromise } from 'selenium-webdriver';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
 
  })
};

const params = new HttpParams().set('q', 'cironunes');
interface Loginkids{
  accessToken: string;
  success: boolean;
  


}

@Injectable({providedIn: 'root'})

export class KidsService {

  private tasksUrl = "http://localhost:8000/kids/kids";  // URL to web api
  domain = "http://localhost:8000";
  kids;
  authToken = null;
  kidss: Kids[];
  kidsH: Kids[];
  selectkids: Kids; 
  userKids = false;


  constructor(  private http: HttpClient) { }


  AddKids (kids: Kids): Observable<Kids> {
    //alert("console service jijiiji" + kids.name);
    
     return this.http.post<Kids>(this.tasksUrl, kids, httpOptions )
     .pipe( );
    }



   getKIds(id_parent: string): Observable<Kids[]>{

     return this.http.get<Kids[]>(this.tasksUrl + `/${id_parent}`) 
   .pipe();

   } 

   getOneKids(id: string): Observable<Kids[]>{ 
    return this.http.get<Kids[]>(this.domain + '/kids/kid'+ `/${id}`) 
    .pipe();
   }

   uploadKids (kids: Kids): Observable<Kids> {
    //console.log("editar" + kids._id);
     return this.http.put<Kids>(this.tasksUrl + `/${kids._id}`,kids, httpOptions )
     .pipe( );
    }  

    deleteKids(id: string): Observable<Kids[]> {

      
      if (confirm('Are you sure to delete this kids') == true) {
      return this.http.delete<Kids[]>(this.tasksUrl + `/${id}`, httpOptions) 
      .pipe();
      }
    }
    
      LoginKids (kids: Kids): Observable<Kids> {
       // alert(kids.username + kids.pin + "service");
       console.log(kids + "console");
        return this.http.post<Kids>(this.domain + '/kids/kids/login', kids , httpOptions )
        .pipe();
    }


    storeUserData(token, id) {
   //   localStorage.setItem('token', token); // Set token in local storage
      localStorage.setItem('id_kids', id); // Set user in local storage as string
      localStorage.setItem('token_kids', token);
      this.authToken = token; // Assign token to be used elsewhere
   //   this.kids = user; // Set user to be used elsewhere
    }


}


