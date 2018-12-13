import { Component, OnInit, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { ComponentFactoryResolver } from '@angular/core/src/render3';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {

  @Input()
  name: string;

  constructor() { }

  ngOnInit() {
  }

}
