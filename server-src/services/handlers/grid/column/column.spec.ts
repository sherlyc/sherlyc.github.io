import { IParams } from "../../../__types__/IParams";
import { HandlerInput } from "../../__types__/HandlerInput";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { IColumnHandlerInput } from "../../__types__/IColumnHandlerInput";
import column from "./column";

describe("Column Handler", () => {
  const handlerRunnerMock = jest.fn();
  const params: IParams = { apiRequestId: "123" };

  it("should call column grid with content returned from handlers", async () => {
    const fakeHandlerInput = {} as HandlerInput;
    const handlerOneResult = [1, 2, 3];
    const handlerTwoResult = [4, 5, 6];
    handlerRunnerMock.mockResolvedValueOnce(handlerOneResult);
    handlerRunnerMock.mockResolvedValueOnce(handlerTwoResult);

    const input: IColumnHandlerInput = {
      type: HandlerInputType.Column,
      content: [fakeHandlerInput, fakeHandlerInput],
      columnGap: 10,
      rowGap: 10,
      border: false
    };

    await column(handlerRunnerMock, input, params);

    expect(handlerRunnerMock).toHaveBeenCalledWith(
      {
        type: HandlerInputType.ColumnGrid,
        content: [handlerOneResult, handlerTwoResult],
        columnGap: input.columnGap,
        rowGap: input.rowGap,
        border: input.border
      },
      params
    );
  });
});
