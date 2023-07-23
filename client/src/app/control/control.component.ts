import { AfterContentInit, Component, OnInit } from '@angular/core';
import { QueryService } from '../query.service';
import { Query } from 'src/models/query';
import { CallsService } from '../calls.service';
import { ICallDTO } from 'src/models/call';
import { CallCountService } from '../callsCount.service';

@Component({
  selector: 'control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css'],
})
export class ControlComponent implements OnInit {
  query: Query = {
    location: '',
    type: '',
    sort: '',
    direction: '',
    dateStart: '',
    dateEnd: '',
    neighborhood: '',
  };
  selectedDateOption: string = 'pastDay';
  callCount: number = 0;

  constructor(
    private queryService: QueryService,
    private callsService: CallsService,
    private callCountService: CallCountService
  ) {}

  ngOnInit() {
    this.queryService.query$.subscribe((query) => {
      this.query = query;
    });

    this.callCountService.callCount$.subscribe((callCount) => {
      this.callCount = callCount;
    });

    this.initializeDates();
    this.initializeSort();
    this.updateQuery();
  }

  initializeDates() {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    this.query.dateStart = yesterday.toISOString().slice(0, 10);
    this.query.dateEnd = today.toISOString().slice(0, 10);
  }

  initializeSort() {
    this.query.sort = 'datetime';
    this.query.direction = 'dsc';
  }

  resetQuery() {
    this.initializeDates();
    this.initializeSort();
    this.clearType();
    this.clearLocation();
    this.updateQuery();
  }

  clearType() {
    this.query.type = '';
    this.updateQuery();
  }

  clearLocation() {
    this.query.location = '';
    this.updateQuery();
  }

  clearNeighborhood() {
    this.query.neighborhood = '';
    this.updateQuery();
  }

  setDates() {
    this.updateQuery();
  }

  setSort() {
    this.updateQuery();
  }

  toggleSortDirection() {
    this.query.direction = this.query.direction === 'asc' ? 'desc' : 'asc';
    this.updateQuery();
  }

  getArrowIcon(): string {
    return this.query.direction === 'asc' ? '↑' : '↓';
  }

  setDateRange(days: number, months: number = 0) {
    const currentDate = new Date();
    this.query.dateEnd = currentDate.toISOString().slice(0, 10);

    const pastDate = new Date(currentDate);
    pastDate.setDate(currentDate.getDate() - days);
    pastDate.setMonth(currentDate.getMonth() - months);

    this.query.dateStart = pastDate.toISOString().slice(0, 10);
    this.updateQuery();
  }

  setPastDay() {
    this.setDateRange(1);
    this.selectedDateOption = 'pastDay';
    this.updateQuery();
  }

  setPastWeek() {
    this.setDateRange(7);
    this.selectedDateOption = 'pastWeek';
    this.updateQuery();
  }

  setPastMonth() {
    this.setDateRange(0, 1);
    this.selectedDateOption = 'pastMonth';
    this.updateQuery();
  }

  updateQuery() {
    this.queryService.updateQuery(this.query);
  }
}
