import { Component, Inject, Input, OnInit } from '@angular/core';
import { ScriptInjectorService } from '../../services/script-injector/script-injector.service';
import { Position } from '../../services/script-injector/__types__/Position';
import { IContentBlockComponent } from '../__types__/IContentBlockComponent';
import { IVideoUnit } from '../../../../common/__types__/IVideoUnit';
import { ScriptId } from '../../services/script-injector/__types__/ScriptId';
import { ConfigService } from '../../services/config/config.service';
import { WindowService } from '../../services/window/window.service';
import { DOCUMENT } from '@angular/common';

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
    private configService: ConfigService,
    private windowService: WindowService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  async ngOnInit() {
    await this.injectorService.load(
      ScriptId.videoPlayer,
      this.configService.getConfig().video.videoPlayerSrc,
      Position.BOTTOM
    );
    const videoElement = this.document.getElementById('video');
    if (videoElement) {
      this.windowService.getWindow().videojs(videoElement);
    }
  }
}
