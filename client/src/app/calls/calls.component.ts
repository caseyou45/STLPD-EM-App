import {
  Component,
  OnChanges,
  OnInit,
  AfterViewInit,
  NgZone,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CallsService } from '../calls.service';
import { ICallDTO } from '../../models/call';
import { QueryService } from '../query.service';
import { Query } from 'src/models/query';
import { Input } from '@angular/core';
import { CallCountService } from '../callsCount.service';

@Component({
  selector: 'calls',
  templateUrl: './calls.component.html',
  styleUrls: ['./calls.component.css'],
})
export class CallsComponent implements OnInit, OnChanges {
  @Input() query: Query = {
    location: '',
    type: '',
    sort: 'datetime',
    direction: 'dsc',
    dateStart: '',
    dateEnd: '',
    neighborhood: '',
  };
  title = 'List of Calls';
  calls: ICallDTO[] = [];

  constructor(
    private queryService: QueryService,
    private callsService: CallsService,
    private callCountService: CallCountService
  ) {}

  setDateRange(days: number, months: number = 0) {
    const currentDate = new Date();
    this.query.dateEnd = currentDate.toISOString().slice(0, 10);

    const pastDate = new Date(currentDate);
    pastDate.setDate(currentDate.getDate() - days);
    pastDate.setMonth(currentDate.getMonth() - months);

    this.query.dateStart = pastDate.toISOString().slice(0, 10);
  }

  ngOnInit(): void {
    this.queryService.query$.subscribe((query) => {
      this.query = query;
      this.fetchCalls();
    });
    this.setDateRange(1);
    this.fetchCalls();
  }

  ngOnChanges(): void {
    this.fetchCalls();
  }

  fetchCalls(): void {
    this.callsService.getCalls(this.query).subscribe((data: ICallDTO[]) => {
      this.calls = data;

      this.callCountService.updateCallCount(data.length);
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
  updateQueryWithNeighborhood(neighborhood: string): void {
    this.query.neighborhood = neighborhood;
    this.queryService.updateQuery(this.query);
  }
}
