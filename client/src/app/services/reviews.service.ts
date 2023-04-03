import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  private showReviews: boolean = false;
  private subject = new Subject<any>();

  constructor() {}

  toggleReviews(): void {
    this.showReviews = !this.showReviews;
    this.subject.next(this.showReviews);
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }
}


