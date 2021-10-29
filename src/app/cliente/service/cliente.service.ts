import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Cliente } from '../model/cliente';

@Injectable()
export class ClienteService {
  
  constructor(private http: HttpClient) {}

  async getClientes() {
    return this.http
      .get<any>('assets/clientes.json')
      .toPromise()
      .then((res) => <Cliente[]>res.data)
      .then((data) => {
        return data;
      });
  }
}
