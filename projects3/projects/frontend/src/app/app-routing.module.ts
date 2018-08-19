import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent} from './register/register.component';
import { HomeComponent} from './home/home.component';
import { LoginKidsComponent } from './login-kids/login-kids.component';
import { StartComponent } from './start/start.component';
//import { VideosComponent } from './videos/videos.component';
//import { KidsComponent } from '../app/start/kids/kids.component';
import { CodeComponent } from './code/code.component';
import {CanActivate} from "@angular/router";
import {ApiService} from "./services/api.service";
import {AuthGuard} from './services/auth-guard-service';

//import {AlwaysAuthGuard} from "./AlwaysAuthGuard";
const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent},
    { path: 'home', component: HomeComponent , canActivate: [AuthGuard]},
    { path: 'login-kids', component: LoginKidsComponent},
    { path: 'start', component: StartComponent, canActivate: [AuthGuard] },
    { path: 'code', component: CodeComponent}
   //{ path: 'videos', component: VideosComponent},
   //{ path: 'kids', component: KidsComponent},


  ]
  @NgModule({
    exports: [ RouterModule ],
    imports: [ RouterModule.forRoot(routes) ],
   // providers: [AlwaysAuthGuard],
    
   
  })
export class AppRoutingModule { }


