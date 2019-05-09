export interface IAnalyticsEvent {
  type: string;
  event: string;
  [key: string]: string;
}
