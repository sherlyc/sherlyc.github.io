import { parseCookie } from './recommendations.service';

describe('Recommendations Service', () => {
  describe('parseCookie', () => {
    it.each`
      keys                   | maxCount | input                                                   | output
      ${['enth', 'rt', 'x']} | ${2}     | ${'geo=akl;geo=aklr;rt=nanz;enth=amuh;rt=nbnsu;rt=tsv'} | ${'rt=nanz;enth=amuh;rt=nbnsu'}
    `('works with $output', ({ keys, maxCount, input, output }) => {
      expect(parseCookie(keys, maxCount)(input)).toBe(output);
    });
  });
});
