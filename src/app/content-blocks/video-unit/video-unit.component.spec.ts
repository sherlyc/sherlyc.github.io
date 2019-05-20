import { ContentBlockType } from './../../../../common/__types__/ContentBlockType';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VideoUnitComponent } from './video-unit.component';
import { mockService, ServiceMock } from '../../services/mocks/MockService';
import { ScriptInjectorService } from '../../services/script-injector/script-injector.service';
import { ScriptId } from '../../services/script-injector/__types__/ScriptId';
import { Position } from '../../services/script-injector/__types__/Position';
import { ConfigService } from '../../services/config/config.service';
import { By } from '@angular/platform-browser';

describe('VideoUnitComponent', () => {
  let component: VideoUnitComponent;
  let fixture: ComponentFixture<VideoUnitComponent>;
  let injectorService: ServiceMock<ScriptInjectorService>;
  let configService: ServiceMock<ConfigService>;
  const videoScriptUrl = 'http://something.com/video.js';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: ScriptInjectorService,
          useClass: mockService(ScriptInjectorService)
        },
        {
          provide: ConfigService,
          useClass: mockService(ConfigService)
        }
      ],
      declarations: [VideoUnitComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(VideoUnitComponent);
    component = fixture.componentInstance;
    injectorService = TestBed.get(ScriptInjectorService);
    configService = TestBed.get(ConfigService);

    configService.getConfig.mockReturnValue({
      video: { videoPlayerSrc: videoScriptUrl }
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject the video.js library', () => {
    fixture.detectChanges();
    expect(injectorService.load).toHaveBeenCalledTimes(1);
    expect(injectorService.load).toHaveBeenCalledWith(
      ScriptId.videoPlayer,
      videoScriptUrl,
      Position.BOTTOM
    );
  });

  it('should render the video player', () => {
    component.input = {
      type: ContentBlockType.VideoUnit,
      playlistId: '123',
      accountId: '456',
      playerId: '789'
    };

    fixture.detectChanges();

    const videoPlayer = fixture.debugElement.query(By.css('video'));

    expect(videoPlayer).toBeTruthy();
  });
});
