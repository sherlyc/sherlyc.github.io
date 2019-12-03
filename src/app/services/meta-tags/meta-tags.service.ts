import { Injectable } from "@angular/core";
import { Meta, MetaDefinition } from "@angular/platform-browser";

@Injectable({
  providedIn: "root"
})
export class MetaTagsService {
  constructor(private meta: Meta) {}

  getGeneralMetaTag(): MetaDefinition[] {
    return [
      {
        name: "theme-color",
        content: "#ffffff"
      },
      {
        name: "description",
        content:
          `Breaking news and videos of today's latest news stories from around ` +
          "New Zealand, including up to date weather, World, sport, business, " +
          "Entertainment, Technology Life and Style, Travel and motoring."
      }
    ];
  }

  getSocialMetaTags(): MetaDefinition[] {
    return [
      {
        property: "fb:app_id",
        content: "207633159308175"
      },
      {
        property: "fb:pages",
        content: "21253884267"
      },
      {
        property: "og:site_name",
        content: "Stuff"
      },
      {
        property: "og:title",
        content: "Latest breaking news NZ | Stuff.co.nz"
      },
      {
        property: "og:type",
        content: "website"
      },
      {
        property: "og:url",
        content: "https://www.stuff.co.nz/"
      },
      {
        property: "og:image",
        content:
          "https://www.stuff.co.nz/etc/designs/ffx/nz/stuff/social-media-logos/stuff-200x200.png"
      },
      {
        property: "og:image:width",
        content: "200"
      },
      {
        property: "og:image:height",
        content: "200"
      }
    ];
  }

  setup() {
    this.meta.addTags(this.getGeneralMetaTag());
    this.meta.addTags(this.getSocialMetaTags());
  }
}
