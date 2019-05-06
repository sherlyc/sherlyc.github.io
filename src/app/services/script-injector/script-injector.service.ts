import { Inject, Injectable } from '@angular/core';
import { Position } from './__types__/Position';
import { DOCUMENT } from '@angular/common';
import { RuntimeService } from '../runtime/runtime.service';
import { LoggerService } from '../logger/logger.service';
import { ScriptId } from './__types__/ScriptId';
import { promises } from 'fs';

@Injectable({
  providedIn: 'root'
})
export class ScriptInjectorService {
  promises: {
    [key: string]: Promise<Event>;
  } = {};

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private runtime: RuntimeService,
    private logger: LoggerService
  ) {}

  load(id: string, src: string, position: Position, async: boolean = false) {
    if (this.runtime.isServer()) {
      return;
    }
    if (this.document.querySelector(`#${id}`)) {
      return;
    }
    const scriptElement: HTMLScriptElement = this.document.createElement(
      'script'
    );

    scriptElement.id = id;
    scriptElement.src = src;
    scriptElement.async = async;
    this.promises[id] = new Promise((resolve, reject) => {
      scriptElement.addEventListener('load', (evt) => {
        this.logger.info(`${id} has been loaded`);
        resolve(evt);
      });
      scriptElement.addEventListener('error', (err) => {
        this.logger.warn(`${id} fails to be loaded: ${err}`);
        reject(err);
      });
    });

    this.appendElement(scriptElement, position);
  }

  private appendElement(scriptElement: HTMLScriptElement, position: Position) {
    let targetElement: HTMLElement | null = null;
    switch (position) {
      case Position.HEAD:
        targetElement = this.document.head;
        break;
      case Position.BOTTOM:
        targetElement = this.document.body;
        break;
    }
    if (targetElement) {
      targetElement.appendChild(scriptElement);
    }
  }

  check(id: ScriptId) {
    return this.promises[id];
  }
}
