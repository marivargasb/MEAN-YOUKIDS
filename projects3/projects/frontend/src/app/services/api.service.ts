import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Http, Headers, RequestOptions, RequestMethod, } from '@angular/http';
import { Observable, of, throwError } from 'rxjs';
import { Parent } from '../lib/parent';
import { rendererTypeName } from '@angular/compiler';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    //'authorization': this.authToken 
  })
};

const params = new HttpParams().set('q', 'cironunes');
export interface LoginParents {
  accessToken: string;
  success: boolean;

}

@Injectable({ providedIn: 'root' }
)


export class ApiService {

  private tasksUrl = "http://localhost:8000/authentication/parents";  // URL to web api
  domain = "http://localhost:8000";
  parent;
  user:boolean = false;
   authToken;
  parentss: Parent[];
  selectParent: Parent;


  constructor(
    private http: HttpClient,     private router: Router,)  {

  }

  /* GET heroes from the server 
    getParents (): Observable<Parent[]> {
      return this.http.get<Parent[]>(this.tasksUrl)
        .pipe(
          catchError(this.handleError('getParent', []))
        );
    }
   */

  getParent(id: string): Observable<Parent[]> {
    console.log(id + "empleo");
    return this.http.get<Parent[]>(this.tasksUrl + `/${id}`)
      .pipe();

  }

  getOneParent(email: string): Observable<Parent[]> {
    // alert(email +"email");
    return this.http.get<Parent[]>(this.domain + '/authentication/parent' + `/${email}`)
      .pipe();

  }

  LoginCode(parent: Parent): Observable<Parent> {

    return this.http.post<Parent>(this.domain + '/authentication/code', parent, httpOptions)
      .pipe();

  }

  code(parent: Parent): Observable<Parent> {
    console.log("editar" + parent._id);

    return this.http.put<Parent>(this.domain + '/authentication/codes' + `/${parent._id}`, parent, httpOptions)
      .pipe();
  }

  registerParents(parent: Parent): Observable<Parent> {
    // alert("console service jijiiji" + parent.name);

    return this.http.post<Parent>(this.tasksUrl, parent, httpOptions)
      .pipe();
  }

  editParents(parent: Parent): Observable<Parent> {
    console.log("editar" + parent._id);

    return this.http.put<Parent>(this.tasksUrl + `/${parent._id}`, parent, httpOptions)
      .pipe();
  }


  LoginParents(parent: Parent): Observable<Parent> {

    return this.http.post<Parent>(this.domain + '/authentication/login', parent, httpOptions)
      .pipe();

  }

  deleteParent(id: string): Observable<Parent[]> {
    if (confirm('Are you sure to delete this acount') == true) {
      return this.http.delete<Parent[]>(this.tasksUrl + `/${id}`, httpOptions)
        .pipe();
    }
  }


  // Function to store user's data in client local storage
  storeUserData(token, id, user) {


      this.authToken = token; // Assign token to be used elsewhere
      localStorage.setItem('token', token); // Set token in local storage
      localStorage.setItem('id', id); // Set user in local storage as string
      this.user = true;

    
  // alert(this.authToken + this.user);
  }

  logout() {
    this.authToken = null; // Set token to null
    this.user = false; // Set user to null
    localStorage.clear(); // Clear local storage
   //   alert(this.authToken + "user"+ this.user);
    setTimeout(() => {
      this.router.navigate(['/register']); // Navigate to dashboard view
    }, 1);
  }



}

