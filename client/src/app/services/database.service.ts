import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  login(credentials: object) {
    let userObj: any;
    return this.http.post('http://localhost:3000/users/login', credentials).subscribe(
      (response) => {
        console.log(response)
        userObj = response
        if (userObj.user._id) {
          sessionStorage.setItem('userId', userObj.user._id)
          sessionStorage.setItem('user', userObj.user.username)
        }
      }
    )
  }

  register(registration: object) {
    let userObj: any;
    return this.http.post('http://localhost:3000/users/register', registration).subscribe(
      (response) => {
        console.log(response)
        userObj = response
        if (userObj.user._id) {
          sessionStorage.setItem('userId', userObj.user._id)
          sessionStorage.setItem('user', userObj.user.username)
        }
      }
    )
  }
}
