import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PrincipalComponent } from './principal/principal.component';
import { RegisterComponent } from './principal/register/register.component'
import { LoginComponent } from './principal/login/login.component'
import { LoggedComponent } from './principal/logged/logged.component'
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [		
      AppComponent,
      PrincipalComponent,
      RegisterComponent,
      LoginComponent,
      LoggedComponent
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      IonicModule
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class AppModule { }