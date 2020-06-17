import { IBrightcoveVideo } from "../../../../common/__types__/IBrightcoveVideo";
import { IBrightcovePlaylist } from "../__types__/IBrightcovePlaylist";
import { mapBrightcovePlaylist } from "./brightcove-mapper";

describe("Brightcove mapper", () => {
  it("should map to brightcove videos", async () => {
    const playlist: IBrightcovePlaylist = {
      updated_at: "2020-06-07T05:09:57.705Z",
      type: "EXPLICIT",
      reference_id: null,
      name: "Widget 1 (Web Version)",
      id: "6041675177001",
      description: null,
      created_at: "2019-05-28T00:17:24.969Z",
      account_id: "6005208634001",
      videos: [
        {
          id: "6162045655001",
          name:
            "Influencers blasted for 'treating protests like Coachella' on social media",
          thumbnail:
            "https://cf-images.ap-southeast-2.prod.boltdns.net/v1/static/3910869709001/79bd6eb2-0edc-472f-bdbd-b68e5e4bcbf0/26b9be4c-0806-44d8-95ee-595e8529d54c/160x90/match/image.jpg",
          poster:
            "https://cf-images.ap-southeast-2.prod.boltdns.net/v1/static/3910869709001/79bd6eb2-0edc-472f-bdbd-b68e5e4bcbf0/06afd13a-c263-48d3-ae67-3f06ea9f43a4/1280x720/match/image.jpg",
          description:
            "A series of viral videos showing social media influencers posing for photo ops at Black Lives Matter protests throughout the US has left people fuming."
        },
        {
          id: "6161930802001",
          name: "What If We Nuked a Hurricane?",
          thumbnail:
            "https://cf-images.ap-southeast-2.prod.boltdns.net/v1/static/6005208634001/90abf6cd-b518-4a0c-bb8f-3f33118568be/5cb24612-df53-45d6-ba95-fed8034c6c71/320x180/match/image.jpg",
          poster:
            "https://cf-images.ap-southeast-2.prod.boltdns.net/v1/static/6005208634001/90abf6cd-b518-4a0c-bb8f-3f33118568be/dc7c2877-5b7e-407a-b326-9ab26dcb1b12/1024x576/match/image.jpg",
          description: "Dear Mr President..."
        },
        {
          id: "6162161816001",
          name:
            "Scientists may have spotted the black hole nearest to Earth: study",
          thumbnail:
            "https://cf-images.ap-southeast-2.prod.boltdns.net/v1/static/6005208634001/e2336ebf-679c-467d-99a6-669f33be8fbd/3a64cf49-18dc-4068-a863-65e97c3aa6c4/320x180/match/image.jpg",
          poster:
            "https://cf-images.ap-southeast-2.prod.boltdns.net/v1/static/6005208634001/e2336ebf-679c-467d-99a6-669f33be8fbd/85531f86-616d-4516-a65e-7b129dcfbd2a/1024x576/match/image.jpg",
          description:
            "Scientists may have spotted a black hole so close to Earth that its two companion stars are visible to the naked eye, according to a paper in Astronomy and Physics."
        }
      ]
    };

    const expected: IBrightcoveVideo[] = [
      {
        id: "6162045655001",
        name:
          "Influencers blasted for 'treating protests like Coachella' on social media",
        thumbnail:
          "https://cf-images.ap-southeast-2.prod.boltdns.net/v1/static/3910869709001/79bd6eb2-0edc-472f-bdbd-b68e5e4bcbf0/26b9be4c-0806-44d8-95ee-595e8529d54c/160x90/match/image.jpg",
        poster:
          "https://cf-images.ap-southeast-2.prod.boltdns.net/v1/static/3910869709001/79bd6eb2-0edc-472f-bdbd-b68e5e4bcbf0/06afd13a-c263-48d3-ae67-3f06ea9f43a4/1280x720/match/image.jpg",
        description:
          "A series of viral videos showing social media influencers posing for photo ops at Black Lives Matter protests throughout the US has left people fuming."
      },
      {
        id: "6161930802001",
        name: "What If We Nuked a Hurricane?",
        thumbnail:
          "https://cf-images.ap-southeast-2.prod.boltdns.net/v1/static/6005208634001/90abf6cd-b518-4a0c-bb8f-3f33118568be/5cb24612-df53-45d6-ba95-fed8034c6c71/320x180/match/image.jpg",
        poster:
          "https://cf-images.ap-southeast-2.prod.boltdns.net/v1/static/6005208634001/90abf6cd-b518-4a0c-bb8f-3f33118568be/dc7c2877-5b7e-407a-b326-9ab26dcb1b12/1024x576/match/image.jpg",
        description: "Dear Mr President..."
      },
      {
        id: "6162161816001",
        name:
          "Scientists may have spotted the black hole nearest to Earth: study",
        thumbnail:
          "https://cf-images.ap-southeast-2.prod.boltdns.net/v1/static/6005208634001/e2336ebf-679c-467d-99a6-669f33be8fbd/3a64cf49-18dc-4068-a863-65e97c3aa6c4/320x180/match/image.jpg",
        poster:
          "https://cf-images.ap-southeast-2.prod.boltdns.net/v1/static/6005208634001/e2336ebf-679c-467d-99a6-669f33be8fbd/85531f86-616d-4516-a65e-7b129dcfbd2a/1024x576/match/image.jpg",
        description:
          "Scientists may have spotted a black hole so close to Earth that its two companion stars are visible to the naked eye, according to a paper in Astronomy and Physics."
      }
    ];

    const list = mapBrightcovePlaylist(playlist);

    expect(list).toEqual(expected);
  });
});
