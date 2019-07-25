// Cache  keeps data per express server request. Iparams used as cache object
import { IParams } from '../__types__/IParams';
import { Strap } from '../strap';
import { IRawArticle } from '../adapters/__types__/IRawArticle';

export const saveStrapArticlesToCache = (
  params: IParams,
  strap: Strap,
  strapLoadedPromise: Promise<IRawArticle[]>
) => {
  if (!params.strapArticlesCache) {
    params.strapArticlesCache = {};
  }
  params.strapArticlesCache![strap] = strapLoadedPromise;
};

export const getStrapArticlesFromCache = (
  params: IParams,
  strap: Strap
): Promise<IRawArticle[]> | undefined => {
  const { strapArticlesCache } = params;

  return strapArticlesCache && strapArticlesCache[strap]
    ? strapArticlesCache[strap]
    : undefined;
};
