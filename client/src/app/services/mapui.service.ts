import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapuiService {

  private showMap: boolean = true;
  private subject = new Subject<any>();

  constructor() { }

  toggleMap(): void {
    this.showMap = !this.showMap
    this.subject.next(this.showMap)
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }

}
