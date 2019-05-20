import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoUnitComponent } from './video-unit.component';
import { mockService, ServiceMock } from '../../services/mocks/MockService';
import { ScriptInjectorService } from '../../services/script-injector/script-injector.service';
import { ScriptId } from '../../services/script-injector/__types__/ScriptId';
import { Position } from '../../services/script-injector/__types__/Position';

describe('VideoUnitComponent', () => {
  let component: VideoUnitComponent;
  let fixture: ComponentFixture<VideoUnitComponent>;
  let injectorService: ServiceMock<ScriptInjectorService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ScriptInjectorService,
          useClass: mockService(ScriptInjectorService)
        }
      ],
      declarations: [VideoUnitComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoUnitComponent);
    component = fixture.componentInstance;
    injectorService = TestBed.get(ScriptInjectorService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject the library javascript dependency', () => {
    fixture.detectChanges();
    expect(injectorService.load).toHaveBeenCalledTimes(1);
    expect(injectorService.load).toHaveBeenCalledWith(
      ScriptId.videoPlayer,
      '//players.brightcove.net/3921507366001/SJzCEInBZ_default/index.js',
      Position.BOTTOM
    );
  });
});
