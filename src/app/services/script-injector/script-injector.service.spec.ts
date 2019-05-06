import { TestBed } from '@angular/core/testing';

import { ScriptInjectorService } from './script-injector.service';
import { mockService, ServiceMock } from '../mocks/MockService';
import { RuntimeService } from '../runtime/runtime.service';
import { Position } from './__types__/Position';
import { LoggerService } from '../logger/logger.service';

describe('ScriptInjectorService', () => {
  let runtimeServiceMock: ServiceMock<RuntimeService>;
  let scriptInjectorService: ScriptInjectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: RuntimeService,
          useClass: mockService(RuntimeService)
        },
        {
          provide: LoggerService,
          useClass: mockService(LoggerService)
        }
      ]
    });
    scriptInjectorService = TestBed.get(ScriptInjectorService);
    runtimeServiceMock = TestBed.get(RuntimeService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    document.getElementsByTagName('html')[0].innerHTML = '';
  });

  it('should be created', () => {
    expect(scriptInjectorService).toBeTruthy();
  });

  it('should do nothing when running in server side', () => {
    runtimeServiceMock.isServer.mockReturnValue(true);
    const id = 'test-script-id';
    const src = '__fixtures__/test-script.js';
    scriptInjectorService.load(id, src, Position.HEAD);
    const element = document.getElementById('test-script-id');
    expect(element).toBeFalsy();
  });

  it('should create a script element in the head', () => {
    runtimeServiceMock.isServer.mockReturnValue(false);
    const id = 'test-script-id';
    const src = '__fixtures__/test-script.js';
    scriptInjectorService.load(id, src, Position.HEAD);
    const element = document.getElementById('test-script-id');
    expect(element).toBeTruthy();
    expect(element).toBeInstanceOf(HTMLScriptElement);
    expect(element!.getAttribute('src')).toEqual(src);
    expect(element!.parentElement).toBeInstanceOf(HTMLHeadElement);
  });

  it('should create a script element in the body', () => {
    runtimeServiceMock.isServer.mockReturnValue(false);
    const id = 'test-script-id';
    const src = '__fixtures__/test-script.js';
    scriptInjectorService.load(id, src, Position.BOTTOM);
    const element = document.getElementById('test-script-id');
    expect(element).toBeTruthy();
    expect(element).toBeInstanceOf(HTMLScriptElement);
    expect(element!.getAttribute('src')).toEqual(src);
    expect(element!.parentElement).toBeInstanceOf(HTMLBodyElement);
  });
});
