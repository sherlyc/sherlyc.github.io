import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClassNameService {
  public static generateClassName(text: string): string {
    const camelCaseToDash = text.replace(/([a-z])([A-Z])/g, '$1-$2');
    const apostropheSpaceToDash = camelCaseToDash.replace(/(\w)[\&\'\s]+(\w)/g, '$1-$2');

    return apostropheSpaceToDash.toLowerCase();
  }
}

