import { CookieSerializeOptions } from 'cookie';

export interface ICookieService {
  get(name: string): string;

  set(name: string, value: string, options: CookieSerializeOptions): void;

  getAll(): { [key: string]: string };
}
