export interface IBannerResponse {
  startDateTimeUTC: string;
  endDateTimeUTC: string;
  banner: {
    url: string;
    height?: string;
  };
}
