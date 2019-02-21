import { Configuration, ContextReplacementPlugin } from 'webpack';
export = {
  plugins: [new ContextReplacementPlugin(/moment[/\\]locale$/, /locale/)]
} as Partial<Configuration>;
