export class CookieServiceMock {
  set: jest.Mock = jest.fn();
  get: jest.Mock = jest.fn();
  getAll: jest.Mock = jest.fn();
}
