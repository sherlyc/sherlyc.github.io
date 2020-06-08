export interface IBrightcovePlaylist {
  [key: string]: any;
  videos: Array<{
    [key: string]: any;
    id: string;
    name: string;
    description: string;
    thumbnail: string;
    poster: string;
  }>;
}
