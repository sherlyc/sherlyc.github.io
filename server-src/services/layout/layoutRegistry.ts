import homepageLayout from './homepageLayout';
import { ILayoutRegistry } from './__types__/ILayoutRegistry';

const layoutRegistry: ILayoutRegistry = {};

layoutRegistry['homepage'] = homepageLayout;

export default layoutRegistry;
