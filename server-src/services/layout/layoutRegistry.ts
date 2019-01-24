import homepageLayout from './homepageLayout';
import { ILayoutRegistry } from '../../interfaces/content-blocks/ILayoutRegistry';

const layoutRegistry: ILayoutRegistry = {};

layoutRegistry['homepage'] = homepageLayout;

export default layoutRegistry;
