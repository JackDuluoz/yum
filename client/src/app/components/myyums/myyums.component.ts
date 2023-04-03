import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { DatabaseService } from 'src/app/services/database.service';

interface Yum {
  name: string;
  type: string;
}

@Component({
  selector: 'app-myyums',
  templateUrl: './myyums.component.html',
  styleUrls: ['./myyums.component.scss'],
})
export class MyyumsComponent implements OnInit {

  yums: Array<Yum> = []

  getYumsForUser() {
    let id: string = sessionStorage.getItem('userId')!
    this.databaseService.getUser(id).subscribe(
      (response) => {
        this.yums = response.yums
      }
    )
  }

  constructor(private databaseService: DatabaseService, public router: Router) {}

  ngOnInit() {
    if (sessionStorage.getItem('userId')) {
      this.getYumsForUser()
    } else {
      this.router.navigate(['/user'])
    }
  }

  onReview() {
    console.log("Clicked Review")
  }

  onRemove(event: any) {
    console.log("Clicked Remove")
    const id = sessionStorage.getItem('userId')!
    const name = event.target.attributes.name.value
    const type = event.target.attributes.type.value
    const yum = {
      "name": name,
      "type": type
    }
    // console.log(name)
    // console.log(type)
    console.log(yum)
    // console.log(event)
    // console.log(id)
    // console.log(event)
    // console.log(this)
    this.databaseService.removeYumFromUser(id, yum ).subscribe(
      (response) => {
        console.log(response)
      },
      (error) => {
        console.log(error)
      }
    )
    this.yums.splice(this.yums.findIndex(a => a.name === yum.name) , 1)
  }

}
