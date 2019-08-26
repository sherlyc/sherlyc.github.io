import externalContentHandler from './external-content';
import { IParams } from '../../__types__/IParams';
import { HandlerInputType } from '../__types__/HandlerInputType';
import { IExternalContentUnit } from '../../../../common/__types__/IExternalContentUnit';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { IContentBlock } from '../../../../common/__types__/IContentBlock';

describe('ExternalContentHandler', () => {
  const params: IParams = { apiRequestId: 'request-id-for-testing' };

  it('should return ExternalContentUnit', async () => {
    const handlerRunnerMock = jest.fn();
    const externalContent = (await externalContentHandler(
      handlerRunnerMock,
      {
        type: HandlerInputType.ExternalContent,
        width: '100%',
        height: '300px',
        url: 'https://example.com',
        marginBottom: '10px'
      },
      params
    )) as IExternalContentUnit[];

    const expectedResult: IContentBlock[] = [
      {
        type: ContentBlockType.ExternalContentUnit,
        width: '100%',
        height: '300px',
        url: 'https://example.com',
        marginBottom: '10px'
      } as IExternalContentUnit
    ];

    expect(externalContent).toEqual(expectedResult);
  });

  it('should handle scrolling', async () => {
    const handlerRunnerMock = jest.fn();
    const externalContent = (await externalContentHandler(
      handlerRunnerMock,
      {
        type: HandlerInputType.ExternalContent,
        width: '100%',
        height: '300px',
        marginBottom: '10px',
        scrollable: true,
        url: 'https://example.com'
      },
      params
    )) as IExternalContentUnit[];

    const expectedResult: IContentBlock[] = [
      {
        type: ContentBlockType.ExternalContentUnit,
        width: '100%',
        height: '300px',
        marginBottom: '10px',
        scrollable: true,
        url: 'https://example.com'
      } as IExternalContentUnit
    ];

    expect(externalContent).toEqual(expectedResult);
  });
});
