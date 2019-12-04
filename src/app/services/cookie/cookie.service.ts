import { Inject, Injectable } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { parse, serialize, CookieSerializeOptions } from "cookie";
import { ICookieService } from "./__types__/ICookieService";

@Injectable({
  providedIn: "root"
})
export class CookieService implements ICookieService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  get(name: string) {
    return this.getAll()[name];
  }

  set(name: string, value: string, options: CookieSerializeOptions = {}) {
    this.document.cookie = serialize(name, value, options);
  }

  getAll(): { [key: string]: string } {
    return parse(this.document.cookie);
  }
}
