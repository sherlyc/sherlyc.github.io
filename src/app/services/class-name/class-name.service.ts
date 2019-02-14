import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClassNameService {
  public generateClassName(text: string): string {
    return text.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  }
}
