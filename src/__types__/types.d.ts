declare module "pulltorefreshjs" {
  export interface PullToRefreshPointer {
    destroy: Function;
  }
  export function init(options: {}): PullToRefreshPointer;
}
