import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { ISkybox } from "../../../../common/__types__/ISkybox";

@Component({
  selector: "app-skybox",
  templateUrl: "./skybox.component.html",
  styleUrls: ["./skybox.component.scss"]
})
export class SkyboxComponent implements OnInit {
  @Input()
  input!: ISkybox;
  @ViewChild("scroller") scroller!: ElementRef;

  constructor() {
  }

  ngOnInit(): void {
  }

  scrollLeft(): void {
    console.log(this.scroller.nativeElement);
    this.scroller.nativeElement.scrollTo({ left: (this.scroller.nativeElement.scrollLeft - 150), behavior: "smooth" });
  }

  scrollRight(): void {
    console.log(this.scroller.nativeElement);
    this.scroller.nativeElement.scrollTo({ left: (this.scroller.nativeElement.scrollLeft + 150), behavior: "smooth" });
  }
}
