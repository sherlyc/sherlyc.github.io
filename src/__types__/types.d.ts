declare module "pulltorefreshjs" {
  export interface PullToRefreshPointer {
    destroy: Function;
  }

  export interface PullToRefreshOptions {
    mainElement: HTMLElement | string;
  }

  export function init(options: PullToRefreshOptions): PullToRefreshPointer;
}
