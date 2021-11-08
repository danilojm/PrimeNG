import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/person/model/person'
import { PersonService } from './service/person.service'
import { MenuItem } from 'primeng/api';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  persons: Person[] = [];
  cols: any[] = [];
  items: MenuItem[] = [];
  
  displaySaveDialog: boolean = false;
  person: Person = {
    id: null,
    name: '',
    email: '',
    jobTitle: '',
    phone: '',
    imageURL: '',
    employeeCode: ''
  };

  selectedPerson: Person = {
    id: null,
    name: '',
    email: '',
    jobTitle: '',
    phone: '',
    imageURL: '',
    employeeCode: ''
  };

  constructor(private personService: PersonService, 
              private messageService: MessageService, 
              private confirmService: ConfirmationService) { }

  getAll() {
    this.personService.getAll().subscribe(
      (result: any) => {
        let persons: Person[] = [];
        for (let i = 0; i < result.length; i++) {
          let person = result[i] as Person;
          persons.push(person);
        }
        this.persons = persons;        
      },
      error => {
        console.log(error);
      }
    );
  }

  showSaveDialog(editar: boolean) {
    if (editar) {
      if (this.selectedPerson != null && this.selectedPerson.id != null) {
        this.person = this.selectedPerson;
      }else{
        this.messageService.add({severity : 'warn', summary: "Advertencia!", detail: "Por favor selecione um registro"});
        return;
      }
    } else {
      this.person = new Person();
    }
    this.displaySaveDialog = true;
  }

  save() {
    if(this.person.id){
      console.log("UPDATE")
      this.personService.update(this.person).subscribe(
        (result: any) => {
          let person = result as Person;
          this.validarPessoa(person);
          this.messageService.add({ severity: 'success', summary: "Resultado", detail: "Registro salvo com sucesso!" });
          this.displaySaveDialog = false;
        },
        error => {
          console.log(error);
        }
      );
    } else {
      console.log("SAVE")
      this.personService.save(this.person).subscribe(
        (result: any) => {
          let person = result as Person;
          this.validarPessoa(person);
          this.messageService.add({ severity: 'success', summary: "Resultado", detail: "Registro salvo com sucesso!" });
          this.displaySaveDialog = false;
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  delete(){
    if(this.selectedPerson == null || this.selectedPerson.id == null){
      this.messageService.add({severity : 'warn', summary: "Advertencia!", detail: "Por favor selecionar um registro"});
      return;
    }
    const idDel = this.selectedPerson.id;
    this.confirmService.confirm({
      message: "Deletar o registro?",
      accept : () =>{
        this.personService.delete(this.selectedPerson.id).subscribe(
          (result:any) =>{
            console.log(result)            
            this.messageService.add({ severity: 'success', summary: "Resultado", detail: "Registro deletado com sucesso! id =  "+idDel });
            this.deleteObject(idDel);
          }
        )
      }
    })
  }

  deleteObject(id:number){
    let index = this.persons.findIndex((e) => e.id == id);
    if(index != -1){
      this.persons.splice(index, 1);
    }
  }

  validarPessoa(person: Person){
    let index = this.persons.findIndex((e) => e.id == person.id);
    if(index != -1){
      this.persons[index] = person;
    }else{
      this.persons.push(person);
    }
  }
  
  ngOnInit() {
    this.getAll();
    this.cols = [
      { field: "name", header: "Nome" },
      { field: "email", header: "Email" },
      { field: "jobTitle", header: "Cargo" },
      { field: "phone", header: "Telefone" },
      { field: "imageURL", header: "Imagem" },
      { field: "employeeCode", header: "Código" }
    ];


    this.items = [
      {
        label: "Novo",
        icon: 'pi pi-fw pi-plus',
        command: () => this.showSaveDialog(false)
      },
      {
        label: "Editar",
        icon: "pi pi-fw pi-pencil",
        command: () => this.showSaveDialog(true)
      },
      {
        label: "Deletar", 
        icon: "pi pi-fw pi-times",
        command: () => this.delete()
      }
    ]

  }

}
