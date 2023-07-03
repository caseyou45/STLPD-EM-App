import { Component, OnChanges, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CallsService } from '../calls.service';
import { ICallDTO } from '../../models/call';
import { QueryService } from '../query.service';
import { Query } from 'src/models/query';
import { Input } from '@angular/core';

@Component({
  selector: 'calls',
  templateUrl: './calls.component.html',
  styleUrls: ['./calls.component.css'],
})
export class CallsComponent implements OnInit, OnChanges {
  @Input() query: Query = {
    location: '',
    type: '',
    sort: '',
    direction: '',
    dateStart: '',
    dateEnd: '',
  };
  title = 'List of Calls';
  calls: ICallDTO[] = [];

  constructor(
    private http: HttpClient,
    private queryService: QueryService,
    private callsService: CallsService
  ) {}

  ngOnInit(): void {
    this.queryService.query$.subscribe((query) => {
      this.query = query;
      this.fetchCalls();
    });
    this.fetchCalls();
  }

  ngOnChanges(): void {
    this.fetchCalls();
  }

  fetchCalls(): void {
    this.callsService.getCalls(this.query).subscribe((data: ICallDTO[]) => {
      this.calls = data;
    });
  }

  updateQueryWithLocation(location: string): void {
    this.query.location = location;
    this.queryService.updateQuery(this.query);
  }

  updateQueryWithType(type: string): void {
    this.query.type = type;
    this.queryService.updateQuery(this.query);
  }
}
