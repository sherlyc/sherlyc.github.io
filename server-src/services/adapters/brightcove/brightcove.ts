import { IParams } from "../../__types__/IParams";
import { mapBrightcovePlaylist } from "./brightcove-mapper";
import { retrieveBrightcovePlaylist } from "./brightcove-retriever";

export const getBrightcovePlaylist = async (
  account: string,
  playlist: string,
  policyKey: string,
  total: number,
  params: IParams
) => {
  const data = await retrieveBrightcovePlaylist(
    account,
    playlist,
    policyKey,
    total,
    params
  );
  return mapBrightcovePlaylist(data);
};
