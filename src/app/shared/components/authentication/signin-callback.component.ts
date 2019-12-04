import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../../services/authentication/authentication.service";

@Component({
  selector: "app-signin-callback",
  template: "<h4> Redirecting ... </h4>"
})
export class SigninCallbackComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.authenticationService.signinCallback();
  }
}
