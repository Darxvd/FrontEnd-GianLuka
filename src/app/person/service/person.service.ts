import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  codigo = 0;

  private urlAllActive = 'person/list-active'
  private urlDeleteSoft = 'person/delete'
  private urlSex = 'sex/list'
  private urlRegister = 'person/register'
  private urlUpdate = 'person/update'

  constructor(private http: HttpClient) { }

  listActivePerson(): Observable<any>{
    return this.http.get<any>(this.urlAllActive);
  }

  listSex(): Observable<any>{
    return this.http.get<any>(this.urlSex);
  }

  saveOrUpdatePerson(personData: any): Observable<any> {
    if (personData.idPersona) {
      const url = `${this.urlUpdate}/${personData.idPersona}`;
      return this.http.put<any>(url, personData);
    } else {
      return this.http.post<any>(this.urlRegister, personData);
    }
  }

  deleteSoftPerson(codigo: number){
    return this.http.delete(this.urlDeleteSoft+'/'+codigo);
  }

}
