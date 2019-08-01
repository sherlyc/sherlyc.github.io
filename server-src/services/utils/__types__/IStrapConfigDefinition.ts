import { IStrapDefinition } from './IStrapDefinition';
import { Strap } from '../../strap';

export interface IStrapConfigDefinition {
  dedupeList: Strap[];
  homepageStraps: { [key in Strap]: IStrapDefinition };
  overrides?: { [key: string]: { [key: string]: IStrapDefinition } };
}
