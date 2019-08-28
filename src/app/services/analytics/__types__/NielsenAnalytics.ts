interface INielsenConfig {
  cid: string;
  content: string;
  server: string;
}

export type NielsenAnalytics = (
  config: INielsenConfig
) => {
  record: () => {
    post: () => void;
  };
};
