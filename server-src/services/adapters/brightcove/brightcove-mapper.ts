import { IBrightcoveVideo } from "../../../../common/__types__/IBrightcoveVideo";
import { IBrightcovePlaylist } from "../__types__/IBrightcovePlaylist";

export const mapBrightcovePlaylist = (
  playlist: IBrightcovePlaylist
): IBrightcoveVideo[] => {
  return playlist.videos.map((video) => {
    const thumbnail = video.thumbnail.replace(/\/[0-9]+x[0-9]+\//, "/320x180/");

    return {
      id: video.id,
      name: video.name,
      thumbnail: thumbnail,
      description: video.description,
      updatedAt: video.updated_at
    };
  });
};
