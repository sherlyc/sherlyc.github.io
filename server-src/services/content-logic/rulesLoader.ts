import olderToNewest from './rules/olderToNewest.rule';
import { IContentRuleRegistry } from '../../interfaces/IContentRuleRegistry';

const availableRules: IContentRuleRegistry = {};

export default (): IContentRuleRegistry => {
  availableRules['olderToNewest'] = olderToNewest;
  return availableRules;
};
