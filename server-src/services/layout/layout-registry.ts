import homepageLayout from './homepage-layout';
import { ILayoutRegistry } from './__types__/ILayoutRegistry';

const layoutRegistry: ILayoutRegistry = {};

layoutRegistry['homepage'] = homepageLayout;

export default layoutRegistry;
