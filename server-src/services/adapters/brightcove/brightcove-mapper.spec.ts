import { mapBrightcovePlaylist } from "./brightcove-mapper";
import * as brightcovePlaylist from "./__fixture__/brightcove-playlist.json";
import * as brightcoveVideos from "./__fixture__/brightcove-videos.json";

describe("Brightcove mapper", () => {
  it("should map to brightcove videos", async () => {
    const list = mapBrightcovePlaylist(brightcovePlaylist);

    expect(list).toEqual(brightcoveVideos);
  });
});
