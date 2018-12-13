import {Component, OnInit} from '@angular/core';

export class FooterLink {
  title: string;
  url: string;
  target: string;

  constructor(title: string, url: string, target: string) {
    this.title = title;
    this.url = url;
    this.target = target;
  }
}

export class FooterIcon {
  iconName: string;
  href: string;
  title: string;

  constructor(iconName: string, href: string, title: string) {
    this.iconName = iconName;
    this.href = href;
    this.title = title;
  }
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {


  footerLinks: FooterLink[] = [
    new FooterLink('Stuff Fibre', 'https://stuff-fibre.co.nz', '_blank'),
    new FooterLink('Indexed', 'https://www.indexed.co.nz', '_blank'),
    new FooterLink('Neighbourly', 'https://www.neighbourly.co.nz', '_blank'),
    new FooterLink('Death Notices', 'http://deaths.stuff.co.nz/obituaries/stuff-nz', '_blank'),
    new FooterLink('Advertising', 'https://advertise.stuff.co.nz', '_blank'),
    new FooterLink('Careers', 'https://careers.stuff.co.nz', '_blank'),
    new FooterLink(
      'Privacy Policy', 'https://stuff.co.nz/about-stuff/10648385/Privacy-Policy', '_self'),
    new FooterLink(
      'Terms & Conditions',
      'https://stuff.co.nz/about-stuff/10647720/Stuffs-terms-and-conditions', '_self'),
    new FooterLink('Contact Us', 'https://stuff.co.nz/about-stuff/33785/Contact-Us', '_self')
  ];

  FooterIcons: FooterIcon[] = [
    new FooterIcon('facebook-footer', 'https://www.facebook.com/Stuff.co.nz', 'Facebook'),
    new FooterIcon('twitter-footer', 'https://twitter.com/NZStuff', 'Twitter'),
    new FooterIcon('snapchat-footer',
      'https://stuff.co.nz/national/blogs/from-the-newsroom/12231484/Join-Stuff-co-nz-on-Snapchat',
      'Snapchat'),
  ];

  today: number = Date.now();

  constructor() {
  }

  ngOnInit() {
  }

}
