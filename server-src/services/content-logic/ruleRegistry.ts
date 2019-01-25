import olderToNewest from './olderToNewestRule';
import { IContentRuleRegistry } from './__types__/IContentRuleRegistry';

const ruleRegistry: IContentRuleRegistry = {};

ruleRegistry['olderToNewest'] = olderToNewest;

export default ruleRegistry;
