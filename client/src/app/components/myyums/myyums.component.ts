import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myyums',
  templateUrl: './myyums.component.html',
  styleUrls: ['./myyums.component.scss'],
})
export class MyyumsComponent implements OnInit {

  yums = [
    { name: "Ciao!", type: "Italian" },
    { name: "Le Hueng", type: "Chinese" },
    { name: "Pashwindi", type: "Indian" },
    { name: "Formosa", type: "Thai" },
    { name: "Bobby's Bites", type: "Diner" },
    { name: "Je Suis", type: "French" },
    { name: "Hallo Weld", type: "German" },
    { name: "Kyoto", type: "Japanese" }
  ]

  constructor() {}

  ngOnInit() {

  }

  onReview() {
    console.log("Clicked Review")
  }

  onRemove() {
    console.log("Clicked Remove")
  }

}
