import { IParams } from "../../__types__/IParams";
import retry from "../../utils/retry";
import http from "../../utils/http";
import { IBrightcovePlaylist } from "../__types__/IBrightcovePlaylist";

const baseUrl = "https://edge.api.brightcove.com/playback/v1";

async function requestBrightcovePlaylist(
  account: string,
  playlist: string,
  policyKey: string,
  total: number,
  params: IParams
): Promise<IBrightcovePlaylist> {
  const result = await http(params).get<IBrightcovePlaylist>(
    `${baseUrl}/accounts/${account}/playlists/${playlist}?limit=${total}`,
    {
      headers: {
        Authorization: `BCOV-Policy ${policyKey}`
      }
    }
  );
  return result.data;
}

export const retrieveBrightcovePlaylist = (
  account: string,
  playlist: string,
  policyKey: string,
  total: number,
  params: IParams
) =>
  retry(
    () =>
      requestBrightcovePlaylist(account, playlist, policyKey, total, params),
    params
  );