import { IBrightcoveVideo } from "../../../../common/__types__/IBrightcoveVideo";
import { IBrightcovePlaylist } from "../__types__/IBrightcovePlaylist";

export const mapBrightcovePlaylist = (
  playlist: IBrightcovePlaylist
): IBrightcoveVideo[] => {
  return playlist.videos.map((video) => {
    return {
      id: video.id,
      name: video.name,
      description: video.description,
      thumbnail: video.thumbnail,
      poster: video.poster
    };
  });
};