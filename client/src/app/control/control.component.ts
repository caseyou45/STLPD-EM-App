import { Component } from '@angular/core';

@Component({
  selector: 'control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css'],
})
export class ControlComponent {
  dateStart: string;
  dateEnd: string;

  constructor() {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    this.dateStart = yesterday.toISOString().slice(0, 10);
    this.dateEnd = today.toISOString().slice(0, 10);
  }

  setDates() {
    console.log('Start Date:', this.dateStart);
    console.log('End Date:', this.dateEnd);
  }
}
