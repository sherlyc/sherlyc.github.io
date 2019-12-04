import { AnalyticsEvent } from "./IAnalyticEvents";

export interface IAnalyticsService {
  setup(): void;
  pushEvent(event: AnalyticsEvent): void;
}
