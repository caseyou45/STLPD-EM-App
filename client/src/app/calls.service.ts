import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICallDTO } from '../models/call';
import { Query } from '../models/query';

@Injectable({
  providedIn: 'root',
})
export class CallsService {
  constructor(private http: HttpClient) {}

  getCalls(query: Query): Observable<ICallDTO[]> {
    let params = new HttpParams();
    if (query.location) {
      params = params.set('location', query.location);
    }

    if (query.neighborhood) {
      params = params.set('neighborhood', query.neighborhood);
    }

    if (query.type) {
      let q = query.type;
      if (q.includes('(')) {
        let pLoc = q.indexOf('(');
        query.type = q.slice(0, pLoc);
      }

      params = params.set('type', query.type);
    }
    if (query.sort) {
      params = params.set('sort', query.sort);
    }
    if (query.direction) {
      params = params.set('direction', query.direction);
    }
    if (query.dateStart) {
      params = params.set('dateStart', query.dateStart);
    }
    if (query.dateEnd) {
      params = params.set('dateEnd', query.dateEnd);
    }

    return this.http.get<ICallDTO[]>('http://localhost:8000/calls', { params });
  }
}
