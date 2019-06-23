import { ContentBlockType } from './../../../../common/__types__/ContentBlockType';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VideoUnitComponent } from './video-unit.component';
import { mockService, ServiceMock } from '../../services/mocks/MockService';
import { ScriptInjectorService } from '../../services/script-injector/script-injector.service';
import { ScriptId } from '../../services/script-injector/__types__/ScriptId';
import { Position } from '../../services/script-injector/__types__/Position';
import { By } from '@angular/platform-browser';
import { WindowService } from '../../services/window/window.service';
import { RuntimeService } from '../../services/runtime/runtime.service';

describe('VideoUnitComponent', () => {
  const stuffVideoAnalyticsSpy = jest.fn();
  const videojsSpy = jest.fn();
  let component: VideoUnitComponent;
  let fixture: ComponentFixture<VideoUnitComponent>;
  let injectorService: ServiceMock<ScriptInjectorService>;
  let windowService: ServiceMock<WindowService>;
  let runtimeService: ServiceMock<RuntimeService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: ScriptInjectorService,
          useClass: mockService(ScriptInjectorService)
        },
        {
          provide: WindowService,
          useClass: mockService(WindowService)
        },
        {
          provide: RuntimeService,
          useClass: mockService(RuntimeService)
        }
      ],
      declarations: [VideoUnitComponent]
    }).compileComponents();

    windowService = TestBed.get(WindowService);
    videojsSpy.mockReturnValue({ stuffVideoAnalytics: stuffVideoAnalyticsSpy });
    windowService.getWindow.mockReturnValue({ videojs: videojsSpy });
    runtimeService = TestBed.get(RuntimeService);

    injectorService = TestBed.get(ScriptInjectorService);
    injectorService.load.mockImplementation(() => Promise.resolve());
    fixture = TestBed.createComponent(VideoUnitComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the video.js library and analytics plugin in browser', async () => {
    runtimeService.isBrowser.mockReturnValue(true);
    const playlistId = '123';
    const accountId = '456';
    const playerId = '789';
    const videoPlayerSrc = 'https://player.js';
    const videoAnalyticsPluginSrc = 'https://plugin.js';
    component.input = {
      type: ContentBlockType.VideoUnit,
      videoConfig: {
        playlistId,
        accountId,
        playerId,
        videoAnalyticsPluginSrc,
        videoPlayerSrc
      }
    };
    fixture.detectChanges();
    await component.ngOnInit();

    expect(injectorService.load).toHaveBeenCalledWith(
      ScriptId.videoPlayer,
      videoPlayerSrc,
      Position.BOTTOM
    );
    expect(injectorService.load).toHaveBeenCalledWith(
      ScriptId.videoPlayerAnalytics,
      videoAnalyticsPluginSrc,
      Position.BOTTOM
    );
    expect(videojsSpy).toHaveBeenCalledWith(
      fixture.debugElement.query(By.css('#video')).nativeElement
    );
    expect(stuffVideoAnalyticsSpy).toHaveBeenCalled();
  });

  it('should not load the video.js library and analytics plugin in server', async () => {
    runtimeService.isBrowser.mockReturnValue(false);
    await component.ngOnInit();

    expect(injectorService.load).not.toHaveBeenCalled();
    expect(videojsSpy).not.toHaveBeenCalled();
    expect(stuffVideoAnalyticsSpy).not.toHaveBeenCalled();
  });

  it('should render the video player', () => {
    const playlistId = '123';
    const accountId = '456';
    const playerId = '789';
    component.input = {
      type: ContentBlockType.VideoUnit,
      videoConfig: {
        playlistId,
        accountId,
        playerId,
        videoAnalyticsPluginSrc: 'https://plugin.js',
        videoPlayerSrc: 'https://player.js'
      }
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
      videoConfig: {
        playlistId,
        accountId,
        playerId,
        videoAnalyticsPluginSrc: 'https://plugin.js',
        videoPlayerSrc: 'https://player.js'
      }
    };

    const videoPlaylist = fixture.debugElement.query(By.css('ol.vjs-playlist'));
    expect(videoPlaylist).toBeTruthy();
  });
});
