import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CallsService } from '../calls.service';
import { ICallDTO } from '../../models/call';
import { QueryService } from '../query.service';

@Component({
  selector: 'calls',
  templateUrl: './calls.component.html',
  styleUrls: ['./calls.component.css'],
})
export class CallsComponent implements OnInit {
  title = 'List of Calls';
  calls: ICallDTO[];
  originalQuery: { type: string; location: string } = {
    type: '',
    location: '',
  };

  constructor(
    private http: HttpClient,
    private CallsService: CallsService,
    private queryService: QueryService
  ) {
    this.calls = [];
  }

  ngOnInit() {
    this.CallsService.getCalls().subscribe((data: ICallDTO[]) => {
      this.calls = data;
    });
  }

  updateQueryWithLocation(location: string) {
    this.originalQuery.location = location;
    this.queryService.sendQuery(this.originalQuery);
  }

  updateQueryWithType(type: string) {
    this.originalQuery.type = type;
    this.queryService.sendQuery(this.originalQuery);
  }
}
