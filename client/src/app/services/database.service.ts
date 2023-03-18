import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  readonly Root_URL

  constructor(private http: HttpClient) {
    this.Root_URL = "http://localhost:3000/"
  }

  // getUsers() {
  //   return this.http.get('http://localhost:3000/users').subscribe(
  //     (data) => console.log(data)
  //   )
  // }

  login(credentials: object): Observable<any> {
    return this.http.post('http://localhost:3000/users/login', credentials)
  }

  register(registration: object): Observable<any> {
    return this.http.post('http://localhost:3000/users/register', registration)
  }
}
