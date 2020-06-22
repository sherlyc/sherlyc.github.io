import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { getRawArticles } from "../../adapters/article-retriever/article-retriever";
import { IRawArticle } from "../../adapters/__types__/IRawArticle";
import { Strap } from "../../strap";
import { IParams } from "../../__types__/IParams";
import { HandlerInputType } from "../__types__/HandlerInputType";
import { IOpinionHandlerInput } from "../__types__/IOpinionHandlerInput";
import opinion from "./opinion";

jest.mock("../../adapters/article-retriever/article-retriever");

const fakeRawArticles = (ids: number[]) =>
  ids.map((id) => ({ id: `${id}` } as IRawArticle));

const expectArticle = (id: number) => expect.objectContaining({ id: `${id}` });

describe("Opinion handler", () => {
  const params: IParams = { apiRequestId: "123" };
  const handlerRunnerMock = jest.fn();
  const input: IOpinionHandlerInput = {
    type: HandlerInputType.Opinion,
    strapName: "strapName",
    displayName: "opinion"
  };

  beforeEach(() => {
    jest.resetAllMocks();

    (getRawArticles as jest.Mock).mockResolvedValue(
      fakeRawArticles([1, 2, 3, 4, 5])
    );
  });

  it("should retrieve articles", async () => {
    await opinion(handlerRunnerMock, input, params);

    expect(getRawArticles).toHaveBeenCalledWith(Strap.Opinion, 5, params);
  });

  it("should return opinion content block with article content", async () => {
    const [opinionContentBlock] = await opinion(
      handlerRunnerMock,
      input,
      params
    );

    expect(opinionContentBlock).toEqual({
      type: ContentBlockType.Opinion,
      articles: [
        expectArticle(1),
        expectArticle(2),
        expectArticle(3),
        expectArticle(4),
        expectArticle(5)
      ],
      strapName: input.strapName,
      displayName: input.displayName
    });
  });
});
