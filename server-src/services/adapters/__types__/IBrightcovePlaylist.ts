export interface IBrightcovePlaylist {
  [key: string]: any;
  videos: Array<{
    id: string;
    name: string;
    description: string;
    thumbnail: string;
    updated_at: string;
    long_description: string;
  }>;
}
