import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [DatabaseService]
})
export class UserComponent implements OnInit {

  session: boolean = true;

  loginError: any = null
  registrationError: any = null

  credentials = {
    email: "",
    password: ""
  }

  registration = {
    username: "",
    email: "",
    password: ""
  }

  constructor(private databaseService: DatabaseService) { }

  ngOnInit() {
  }

  getSession() {
    return sessionStorage.getItem('userId');
  }

  onLogin() {
    let resObj: any;
    let errObj: any;
    this.databaseService.login(this.credentials).subscribe(
      (response) => {
        resObj = response
        sessionStorage.setItem('userId', resObj.user._id)
        sessionStorage.setItem('user', resObj.user.username)
      },
      (error) => {
        errObj = error
        this.loginError = errObj.error.message
        setTimeout(() => {
          this.loginError = null
        }, 3000)
      }
    )
    this.credentials.email = ''
    this.credentials.password = ''
  }

  onRegister() {
    let resObj: any;
    let errObj: any;
    this.databaseService.register(this.registration).subscribe(
      (response) => {
        resObj = response
        sessionStorage.setItem('userId', resObj.user._id)
        sessionStorage.setItem('user', resObj.user.username)
      },
      (error) => {
        errObj = error
        this.registrationError = errObj.error.message
        setTimeout(() => {
          this.registrationError = null
        }, 3000)
      }
    )
    this.registration.username = ''
    this.registration.email = ''
    this.registration.password = ''
  }

}
