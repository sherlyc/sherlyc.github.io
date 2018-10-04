import { NgModule } from '@angular/core';
import { MatToolbarModule, MatIconModule, MatButtonModule, MatTabsModule, MatInputModule } from '@angular/material';

@NgModule({
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatTabsModule, MatInputModule],
  exports: [MatToolbarModule, MatIconModule, MatButtonModule, MatTabsModule, MatInputModule],
})
export class StuffCustomMaterialModule { }

