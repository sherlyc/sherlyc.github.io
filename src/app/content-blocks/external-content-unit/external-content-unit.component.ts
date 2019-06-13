import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IContentBlockComponent } from '../__types__/IContentBlockComponent';
import { IExternalContentUnit } from '../../../../common/__types__/IExternalContentUnit';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-external-content-unit',
  templateUrl: './external-content-unit.component.html',
  styleUrls: ['./external-content-unit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExternalContentUnitComponent implements IContentBlockComponent {
  @Input() input!: IExternalContentUnit;

  constructor(private sanitizer: DomSanitizer) {}

  getUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.input.url);
  }
}
