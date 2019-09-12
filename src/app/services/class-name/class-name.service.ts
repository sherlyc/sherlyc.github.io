import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClassNameService {
  public static generateClassName(text: string): string {
    const removeSpecialCharacter = text.replace(/\W/g, '');
    const camelCaseToDash = removeSpecialCharacter.replace(
      /([a-z])([A-Z 0-9])/g,
      '$1-$2'
    );

    return camelCaseToDash.toLowerCase();
  }
}
