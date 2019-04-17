import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdService } from './services/ad/ad.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router, private adService: AdService) {
    this.adService.setupAds();
  }
}
