import { ICookieService } from './__types__/ICookieService';
import { AutoMock, AutoMocked } from '../../../../common/__types__/types';

export class CookieServiceMock implements AutoMock<ICookieService> {
  get: AutoMocked<ICookieService['get']> = jest.fn();
  getAll: AutoMocked<ICookieService['getAll']> = jest.fn();
  set: AutoMocked<ICookieService['set']> = jest.fn();
}
