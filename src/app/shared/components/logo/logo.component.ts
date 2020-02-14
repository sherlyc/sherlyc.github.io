import { Component, Input } from "@angular/core";
import { Logo } from "../../../../../common/Logo";

@Component({
  selector: "app-logo",
  templateUrl: "./logo.component.html",
  styleUrls: ["./logo.component.scss"]
})
export class LogoComponent {
  @Input() name!: Logo;
}
