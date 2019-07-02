import * as minimatch from 'minimatch';
import { RequestHandler } from 'express';

export function cacheControl(cacheConfig: { [key: string]: string }) {
  return function(req, res, next) {
    const matchingKey: string =
      Object.keys(cacheConfig).find((key) => minimatch(req.path, key)) ||
      'default';
    const cache = cacheConfig[matchingKey];
    if (cache) {
      res.set('Cache-Control', cache);
    }
    next();
  } as RequestHandler;
}
