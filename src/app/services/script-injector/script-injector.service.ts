import { Inject, Injectable } from '@angular/core';
import { Position } from './__types__/Position';
import { DOCUMENT } from '@angular/common';
import { LoggerService } from '../logger/logger.service';
import { ScriptId } from './__types__/ScriptId';

@Injectable({
  providedIn: 'root'
})
export class ScriptInjectorService {
  private promises: {
    [key: string]: Promise<Event>;
  } = {};

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private logger: LoggerService
  ) {}

  load(
    id: ScriptId,
    src: string,
    position: Position = Position.HEAD,
    async: boolean = false
  ) {
    if (this.document.querySelector(`#${id}`)) {
      return this.promises[id];
    }
    const scriptElement: HTMLScriptElement = this.document.createElement(
      'script'
    );

    scriptElement.id = id;
    scriptElement.src = src;
    scriptElement.async = async;
    const promise = new Promise<Event>((resolve, reject) => {
      scriptElement.addEventListener('load', (evt) => {
        this.logger.info(`${id} has been loaded`);
        resolve(evt);
      });
      scriptElement.addEventListener('error', (err) => {
        this.logger.warn(`${id} fails to be loaded: ${err}`);
        reject(err);
      });
    });
    this.promises[id] = promise;

    this.appendElement(scriptElement, position);
    return promise;
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
}
