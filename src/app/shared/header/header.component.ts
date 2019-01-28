import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input()
  mainNavLink!: INavLink;

  @Input()
  subNavLink!: INavLink;

  constructor() {}

  ngOnInit() {}
}

interface INavLink {
  text: string;
  href: string;
}
