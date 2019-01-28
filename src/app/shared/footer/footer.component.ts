import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  footerLinks: IFooterLink[] = [
    {
      title: 'Stuff Fibre',
      url: 'https://stuff-fibre.co.nz',
      target: '_blank'
    },
    { title: 'Indexed', url: 'https://www.indexed.co.nz', target: '_blank' },
    {
      title: 'Neighbourly',
      url: 'https://www.neighbourly.co.nz',
      target: '_blank'
    },
    {
      title: 'Death Notices',
      url: 'http://deaths.stuff.co.nz/obituaries/stuff-nz',
      target: '_blank'
    },
    {
      title: 'Advertising',
      url: 'https://advertise.stuff.co.nz',
      target: '_blank'
    },
    { title: 'Careers', url: 'https://careers.stuff.co.nz', target: '_blank' },
    {
      title: 'Privacy Policy',
      url: 'https://stuff.co.nz/about-stuff/10648385/Privacy-Policy',
      target: '_self'
    },
    {
      title: 'Terms & Conditions',
      url:
        'https://stuff.co.nz/about-stuff/10647720/Stuffs-terms-and-conditions',
      target: '_self'
    },
    {
      title: 'Contact Us',
      url: 'https://stuff.co.nz/about-stuff/33785/Contact-Us',
      target: '_self'
    }
  ];

  footerIcons: IFooterIcon[] = [
    {
      iconName: 'facebook-footer',
      href: 'https://www.facebook.com/Stuff.co.nz',
      title: 'Facebook'
    },
    {
      iconName: 'twitter-footer',
      href: 'https://twitter.com/NZStuff',
      title: 'Twitter'
    },
    {
      iconName: 'snapchat-footer',
      href:
        'https://stuff.co.nz/national/blogs/from-the-newsroom/12231484/Join-Stuff-co-nz-on-Snapchat',
      title: 'Snapchat'
    }
  ];

  currentYear: number = Date.now();
}

interface IFooterLink {
  title: string;
  url: string;
  target: string;
}

interface IFooterIcon {
  iconName: string;
  href: string;
  title: string;
}
