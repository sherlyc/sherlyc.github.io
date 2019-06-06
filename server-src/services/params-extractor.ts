import { IParams } from './__types__/IParams';
import * as uuidv4 from 'uuid/v4';

export default (): IParams => {
  return {
    apiRequestId: uuidv4()
  };
};
