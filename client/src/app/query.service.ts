import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Query } from 'src/models/query';

@Injectable({
  providedIn: 'root',
})
export class QueryService {
  private query = new Subject<Query>();

  query$ = this.query.asObservable();

  updateQuery(query: Query) {
    this.query.next({ ...query });
  }
}
