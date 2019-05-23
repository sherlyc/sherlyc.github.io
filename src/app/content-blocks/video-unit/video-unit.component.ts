import { Component, Inject, Input, OnInit } from '@angular/core';
import { ScriptInjectorService } from '../../services/script-injector/script-injector.service';
import { Position } from '../../services/script-injector/__types__/Position';
import { IContentBlockComponent } from '../__types__/IContentBlockComponent';
import { IVideoUnit } from '../../../../common/__types__/IVideoUnit';
import { ScriptId } from '../../services/script-injector/__types__/ScriptId';
import { WindowService } from '../../services/window/window.service';
import { DOCUMENT } from '@angular/common';
import { RuntimeService } from '../../services/runtime/runtime.service';

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
    private windowService: WindowService,
    private runtimeService: RuntimeService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  async ngOnInit() {
    if (this.runtimeService.isBrowser()) {
      await this.injectorService.load(
        ScriptId.videoPlayer,
        this.input.videoConfig.videoPlayerSrc,
        Position.BOTTOM
      );
      await this.injectorService.load(
        ScriptId.videoPlayerAnalytics,
        this.input.videoConfig.videoAnalyticsPluginSrc,
        Position.BOTTOM
      );

      const videoElement = this.document.getElementById('video');
      if (videoElement) {
        const player = this.windowService.getWindow().videojs(videoElement);
        player.stuffVideoAnalytics();
      }
    }
  }
}
