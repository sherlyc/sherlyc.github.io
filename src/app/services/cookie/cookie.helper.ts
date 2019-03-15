import { ICookieOptions } from './__types__/ICookieOptions';

export function buildCookie(
  name: string,
  value: string,
  options: ICookieOptions
): string {
  const expires =
    typeof options.expires === 'boolean' ? new Date() : options.expires;
  return [
    encodeURIComponent(name) + '=',
    options.encode ? options.encode(value) : value,
    options.path ? ';Path=' + options.path : '',
    options.domain ? ';domain=' + options.domain : '',
    expires ? ';expires=' + expires.toUTCString() : '',
    options.secure ? ';secure' : '',
    options.httpOnly ? '; HttpOnly' : ''
  ].join('');
}

export function parseCookie(cookie: string): { [key: string]: string } {
  return cookie
    .split('; ')
    .filter((rawCookie) => rawCookie.indexOf('=') > 0)
    .map((rawCookie) => {
      const cookieData = rawCookie.split('=');
      const cookieName = decodeURIComponent(cookieData.shift() || '');
      const cookieValue = decodeURIComponent(cookieData.join('='));
      return { name: cookieName, value: cookieValue };
    })
    .reduce((final, item) => ({ ...final, [item.name]: item.value }), {});
}
