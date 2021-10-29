import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ClienteComponent } from './cliente.component';
import { ClienteService } from './service/cliente.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TableModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    ClienteComponent
  ],
  declarations: [ClienteComponent],
  providers: [ClienteService]
})
export class ClienteModule { }
