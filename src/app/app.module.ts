import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ClienteModule } from './cliente/cliente.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ClienteModule,
    BrowserModule,
    AppRoutingModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
