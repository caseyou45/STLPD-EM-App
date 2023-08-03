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
    if (query.type && query.sort.includes('type')) {
      query.sort = 'datetime';
    }
    if (query.location && query.sort.includes('location')) {
      query.sort = 'datetime';
    }
    if (query.neighborhood && query.sort.includes('neighborhood')) {
      query.sort = 'datetime';
    }
    this.query.next({ ...query });
  }
}
