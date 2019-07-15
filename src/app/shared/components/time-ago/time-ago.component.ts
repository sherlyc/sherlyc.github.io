import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

const HOUR_IN_SECONDS = 3600;
const MINUTE_IN_SECONDS = 60;

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
    const seconds = moment().diff(
      moment((this.timestamp as number) * 1000),
      'seconds'
    );
    if (seconds >= 2 * HOUR_IN_SECONDS || seconds < 0) {
      return '';
    }
    const hours = Math.floor(seconds / HOUR_IN_SECONDS);
    const minutes = Math.floor((seconds % HOUR_IN_SECONDS) / MINUTE_IN_SECONDS);
    const hoursText = hours === 0 ? '' : `${hours} hour `;
    const minutesText = minutes === 0 ? '' : `${minutes} min `;
    return `${hoursText}${minutesText}ago`;
  }
}
