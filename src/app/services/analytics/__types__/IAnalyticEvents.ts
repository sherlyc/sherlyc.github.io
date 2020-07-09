import { AnalyticsEventsType } from "./AnalyticsEventsType";

export type AnalyticsEvent =
  | ISimpleAnalyticEvent
  | IWeatherLocationChanged
  | IFooterMenuClicked
  | IMenuNavSectionClicked
  | IMoreButtonClicked
  | IHomepageStrapClicked
  | IExperimentAssigned
  | IModuleTitleClicked;

export interface ISimpleAnalyticEvent {
  type:
    | AnalyticsEventsType.PWA_DOWNLOADED
    | AnalyticsEventsType.MENU_NAV_OPENED
    | AnalyticsEventsType.STUFF_LOGO_CLICKED
    | AnalyticsEventsType.BREAKING_NEWS_CLOSED
    | AnalyticsEventsType.BREAKING_NEWS_OPENED
    | AnalyticsEventsType.LOGIN_CLIKED
    | AnalyticsEventsType.AVATAR_CLICKED
    | AnalyticsEventsType.MODULE_TITLE_CLICKED
    | AnalyticsEventsType.HOMEPAGE_STRAP_TAG_CLICKED;
}

export interface IWeatherLocationChanged {
  type: AnalyticsEventsType.WEATHER_LOCATION_CHANGED;
  location: string;
}

export interface IFooterMenuClicked {
  type: AnalyticsEventsType.FOOTER_MENU_CLICKED;
  name: string;
}

export interface IMoreButtonClicked {
  type: AnalyticsEventsType.MORE_BUTTON_CLICKED;
  url: string;
}

export interface IModuleTitleClicked {
  type: AnalyticsEventsType.MODULE_TITLE_CLICKED;
  title: string;
}

export interface IMenuNavSectionClicked {
  type: AnalyticsEventsType.MENU_NAV_SECTION_CLICKED;
  section: string;
}

export interface IHomepageStrapClicked {
  type: AnalyticsEventsType.HOMEPAGE_STRAP_CLICKED;
  strapName: string;
  articleHeadline: string;
  articleId: string;
}

export interface IExperimentAssigned {
  type: AnalyticsEventsType.EXPERIMENT;
  variant: string;
  experiment: string;
}
