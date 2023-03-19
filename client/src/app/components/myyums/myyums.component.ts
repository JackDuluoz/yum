import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-myyums',
  templateUrl: './myyums.component.html',
  styleUrls: ['./myyums.component.scss'],
})
export class MyyumsComponent implements OnInit {

  yums: Array<any> = []

  getYumsForUser() {
    let id: string | null
    if (sessionStorage.getItem('userId') === null) {
      this.router.navigate(['/user'])
    }
    id = sessionStorage.getItem('userId')
    this.databaseService.getUser(id).subscribe(
      (response) => {
        this.yums = response.yums
      }
    )
  }

  constructor(private databaseService: DatabaseService, public router: Router) {}

  ngOnInit() {
    this.getYumsForUser()
  }

  onReview() {
    console.log("Clicked Review")
  }

  onRemove() {
    console.log("Clicked Remove")
  }

}
