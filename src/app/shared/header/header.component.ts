import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input()
  mainNavLink!: NavLink;

  @Input()
  subNavLink!: NavLink;

  constructor() {}

  ngOnInit() {}
}

interface NavLink {
  text: string;
  href: string;
}
