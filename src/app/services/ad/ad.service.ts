import { Inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { filter } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class AdService {
  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    private config: ConfigService
  ) {}

  setupAds() {
    const scriptId = 'aad-sdk';
    if (!this.document.querySelector(`#${scriptId}`)) {
      const script = this.document.createElement('script');
      script.id = scriptId;
      script.src = this.config.getConfig().aadSdkUrl;
      if (this.document.body) {
        this.document.body.appendChild(script);
      }
    }
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        setTimeout(() => {
          this.document.dispatchEvent(new Event('NavigationEnd'));
        }, 0);
      });
  }
}
