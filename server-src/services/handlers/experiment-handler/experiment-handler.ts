import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { IExperimentHandlerInput } from "../__types__/IExperimentHandlerInput";
import { handlerRunnerFunction } from "../runner";
import { IParams } from "../../__types__/IParams";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IExperimentContainer } from "../../../../common/__types__/IExperimentContainer";

export default async function(
  handlerRunner: handlerRunnerFunction,
  { name, variants }: IExperimentHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const variantNames = Object.keys(variants);
  const contentBlockPromises: Promise<{
    [key: string]: IContentBlock[];
  }>[] = variantNames.map(async (variantName) => {
    const contentBlocksForVariant = await handlerRunner(
      variants[variantName],
      params
    );
    return {
      [variantName]: contentBlocksForVariant
    };
  });

  const variantBlocks = (await Promise.all(contentBlockPromises)).reduce(
    (final, item) => ({ ...final, ...item }),
    {}
  );

  return [
    {
      type: ContentBlockType.ExperimentContainer,
      name,
      variants: variantBlocks
    } as IExperimentContainer
  ];
}
