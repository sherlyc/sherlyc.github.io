import { Injectable } from '@angular/core';
import { MetaService } from '@ngx-meta/core';
import { IMeta } from './__types__/IMeta';

@Injectable({
  providedIn: 'root'
})
export class MetaTagsService {
  constructor(private meta: MetaService) {}

  getGeneralMetaTag(): IMeta[] {
    return [
      {
        name: 'theme-color',
        content: '#ffffff'
      },
      {
        name: 'description',
        content:
          `Breaking news and videos of today's latest news stories from around` +
          ' New Zealand, including up to date weather, World, sport, business, ' +
          'Entertainment, Technology Life and Style, Travel and motoring.'
      }
    ];
  }

  getSocialMetaTags(): IMeta[] {
    return [
      {
        name: 'fb:app_id',
        content: '207633159308175'
      },
      {
        name: 'fb:pages',
        content: '21253884267'
      },
      {
        name: 'og:site_name',
        content: 'Stuff'
      },
      {
        name: 'og:title',
        content: 'Latest breaking news NZ | Stuff.co.nz'
      },
      {
        name: 'og:type',
        content: 'website'
      },
      {
        name: 'og:url',
        content: 'http://www.stuff.co.nz/'
      },
      {
        name: 'og:image',
        content:
          'http://www.stuff.co.nz/etc/designs/ffx/nz/stuff/social-media-logos/stuff-200x200.png'
      },
      {
        name: 'og:image:width',
        content: '200'
      },
      {
        name: 'og:image:height',
        content: '200'
      }
    ];
  }

  setTags(tags: IMeta[]) {
    tags.forEach((tag) => this.meta.setTag(tag.name, tag.content));
  }

  setup() {
    this.setTags(this.getGeneralMetaTag());
    this.setTags(this.getSocialMetaTags());
  }
}
