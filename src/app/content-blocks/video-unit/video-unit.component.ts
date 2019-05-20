import { Component, Input, OnInit } from '@angular/core';
import { ScriptInjectorService } from '../../services/script-injector/script-injector.service';
import { Position } from '../../services/script-injector/__types__/Position';
import { IContentBlockComponent } from '../__types__/IContentBlockComponent';
import { IVideoUnit } from '../../../../common/__types__/IVideoUnit';
import { ScriptId } from '../../services/script-injector/__types__/ScriptId';
import { ConfigService } from '../../services/config/config.service';

@Component({
  selector: 'app-video-unit',
  templateUrl: './video-unit.component.html',
  styleUrls: ['./video-unit.component.scss']
})
export class VideoUnitComponent implements OnInit, IContentBlockComponent {
  @Input()
  input!: IVideoUnit;

  constructor(
    private injectorService: ScriptInjectorService,
    private configService: ConfigService
  ) {}

  async ngOnInit() {
    await this.injectorService.load(
      ScriptId.videoPlayer,
      this.configService.getConfig().video.videoPlayerSrc,
      Position.BOTTOM
    );
  }
}
