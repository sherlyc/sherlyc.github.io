export type ShieldedSite = new (options: { openElementId: string }) => {
  init: Function;
};
