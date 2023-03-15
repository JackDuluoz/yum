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

  credentials = {
    email: "",
    password: ""
  }

  constructor(private databaseService: DatabaseService) { }

  ngOnInit() {
  }

  getSession() {
    return sessionStorage.getItem('userId');
  }

  onSubmit() {
    this.databaseService.login(this.credentials)
    this.credentials.email = ''
    this.credentials.password = ''
  }

}
