import { Component } from '@angular/core';
import { QueryService } from '../query.service';

@Component({
  selector: 'control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css'],
})
export class ControlComponent {
  dateStart: string;
  dateEnd: string;
  selectedSortCategory: string = 'datetime';
  sortDirection: string = 'asc';
  originalQuery: { type: string; location: string } = {
    type: '',
    location: '',
  };

  constructor(private queryService: QueryService) {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    this.dateStart = yesterday.toISOString().slice(0, 10);
    this.dateEnd = today.toISOString().slice(0, 10);
  }

  ngOnInit() {
    this.queryService.query$.subscribe((query) => {
      this.originalQuery = query;
      this.updateFilterButtonValues();
    });
  }

  updateFilterButtonValues() {
    const typeButton = document.getElementById(
      'typeMainButton'
    ) as HTMLButtonElement;
    const locationButton = document.getElementById(
      'locationMainButton'
    ) as HTMLButtonElement;

    if (this.originalQuery.type != ' ') {
      typeButton.innerText = this.originalQuery.type;
      typeButton.style.display = 'flex';
    }

    if (this.originalQuery.location != ' ') {
      locationButton.innerText = this.originalQuery.location;
      locationButton.style.display = 'flex';
    }
  }

  setDates() {
    console.log('Start Date:', this.dateStart);
    console.log('End Date:', this.dateEnd);
  }

  setSort() {
    console.log(this.selectedSortCategory);
  }

  toggleSortDirection() {
    this.sortDirection = this.sortDirection === 'asc' ? 'dsc' : 'asc';
  }

  getArrowIcon(): string {
    return this.sortDirection === 'asc' ? '↑' : '↓';
  }
}
