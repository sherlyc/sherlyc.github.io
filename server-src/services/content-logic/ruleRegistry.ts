import olderToNewest from './rules/olderToNewest.rule';
import { IContentRuleRegistry } from '../../interfaces/IContentRuleRegistry';

const ruleRegistry: IContentRuleRegistry = {};

ruleRegistry['olderToNewest'] = olderToNewest;

export default ruleRegistry;
