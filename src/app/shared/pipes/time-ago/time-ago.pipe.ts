import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import formatters from './formatters';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: moment.MomentInput, formatter: string = 'default'): string {
    const seconds = Math.round(moment().diff(moment(value), 'seconds'));
    const format = formatters[formatter];
    return format(seconds);
  }
}
