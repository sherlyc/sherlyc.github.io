import olderToNewest from './olderToNewestRule';
import { IContentRuleRegistry } from '../../interfaces/IContentRuleRegistry';

const ruleRegistry: IContentRuleRegistry = {};

ruleRegistry['olderToNewest'] = olderToNewest;

export default ruleRegistry;
