import { IBrightcovePlaylist } from "../__types__/IBrightcovePlaylist";
import { IBrightcoveVideo } from "../../../../common/__types__/IBrightcoveVideo";
import { mapBrightcovePlaylist } from "./brightcove-mapper";

describe("Brightcove mapper", () => {
  it.each([
    [
      "https://cf-images.ap-southeast-2.prod.boltdns.net/v1/static/6005208634001/096243ac-82b6-4a28-bbce-21caa1932da8/247799ae-9ace-46c4-aa3b-4becf50d2af9/1024x576/match/image.jpg",
      "https://cf-images.ap-southeast-2.prod.boltdns.net/v1/static/6005208634001/096243ac-82b6-4a28-bbce-21caa1932da8/247799ae-9ace-46c4-aa3b-4becf50d2af9/320x180/match/image.jpg"
    ]
  ])(
    "should replace image src with 320x180",
    (inputImageSrc, expectedImageSrc) => {
      const input: IBrightcovePlaylist = {
        videos: [
          {
            id: "1",
            name: "Video 1",
            description: "Description 1",
            thumbnail: inputImageSrc,
            poster: "",
            updated_at: "123",
            long_description: "Long Description 1"
          }
        ]
      };

      const result = mapBrightcovePlaylist(input);

      const expected: IBrightcoveVideo[] = [
        {
          id: "1",
          name: "Video 1",
          description: "Description 1",
          thumbnail: expectedImageSrc,
          poster: expectedImageSrc
        }
      ];

      expect(result).toEqual(expected);
    }
  );
});
