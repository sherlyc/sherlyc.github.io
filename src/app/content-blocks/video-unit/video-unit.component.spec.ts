import { DOCUMENT } from '@angular/common';
import { ContentBlockType } from './../../../../common/__types__/ContentBlockType';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VideoUnitComponent } from './video-unit.component';
import { mockService, ServiceMock } from '../../services/mocks/MockService';
import { ScriptInjectorService } from '../../services/script-injector/script-injector.service';
import { ScriptId } from '../../services/script-injector/__types__/ScriptId';
import { Position } from '../../services/script-injector/__types__/Position';
import { ConfigService } from '../../services/config/config.service';
import { By } from '@angular/platform-browser';
import { WindowService } from '../../services/window/window.service';

describe('VideoUnitComponent', () => {
  const videojs = jest.fn();
  const mockDocument = { getElementById: jest.fn() };

  let component: VideoUnitComponent;
  let fixture: ComponentFixture<VideoUnitComponent>;
  let injectorService: ServiceMock<ScriptInjectorService>;
  let configService: ServiceMock<ConfigService>;
  let windowService: ServiceMock<WindowService>;
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
        },
        {
          provide: WindowService,
          useClass: mockService(WindowService)
        },
        {
          provide: DOCUMENT,
          useClass: mockDocument
        }
      ],
      declarations: [VideoUnitComponent]
    }).compileComponents();

    configService = TestBed.get(ConfigService);
    windowService = TestBed.get(WindowService);
    windowService.getWindow.mockReturnValue({ videojs });

    configService.getConfig.mockReturnValue({
      video: { videoPlayerSrc: videoScriptUrl }
    });

    injectorService = TestBed.get(ScriptInjectorService);
    injectorService.load.mockResolvedValue({});

    fixture = TestBed.createComponent(VideoUnitComponent);

    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject the video.js library', () => {
    const playlistId = '123';
    component.input = {
      type: ContentBlockType.VideoUnit,
      playlistId,
      accountId: '456',
      playerId: '789'
    };
    fixture.detectChanges();
    expect(injectorService.load).toHaveBeenCalledTimes(1);
    expect(injectorService.load).toHaveBeenCalledWith(
      ScriptId.videoPlayer,
      videoScriptUrl,
      Position.BOTTOM
    );
  });

  it('should render the video player', () => {
    const playlistId = '123';
    const accountId = '456';
    const playerId = '789';
    component.input = {
      type: ContentBlockType.VideoUnit,
      playlistId,
      accountId,
      playerId
    };

    fixture.detectChanges();

    const videoPlayer = fixture.debugElement.query(By.css('video'));

    expect(videoPlayer.nativeElement.getAttribute('data-playlist-id')).toEqual(
      playlistId
    );
    expect(videoPlayer.nativeElement.getAttribute('data-account')).toEqual(
      accountId
    );
    expect(videoPlayer.nativeElement.getAttribute('data-player')).toEqual(
      playerId
    );
  });
  it('should render the video playlist', () => {
    const playlistId = '123';
    const accountId = '456';
    const playerId = '789';
    component.input = {
      type: ContentBlockType.VideoUnit,
      playlistId,
      accountId,
      playerId
    };

    const videoPlaylist = fixture.debugElement.query(By.css('ol.vjs-playlist'));

    expect(videoPlaylist).toBeTruthy();
  });

  it('should load the videojs library with the video player', () => {
    const fakeVideoElement = {};
    mockDocument.getElementById.mockReturnValue(fakeVideoElement);

    const playlistId = '123';
    const accountId = '456';
    const playerId = '789';

    component.input = {
      type: ContentBlockType.VideoUnit,
      playlistId,
      accountId,
      playerId
    };

    fixture.detectChanges();

    expect(videojs).toHaveBeenCalledWith(fakeVideoElement);
  });
});
