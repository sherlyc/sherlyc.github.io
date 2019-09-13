import { Injectable } from '@angular/core';
import { memoize } from 'lodash';

const removeSpecialChars = memoize((text: string) => {
  return text.replace(/[^a-zA-Z0-9 ]/g, '');
});

const spaceToDash = memoize((text: string) => {
  return text.replace(/[\s]+/g, '-');
});

const camelCaseToDashCase = memoize((text: string) => {
  return text.replace(/([a-z])([A-Z0-9])/g, '$1-$2').toLowerCase();
});

@Injectable({
  providedIn: 'root'
})
export class ClassNameService {
  public static generateClassName(text: string): string {
    const filterSpecialCharacters = removeSpecialChars(text);
    const spacingToDash = spaceToDash(filterSpecialCharacters);
    const camelCaseToDash = camelCaseToDashCase(spacingToDash);

    return camelCaseToDash;
  }
}
