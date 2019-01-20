export class HttpError extends Error {
  public statusCode?: string;

  constructor(message: string, statusCode?: string) {
    super(message);
    Error.captureStackTrace(this, HttpError);
    this.statusCode = statusCode;
  }
}
