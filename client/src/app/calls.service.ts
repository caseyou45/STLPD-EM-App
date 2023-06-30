import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICallDTO } from '../models/call';

@Injectable({
  providedIn: 'root',
})
export class CallsService {
  constructor(private http: HttpClient) {}

  getCalls(): Observable<ICallDTO[]> {
    // Modify the return type
    return this.http.get<any>('http://localhost:8000');
  }
}
