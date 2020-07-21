import cacheHttp from "../../utils/cache-http";
import retry from "../../utils/retry";
import { IParams } from "../../__types__/IParams";
import { IBrightcovePlaylist } from "../__types__/IBrightcovePlaylist";

const baseUrl = "https://edge.api.brightcove.com/playback/v1";

async function requestBrightcovePlaylist(
  account: string,
  playlist: string,
  policyKey: string,
  total: number,
  params: IParams
): Promise<IBrightcovePlaylist> {
  const lastOctet = Math.floor(Math.random() * 10) + 1;
  // NZ NAT IP range from https://stuffnz.atlassian.net/wiki/spaces/KIWIOPS/pages/73334883/Outbound+Addresses
  const nzIp = `119.15.65.${lastOctet}`;
  const result = await cacheHttp<IBrightcovePlaylist>(
    params,
    `${baseUrl}/accounts/${account}/playlists/${playlist}?limit=${total}`,
    {
      headers: {
        Authorization: `BCOV-Policy ${policyKey}`,
        "X-Forwarded-For": nzIp
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
