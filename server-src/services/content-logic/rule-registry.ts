import olderToNewest from './older-to-newest-rule';
import { IContentRuleRegistry } from './__types__/IContentRuleRegistry';

const ruleRegistry: IContentRuleRegistry = {};

ruleRegistry['olderToNewest'] = olderToNewest;

export default ruleRegistry;
