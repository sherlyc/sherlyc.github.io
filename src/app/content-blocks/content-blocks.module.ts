import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { contentBlockComponents } from "./content-blocks.registry";

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: contentBlockComponents,
  entryComponents: contentBlockComponents
})
export class ContentBlocksModule {}
