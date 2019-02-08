import { BasicArticleUnitComponent } from './basic-article-unit/basic-article-unit.component';
import { ErrorBlockComponent } from './error-block/error-block.component';

export const contentBlockComponents = [
  BasicArticleUnitComponent,
  ErrorBlockComponent
];

const registry: { [key: string]: any } = {
  BasicArticleUnit: BasicArticleUnitComponent,
  ErrorBlock: ErrorBlockComponent
};

export default registry;
