import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-time-ago',
  templateUrl: './time-ago.component.html',
  styleUrls: ['./time-ago.component.scss']
})
export class TimeAgoComponent implements OnInit {
  constructor() {}

  @Input()
  separator: 'left' | 'right' = 'right';

  @Input()
  timestamp!: moment.MomentInput;

  timeAgo!: string;

  ngOnInit() {
    this.timeAgo = this.format();
  }

  format() {
    const seconds = moment().diff(moment(this.timestamp), 'seconds');
    if (seconds >= 7200 || seconds < 0) {
      return '';
    }
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const hoursText = hours === 0 ? '' : `${hours} hour `;
    const minutesText = minutes === 0 ? '' : `${minutes} min `;
    return `${hoursText}${minutesText}ago`;
  }
}
