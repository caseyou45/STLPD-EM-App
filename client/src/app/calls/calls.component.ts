import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CallsService } from '../calls.service';
import { ICallDTO } from '../../models/call';

@Component({
  selector: 'calls',
  templateUrl: './calls.component.html',
  styleUrls: ['./calls.component.css'],
})
export class CallsComponent implements OnInit {
  title = 'List of Calls';
  calls: ICallDTO[];
  originalQuery: { type: ''; location: '' };

  constructor(private http: HttpClient, private service: CallsService) {
    this.calls = [];
    this.originalQuery = { type: '', location: '' };
  }

  ngOnInit() {
    this.service.getCalls().subscribe((data: ICallDTO[]) => {
      this.calls = data;
    });
  }
}
