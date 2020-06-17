import { Component, HostBinding, Input, OnInit } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { Logo } from "../../../../../common/Logo";
import logos from "./logos";

@Component({
  selector: "app-logo",
  template: "",
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
