import { Injectable } from "@angular/core";
import { memoize } from "lodash-es";

const removeSpecialChars = (text: string) => text.replace(/[^a-zA-Z0-9 ]/g, "");

const spaceToDash = (text: string) => text.replace(/[\s]+/g, "-");

const camelCaseToDashCase = (text: string) =>
  text.replace(/([a-z])([A-Z0-9])/g, "$1-$2").toLowerCase();

@Injectable({
  providedIn: "root"
})
export class ClassNameService {
  public static generateClassName = memoize((text: string = "") => {
    const filterSpecialCharacters = removeSpecialChars(text);
    const spacingToDash = spaceToDash(filterSpecialCharacters);
    return camelCaseToDashCase(spacingToDash);
  });
}
