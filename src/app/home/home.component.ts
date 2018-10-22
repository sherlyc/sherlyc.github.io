import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  activeLinkIndex;
  actionTitle = 'Compose';
  title = 'Content';
  links = ['Articles', 'Images', 'Videos'];
  actionTitleArr = ['Compose', 'Upload', 'Upload'];
  constructor() { }

  activateLink(index: number, linkIsActivated: boolean) {
    this.activeLinkIndex = index;
    this.title = this.links[index];
    this.actionTitle = this.actionTitleArr[index];
    console.log(linkIsActivated);
  }

  ngOnInit() {
    this.activeLinkIndex = 0;
  }

}
