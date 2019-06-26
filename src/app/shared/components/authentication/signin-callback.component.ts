import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication/authentication.service';

@Component({
  selector: 'app-signin-callback',
  template:
    '<h3> Redirecting ... </h3> ' +
    '<div style="width:100%;height:0;padding-bottom:70%;position:relative;">' +
    '<iframe src="https://giphy.com/embed/w9yg6QsZJ3JC" width="100%" ' +
    'height="20%" style="position:absolute" frameBorder="0" ' +
    'class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/w9yg6QsZJ3JC">via GIPHY</a></p>'
})
export class SigninCallbackComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.authenticationService.signinCallback();
  }
}
