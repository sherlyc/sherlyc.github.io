import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { IContentBlockComponent } from '../__types__/IContentBlockComponent';
import { IExternalContentUnit } from '../../../../common/__types__/IExternalContentUnit';
import { DomSanitizer } from '@angular/platform-browser';
import { ScriptInjectorService } from '../../services/script-injector/script-injector.service';
import { ScriptId } from '../../services/script-injector/__types__/ScriptId';
import { Position } from '../../services/script-injector/__types__/Position';
import { RuntimeService } from '../../services/runtime/runtime.service';

@Component({
  selector: 'app-external-content-unit',
  templateUrl: './external-content-unit.component.html',
  styleUrls: ['./external-content-unit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExternalContentUnitComponent
  implements IContentBlockComponent, OnInit {
  @Input() input!: IExternalContentUnit;

  constructor(
    private sanitizer: DomSanitizer,
    private scriptInjectorService: ScriptInjectorService,
    private runtimeService: RuntimeService
  ) {}

  async ngOnInit() {
    const { scriptUrl } = this.input;
    if (this.runtimeService.isBrowser() && scriptUrl) {
      await this.scriptInjectorService.load(
        ScriptId.neighbourlyTopStories,
        scriptUrl,
        Position.BOTTOM
      );
    }
  }

  getUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.input.url);
  }
}
