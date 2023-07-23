import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Query } from 'src/models/query';

@Injectable({
  providedIn: 'root',
})
export class CallCountService {
  private callCount = new Subject<number>();

  callCount$ = this.callCount.asObservable();

  updateCallCount(count: number) {
    this.callCount.next(count);
  }
}
