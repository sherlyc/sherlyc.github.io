import { Component, OnInit } from '@angular/core';
import { AuthenticationCallbackService } from '../../../services/authentication/authentication-callback.service';

@Component({
  selector: 'app-signin-callback',
  template: '<h4> Authenticating ... </h4>'
})
export class SigninCallbackComponent implements OnInit {

  constructor(private authenticationCallBackService: AuthenticationCallbackService) {
  }

  ngOnInit() {
    this.authenticationCallBackService.signinCallback();
  }
}
