import olderToNewest from './rules/olderToNewest.rule';
import { IContentRuleList } from '../../interfaces/IContentRuleList';

const availableRules: IContentRuleList = {};

export default (): IContentRuleList => {
  availableRules['olderToNewest'] = olderToNewest;
  return availableRules;
};
