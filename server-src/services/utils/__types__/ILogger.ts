export interface ILogger {
  info(requestId: string, message: string, ...args: any[]): void;

  debug(requestId: string, message: string, ...args: any[]): void;

  warn(requestId: string, message: string, ...args: any[]): void;

  error(requestId: string, message: string, ...args: any[]): void;
}
