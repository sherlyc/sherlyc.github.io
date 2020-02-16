import { Component, Input } from "@angular/core";
import { Logo } from "../../../../../common/Logo";
import { ManawatuStandard } from "./logos";
import { MarlboroughExpress } from "./logos";
import { NelsonMail } from "./logos";
import { SouthlandTimes } from "./logos";
import { TaranakiDailyNews } from "./logos";
import { DominionPost } from "./logos";
import { ThePress } from "./logos";
import { TimaruHerald } from "./logos";
import { WaikatoTimes } from "./logos";
import { BeautyHeaven } from "./logos";
import { FoodToLove } from "./logos";
import { HomesToLove } from "./logos";
import { Metro } from "./logos";
import { Newsroom } from "./logos";
import { Noted } from "./logos";
import { Now2love } from "./logos";
import { Tarana } from "./logos";

import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Component({
  selector: "app-logo",
  templateUrl: "./logo.component.html",
  styleUrls: ["./logo.component.scss"]
})
export class LogoComponent {
  @Input() name!: Logo;

  manawatuStandard: SafeHtml;
  marlboroughExpress: SafeHtml;
  nelsonMail: SafeHtml;
  southlandTimes: SafeHtml;
  taranakiDailyNews: SafeHtml;
  dominionPost: SafeHtml;
  thePress: SafeHtml;
  timaruHerald: SafeHtml;
  waikatoTimes: SafeHtml;
  beautyHeaven: SafeHtml;
  foodToLove: SafeHtml;
  homesToLove: SafeHtml;
  metro: SafeHtml;
  newsroom: SafeHtml;
  noted: SafeHtml;
  now2love: SafeHtml;
  tarana: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {
    this.manawatuStandard = sanitizer.bypassSecurityTrustHtml(ManawatuStandard);
    this.marlboroughExpress = sanitizer.bypassSecurityTrustHtml(
      MarlboroughExpress
    );
    this.nelsonMail = sanitizer.bypassSecurityTrustHtml(NelsonMail);
    this.southlandTimes = sanitizer.bypassSecurityTrustHtml(SouthlandTimes);
    this.taranakiDailyNews = sanitizer.bypassSecurityTrustHtml(
      TaranakiDailyNews
    );
    this.dominionPost = sanitizer.bypassSecurityTrustHtml(DominionPost);
    this.thePress = sanitizer.bypassSecurityTrustHtml(ThePress);
    this.timaruHerald = sanitizer.bypassSecurityTrustHtml(TimaruHerald);
    this.waikatoTimes = sanitizer.bypassSecurityTrustHtml(WaikatoTimes);
    this.beautyHeaven = sanitizer.bypassSecurityTrustHtml(BeautyHeaven);
    this.foodToLove = sanitizer.bypassSecurityTrustHtml(FoodToLove);
    this.homesToLove = sanitizer.bypassSecurityTrustHtml(HomesToLove);
    this.metro = sanitizer.bypassSecurityTrustHtml(Metro);
    this.newsroom = sanitizer.bypassSecurityTrustHtml(Newsroom);
    this.noted = sanitizer.bypassSecurityTrustHtml(Noted);
    this.now2love = sanitizer.bypassSecurityTrustHtml(Now2love);
    this.tarana = sanitizer.bypassSecurityTrustHtml(Tarana);
  }
}
