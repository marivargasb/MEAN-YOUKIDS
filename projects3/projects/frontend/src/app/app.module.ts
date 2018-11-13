import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './/app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { LoginKidsComponent } from './login-kids/login-kids.component';
import {MatButtonModule, MatCardModule, MatToolbarModule, MatInputModule} from '@angular/material';
import { FormsModule , ReactiveFormsModule}   from '@angular/forms';
import { StartComponent } from './start/start.component';
//import {  AddKids } from './start/start.component';
import { JwtModule } from '@auth0/angular-jwt';
import { VideosComponent } from '../app/start/videos/videos.component';
import { KidsComponent } from '../app/start/kids/kids.component';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CodeComponent } from './code/code.component';
//import { MaterialModule } from './material.module';
import {AuthService} from './services/auth.service'
import {AuthGuard} from './services/auth-guard-service';

import { AlertsModule } from 'angular-alert-module';
import { importType } from '@angular/compiler/src/output/output_ast';




export function tokenGetter() {
  return localStorage.getItem('access_token');
}


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    LoginKidsComponent,
    StartComponent,
    VideosComponent,
    KidsComponent,
    CodeComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatButtonModule, 
    MatCardModule, 
    MatToolbarModule, 
    MatInputModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AlertsModule.forRoot()
    
  ],
  entryComponents: [StartComponent],
  providers: [AuthService,AuthGuard ],
  bootstrap: [AppComponent]
})

export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);

