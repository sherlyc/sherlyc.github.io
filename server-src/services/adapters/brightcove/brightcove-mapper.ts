import { IBrightcoveVideo } from "../../../../common/__types__/IBrightcoveVideo";
import { IBrightcovePlaylist } from "../__types__/IBrightcovePlaylist";

export const mapBrightcovePlaylist = (
  playlist: IBrightcovePlaylist
): IBrightcoveVideo[] => {
  return playlist.videos.map((video) => {
    const thumbnail = video.thumbnail.split("160x90").join("480x270");

    return {
      id: video.id,
      name: video.name,
      thumbnail: thumbnail,
      description: video.description,
      updatedAt: video.updated_at
    };
  });
};
