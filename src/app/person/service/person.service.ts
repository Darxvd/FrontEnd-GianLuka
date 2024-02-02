import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  codigo = 0;
  nombre = '';

  private urlAllActive = 'person/list-active'
  private urlDeleteSoft = 'person/delete'
  private urlSex = 'sex/list'
  private urlRegister = 'person/register'
  private urlUpdate = 'person/update'
  private urlAllInactive = 'person/list-inactive'
  private urlAllPerson = 'person/list-all'
  private urlPersonNameActive = 'person/list-by-name-active'
  private urlPersonNameInactive = 'person/list-by-name-inactive'
  private urlDeleteHard = 'person/delete/definit'
  private urlActivatePerson = 'person/activate'
  private urlPersonTypeActive = 'person/list-by-type-active'
  private urlPersonTypeInactive = 'person/list-by-type-inactive'

  constructor(private http: HttpClient) { }

  listActivePerson(): Observable<any>{
    return this.http.get<any>(this.urlAllActive);
  }

  listInactivePerson(): Observable<any>{
    return this.http.get<any>(this.urlAllInactive);
  }

  listAllPerson(): Observable<any>{
    return this.http.get<any>(this.urlAllPerson);
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

  
  deleteHardperson(codigo: number){
    return this.http.delete(this.urlDeleteHard+'/'+codigo);
  }

  findNameActive(nombre:string){
    return this.http.get<any>(this.urlPersonNameActive+'/'+ nombre)
  }

  findNameInactive(nombre:string){
    return this.http.get<any>(this.urlPersonNameInactive+'/'+ nombre)
  }

  activatePerson(codigo: number): Observable<any> {
    const url = `${this.urlActivatePerson}/${codigo}`;
    return this.http.put<any>(url, {});
  }

  findTypePersonActive(categoria: number) {
    if (categoria === 0) {
      return this.http.get<any>(this.urlAllActive);
    } else {
      return this.http.get<any>(this.urlPersonTypeActive + '/' + categoria); 
    }
  }
  findTypePersonInactive(categoria: number) {
    if (categoria === 0) {
      return this.http.get<any>(this.urlAllInactive);
    } else {
      return this.http.get<any>(this.urlPersonTypeInactive + '/' + categoria); 
    }
  }

}
