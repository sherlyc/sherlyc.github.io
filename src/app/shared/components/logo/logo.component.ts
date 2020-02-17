import { Component, HostBinding, Input, OnInit } from "@angular/core";
import { Logo } from "../../../../../common/Logo";
import logos from "./logos";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Component({
  selector: "app-logo",
  templateUrl: "./logo.component.html",
  styleUrls: ["./logo.component.scss"]
})
export class LogoComponent implements OnInit {
  @Input() name!: Logo;
  @HostBinding("innerHTML") content!: SafeHtml;
  constructor(private sanitizer: DomSanitizer) {}
  ngOnInit() {
    this.content = this.sanitizer.bypassSecurityTrustHtml(logos[this.name]);
  }
}
