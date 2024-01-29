import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  private urlAllActive = 'type/list-active'

  constructor(private http: HttpClient) { }

  
  listActivType(): Observable<any>{
    return this.http.get<any>(this.urlAllActive);        
  }
}
