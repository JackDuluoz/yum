import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FilterService } from 'src/app/services/filter.service';
import { MapuiService } from 'src/app/services/mapui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showFilter: boolean = false;
  showMap: boolean = true;
  subscription: Subscription;
  // name: string = '';

  constructor(private filterService: FilterService, private mapuiService: MapuiService, public router: Router) {
    this.subscription = this.mapuiService
      .onToggle()
      .subscribe((value) => (this.showMap = value)
    )
  }

  ngOnInit() {

  }

  getName() {
    return sessionStorage.getItem('name');
  }

  onLogout() {
    sessionStorage.clear();
  }

  toggleMap() {
    this.mapuiService.toggleMap()
  }

  toggleFilter() {
    this.filterService.toggleFilter()
  }

}
