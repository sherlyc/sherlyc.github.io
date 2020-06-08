import { IParams } from "../../__types__/IParams";
import { retrieveBrightcovePlaylist } from "./brightcove-retriever";
import { mapBrightcovePlaylist } from "./brightcove-mapper";

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
