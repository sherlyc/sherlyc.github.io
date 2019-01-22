import { IContentRule } from '../../interfaces/IContentRule';
import olderToNewest from './rules/olderToNewest.rule';

const availableRules: Map<string, IContentRule> = new Map();

export default (): Map<string, IContentRule> => {
  availableRules.set('olderToNewest', olderToNewest);
  return availableRules;
};
