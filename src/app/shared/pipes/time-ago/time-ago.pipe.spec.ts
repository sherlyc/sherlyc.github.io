import { TimeAgoPipe } from './time-ago.pipe';
import formatters from './formatters';
import * as moment from 'moment';

function fakeDate(defaultDate: string | number) {
  const _Date = Date;
  // @ts-ignore
  global.Date = (arg: any) =>
    new _Date(typeof arg !== 'undefined' ? arg : defaultDate);
  global.Date.UTC = _Date.UTC;
}

describe('TimeAgoPipe', () => {
  const pipe = new TimeAgoPipe();

  it('should transform the date with a default formatter', () => {
    let date = moment().subtract(1, 'd');
    expect(pipe.transform(date)).toBe('');

    date = moment().subtract(2, 'h');
    expect(pipe.transform(date)).toBe('');

    date = moment()
      .subtract(1, 'h')
      .subtract(20, 'm');
    expect(pipe.transform(date)).toBe('1 hour 20 min ago');

    date = moment()
      .subtract(1, 'h')
      .subtract(20, 'm');
    expect(pipe.transform(date)).toBe('1 hour 20 min ago');

    date = moment().subtract(20, 'm');
    expect(pipe.transform(date)).toBe('20 min ago');

    date = moment().subtract(19, 'm');
    expect(pipe.transform(date)).toBe('19 min ago');
  });

  it('should transform the date when a formatter is provided', () => {
    fakeDate('2016-05-01');

    formatters['fake'] = (seconds: number) => {
      if (seconds >= 2 * 60 * 60) {
        return '';
      }
      return `${seconds} sec ago`;
    };

    let date = moment().subtract(1, 'd');
    expect(pipe.transform(date, 'fake')).toBe('');

    date = moment()
      .subtract(2, 'h')
      .subtract('30', 'm');
    expect(pipe.transform(date, 'fake')).toBe('');
  });
});
