import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Http, Headers, RequestOptions, RequestMethod,  } from '@angular/http';
import { Observable, of, throwError } from 'rxjs';
import { Video } from '../lib/video';
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


@Injectable({ providedIn: 'root'})

export class VideoService {
  private tasksUrl = "http://localhost:8000/videos/videos";  // URL to web api
  domain = "http://localhost:8000";
  kids;
  authToken;
  videoss: Video[];
  selectvideo: Video;
  videoK: Video[]; 
  user;
  constructor(private http: HttpClient) { }


  AddVideo(video : Video): Observable<Video> {
   
    return this.http.post<Video>(this.tasksUrl, video, httpOptions )
    .pipe( );

  }

  getVideos(id_parent: string): Observable<Video[]>{

    return this.http.get<Video[]>(this.tasksUrl + `/${id_parent}`) 
    .pipe();

  }

  deleteVideo(id: string):  Observable<Video[]>{

      
    if (confirm('Are you sure to delete this kids') == true) {
    return this.http.delete<Video[]>(this.tasksUrl + `/${id}`, httpOptions) 
    .pipe();
    }
  }
}

