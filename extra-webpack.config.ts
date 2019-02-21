import { Configuration, ContextReplacementPlugin } from 'webpack';
export = {
  plugins: [new ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/)]
} as Partial<Configuration>;
