import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private urlAllActive = 'person/list-active'
  private urlDeleteSoft = 'person/delete'
  private urlSex = 'sex/list'

  constructor(private http: HttpClient) { }

  listActivePerson(): Observable<any>{
    return this.http.get<any>(this.urlAllActive);
  }

  listSex(): Observable<any>{
    return this.http.get<any>(this.urlSex);
  }

  deleteSoftPerson(codigo: number){
    return this.http.delete(this.urlDeleteSoft+'/'+codigo);
  }

}
