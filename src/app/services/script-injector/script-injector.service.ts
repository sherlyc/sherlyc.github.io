import { Inject, Injectable } from '@angular/core';
import { Position } from './__types__/Position';
import { DOCUMENT } from '@angular/common';
import { RuntimeService } from '../runtime/runtime.service';

@Injectable({
  providedIn: 'root'
})
export class ScriptInjectorService {
  promises: {
    [key: string]: Promise<Event>;
  } = {};

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private runtime: RuntimeService
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
      scriptElement.onload = resolve;
      scriptElement.onerror = reject;
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
}
