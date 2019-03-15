import { buildCookie, parseCookie } from './cookie.helper';

describe('Cookie Helper', () => {
  it('should build a cookie string', () => {
    const cookie = buildCookie('cookie-name', 'cookie-value', {
      domain: 'www.stuff.co.nz',
      secure: true
    });

    expect(cookie).toEqual(
      'cookie-name=cookie-value;domain=www.stuff.co.nz;secure'
    );
  });

  it('should parse a cookie object', () => {
    const cookie = parseCookie(
      'cookie-name=cookie-value;domain=www.stuff.co.nz;secure'
    );

    expect(cookie).toEqual({
      'cookie-name': 'cookie-value;domain=www.stuff.co.nz;secure'
    });
  });
});
