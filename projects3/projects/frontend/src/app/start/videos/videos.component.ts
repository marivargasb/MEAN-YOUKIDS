import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { Video } from '../../lib/video'; 
import { VideoService } from "../../services/video.service";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {
  private vi: Video[];
  danger = false;
  mensaje: string;
  pass = false;
  war= false;

  

  constructor(
    private VideoService: VideoService,
    private http: HttpClient,
    private router: Router,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    this.getVideo();
  }
  getUrl(vin){
   
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + vin.url+ '?ecver=2');
  }

  videOn(video){
  
    if(video.name.trim() == ''  || video.url.trim() == ''){ 
      this.war = true;
      this.mensaje= "todos los datos deben estar llenos";

    }else{
 

      this.vide(video);
    }

  }

  vide(video){

   // const id = video._id.trim();
    const name = video.name.trim();
    const url = video.url.trim();
    const type = "on";
    const id_parent = localStorage.getItem("id");
    const vid: Video = { name, url, type , id_parent} as Video;
    this.VideoService.AddVideo(vid)
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
        this.getVideo();
    }
    });

  }

  getVideo() {
    //alert("aqui");
    const id_parent = localStorage.getItem("id");
    this.VideoService.getVideos(id_parent)
      .subscribe(data => {
        console.log(data['video'] + "get video");
        this.VideoService.videoss = data['video'] as Video[];
      });

  }


  deleteVideo(id){

this.VideoService.deleteVideo(id) .subscribe(   data => {
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
     this.getVideo();
  }  });

  }


}
