import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authoring',
  templateUrl: './authoring.component.html',
  styleUrls: ['./authoring.component.scss']
})
export class AuthoringComponent implements OnInit {

  constructor() { }
  headline: string;
  ngOnInit() {
    // throw new Error('I am a bug... 🐛');
  }

}
