import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QueryService {
  private querySource = new Subject<{ type: string; location: string }>();

  query$ = this.querySource.asObservable();

  sendQuery(query: { type: string; location: string }) {
    this.querySource.next(query);
  }
}
