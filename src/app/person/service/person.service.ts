import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from 'src/app/person/model/person'


@Injectable({
  providedIn: 'root'
})
export class PersonService {

  baseUrl:string = "http://localhost:8080/employee";

  constructor(private http:HttpClient) { }

  

  getAll() : Observable<any>{
    return this.http.get(this.baseUrl + "/all");
  }

  save(person: Person): Observable<any>{  
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    headers.append('Accept', 'application/json')
    return this.http.post(this.baseUrl +"/save", JSON.stringify(person), {headers: headers})
  }

  update(person: Person): Observable<any>{  
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    headers.append('Accept', 'application/json')
    return this.http.put(this.baseUrl +"/update", JSON.stringify(person), {headers: headers})
  }

  delete(id: number) : Observable<any>{
    console.log("Deletar id: " + id)
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    headers.append('Accept', 'application/json')
    return this.http.delete(this.baseUrl + "/delete/"+id, {headers: headers})
  }
}
