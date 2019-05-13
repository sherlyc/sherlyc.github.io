import { AnalyticsEventsType } from './AnalyticsEventsType';

export interface IAnalyticsService {
  setup(): void;
  pushEvent(event: AnalyticsEventsType): void;
}
