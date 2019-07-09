import { TimeAgoPipe } from './time-ago.pipe';
import formatters from './formatters';
import * as moment from 'moment';

const _Date = Date;

function fakeDate(defaultDate: string | number) {
  // @ts-ignore
  global.Date = (arg: any) =>
    new _Date(typeof arg !== 'undefined' ? arg : defaultDate);
  global.Date.UTC = _Date.UTC;
}

describe('TimeAgoPipe', () => {
  const pipe = new TimeAgoPipe();

  beforeAll(() => {
    fakeDate('2019-07-01');
  });

  afterAll(() => {
    global.Date = _Date;
  });

  it('should transform the date with a default formatter', () => {
    let date = moment().subtract(1, 'd');
    expect(pipe.transform(date)).toBe('');

    // 1 minute later
    date = moment().add(1, 'm');
    expect(pipe.transform(date)).toBe('');

    // 2 hours ago
    date = moment().subtract(2, 'h');
    expect(pipe.transform(date)).toBe('');

    // 1 hour 20 minutes ago
    date = moment()
      .subtract(1, 'h')
      .subtract(20, 'm');
    expect(pipe.transform(date)).toBe('1 hour 20 min ago');

    // 20 minutes ago
    date = moment().subtract(20, 'm');
    expect(pipe.transform(date)).toBe('20 min ago');

    // 19 minutes ago
    date = moment().subtract(19, 'm');
    expect(pipe.transform(date)).toBe('19 min ago');
  });

  it('should transform the date when a formatter is provided', () => {
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
