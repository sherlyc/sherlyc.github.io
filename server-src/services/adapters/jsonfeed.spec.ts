import { getArticleList, getListAsset } from './jsonfeed';
import * as rawArticleList from './__fixtures__/jsonfeed/raw-article-list.json';
import * as rawMidStrip from './__fixtures__/raw-mid-strip.json';
import * as rawMiniMidStrip from './__fixtures__/raw-mini-mid-strip.json';
import * as rawEditorsPickData from './__fixtures__/editors-pick/raw-editors-pick.json';
import * as rawDailyFixData from './__fixtures__/daily-fix/raw-daily-fix.json';
import http from '../utils/http';
import * as jsonfeed from './__fixtures__/jsonfeed/jsonfeed.json';
import * as midStripData from './__fixtures__/mid-strip.json';
import * as miniMidStripData from './__fixtures__/mini-mid-strip.json';
import * as editorsPickData from './__fixtures__/editors-pick/editors-pick.json';
import * as dailyFixData from './__fixtures__/daily-fix/daily-fix.json';
import { Section } from '../section';
import { IParams } from '../__types__/IParams';
import { ListAsset } from '../listAsset';

jest.mock('../utils/http');

describe('json feed service', () => {
  beforeAll(() => {
    (http as jest.Mock).mockReturnValue({
      get: jest.fn(),
      post: jest.fn()
    });
  });
  const params: IParams = { apiRequestId: 'request-id-for-testing' };

  describe('raw article list service', () => {
    it('should provide a raw article list', async () => {
      (http(params).get as jest.Mock).mockResolvedValue({ data: jsonfeed });

      expect(await getArticleList(Section.Latest, 2, params)).toEqual(
        rawArticleList
      );
    });
  });

  describe('mid strip service', () => {
    it('should provide mid strip data', async () => {
      (http(params).get as jest.Mock).mockResolvedValue({ data: midStripData });

      expect(await getListAsset(params, ListAsset.MidStrip, 2)).toEqual(
        rawMidStrip
      );
    });
  });

  describe('mini mid strip service', () => {
    it('should provide mini mid strip data', async () => {
      (http(params).get as jest.Mock).mockResolvedValue({
        data: miniMidStripData.threeListAssets
      });

      expect(await getListAsset(params, ListAsset.MiniMidStrip, 2)).toEqual(
        rawMiniMidStrip
      );
    });
  });

  describe('editors pick service', () => {
    it('should provide editors pick service data', async () => {
      (http(params).get as jest.Mock).mockResolvedValue({
        data: editorsPickData
      });

      expect(await getListAsset(params, ListAsset.EditorPicks)).toEqual(
        rawEditorsPickData
      );
    });
  });

  describe('daily fix service', () => {
    it('should provide daily fix service data', async () => {
      (http(params).get as jest.Mock).mockResolvedValue({
        data: dailyFixData
      });

      expect(await getListAsset(params, ListAsset.DailyFix)).toEqual(
        rawDailyFixData
      );
    });
  });
});
