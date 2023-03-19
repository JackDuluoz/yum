import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myyums',
  templateUrl: './myyums.component.html',
  styleUrls: ['./myyums.component.scss'],
})
export class MyyumsComponent implements OnInit {

  yums = [
    { name: "rest1", type: "italian" },
    { name: "rest2", type: "chinese" },
    { name: "rest3", type: "indian" },
    { name: "rest4", type: "thai" },
    { name: "rest5", type: "diner" },
    { name: "rest6", type: "french" },
    { name: "rest7", type: "german" },
    { name: "rest8", type: "japanese" }
  ]

  longText = `A generic restaurant that sells okay food.`;

  constructor() {}

  ngOnInit() {

  }

}
