import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const apiUrl = `${environment.apiUrl}`; 
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient, public router: Router) {}

  getUsers(data: any): Observable<any> {
    return this.http.post<any>(apiUrl + "/Users/GetAllUsers", data, { headers: this.headers });
  }
}
