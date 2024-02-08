import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { LoginEntity } from '../models/login-entity';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiLogin = 'login'; 


  constructor(private http: HttpClient) { }

  login(credentials: LoginEntity): Observable<any> {
    return this.http.post(`${this.apiLogin}/login`, credentials);
  }

}
