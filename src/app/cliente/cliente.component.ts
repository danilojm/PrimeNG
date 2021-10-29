import { Component, OnInit } from '@angular/core';
import { Cliente } from './model/cliente';
import { ClienteService } from './service/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
      this.clienteService.getClientes().then(data => this.clientes = data);
  }


}
