import experimentHandler from './experiment-handler';
import { HandlerInputType } from '../__types__/HandlerInputType';
import { IParams } from '../../__types__/IParams';
import { IExperimentContainer } from '../../../../common/__types__/IExperimentContainer';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { IBreakingNews } from '../../../../common/__types__/IBreakingNews';
import { Section } from '../../../services/section';

describe('Experiment Handler', () => {
  const params: IParams = { apiRequestId: 'request-id-for-testing' };

  it('should return Toucan content block when experiment name is Toucan', async () => {
    const handlerRunnerMock = jest.fn();
    handlerRunnerMock.mockResolvedValue([
      {
        type: ContentBlockType.BreakingNews,
        id: 'fake',
        text: 'fake',
        link: 'fake'
      } as IBreakingNews
    ]);

    const expectedResult: IExperimentContainer = {
      type: ContentBlockType.ExperimentContainer,
      name: 'Toucan',
      variants: {
        purpleBackground: [
          {
            type: ContentBlockType.BreakingNews,
            id: 'fake',
            text: 'fake',
            link: 'fake'
          } as IBreakingNews
        ],
        orangeBackground: [
          {
            type: ContentBlockType.BreakingNews,
            id: 'fake',
            text: 'fake',
            link: 'fake'
          } as IBreakingNews
        ]
      }
    };

    const result = await experimentHandler(
      handlerRunnerMock,
      {
        type: HandlerInputType.Experiment,
        name: 'Toucan',
        variants: {
          purpleBackground: {
            type: HandlerInputType.BreakingNews
          },
          orangeBackground: {
            type: HandlerInputType.BreakingNews
          }
        }
      },
      params
    );

    expect(result).toEqual([expectedResult]);
  });

  it('should return Parrot content block when experiment name is Parrot', async () => {
    const handlerRunnerMock = jest.fn();
    handlerRunnerMock.mockResolvedValue([
      {
        type: ContentBlockType.BasicArticleUnit,
        indexHeadline: 'fake',
        introText: 'fake',
        linkUrl: 'fake',
        imageSrc: 'fake',
        lastPublishedTime: 0,
        headlineFlags: []
      },
      {
        type: ContentBlockType.BasicArticleUnit,
        indexHeadline: 'fake',
        introText: 'fake',
        linkUrl: 'fake',
        imageSrc: 'fake',
        lastPublishedTime: 0,
        headlineFlags: []
      }
    ]);

    const expectedResult: IExperimentContainer = {
      type: ContentBlockType.ExperimentContainer,
      name: 'Parrot',
      variants: {
        redHeadline: [
          {
            type: ContentBlockType.BasicArticleUnit,
            indexHeadline: 'fake',
            introText: 'fake',
            linkUrl: 'fake',
            imageSrc: 'fake',
            lastPublishedTime: 0,
            headlineFlags: []
          },
          {
            type: ContentBlockType.BasicArticleUnit,
            indexHeadline: 'fake',
            introText: 'fake',
            linkUrl: 'fake',
            imageSrc: 'fake',
            lastPublishedTime: 0,
            headlineFlags: []
          }
        ],
        greenHeadline: [
          {
            type: ContentBlockType.BasicArticleUnit,
            indexHeadline: 'fake',
            introText: 'fake',
            linkUrl: 'fake',
            imageSrc: 'fake',
            lastPublishedTime: 0,
            headlineFlags: []
          },
          {
            type: ContentBlockType.BasicArticleUnit,
            indexHeadline: 'fake',
            introText: 'fake',
            linkUrl: 'fake',
            imageSrc: 'fake',
            lastPublishedTime: 0,
            headlineFlags: []
          }
        ]
      }
    };

    const result = await experimentHandler(
      handlerRunnerMock,
      {
        type: HandlerInputType.Experiment,
        name: 'Parrot',
        variants: {
          redHeadline: {
            type: HandlerInputType.ArticleList,
            sourceId: Section.Latest,
            totalBasicArticlesUnit: 2
          },
          greenHeadline: {
            type: HandlerInputType.ArticleList,
            sourceId: Section.Latest,
            totalBasicArticlesUnit: 2
          }
        }
      },
      params
    );

    expect(result).toEqual([expectedResult]);
  });
});
