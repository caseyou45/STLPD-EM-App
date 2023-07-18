import { Component, OnInit } from '@angular/core';
import { QueryService } from '../query.service';
import { Query } from 'src/models/query';
import { LoadingService } from '../loading.service';

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

  constructor(
    private queryService: QueryService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.queryService.query$.subscribe((query) => {
      this.query = query;
    });

    this.initializeDates();
    this.initializeSort();
    this.queryService.updateQuery(this.query);
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
    this.queryService.updateQuery(this.query);
  }

  clearType() {
    this.query.type = '';
    this.queryService.updateQuery(this.query);
  }

  clearLocation() {
    this.query.location = '';
    this.queryService.updateQuery(this.query);
  }

  clearNeighborhood() {
    this.query.neighborhood = '';
    this.queryService.updateQuery(this.query);
  }

  setDates() {
    this.queryService.updateQuery(this.query);
  }

  setSort() {
    this.queryService.updateQuery(this.query);
  }

  toggleSortDirection() {
    this.query.direction = this.query.direction === 'asc' ? 'desc' : 'asc';
    this.queryService.updateQuery(this.query);
  }

  getArrowIcon(): string {
    return this.query.direction === 'asc' ? '↑' : '↓';
  }
}
