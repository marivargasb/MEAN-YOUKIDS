import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Kids} from '../lib/kids';
import {KidsService} from "../services/kids.service";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { element } from 'protractor';
import { Video } from '../lib/video'; 
import { VideoService } from "../services/video.service";
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private ki: Kids[];
  private vi: Video[];

  constructor(
    private VideoService: VideoService,
    private kidsService: KidsService,
    private router: Router,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
   this.refresKids();
  }
  getUrl(vin){
   
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + vin.url+ '?ecver=2');
  }

  refresKids(){
    const id = localStorage.getItem("id_kids");
    this.kidsService.getOneKids(id).subscribe((res) => {
      console.log(res);
      this.kidsService.kidsH = res['kids'] as Kids[];
      
      const parent = res['parent'];
      console.log(res['kids']);
     // alert("parent id : "+parent + "name: "+res['name']);
      this.VideoService.getVideos(parent)
      .subscribe(data => {
        this.VideoService.videoK = data['video'] as Video[];
      });
  
    });
  }

}
