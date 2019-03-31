import { DeepPartial, PickByValue } from 'utility-types/dist/mapped-types';

export type AutoMock<T, PropertyType = Function> = {
  [K in keyof PickByValue<T, PropertyType>]: AutoMocked<T[K]>
};

export type AutoMocked<PropertyType> = PropertyType extends (
  ...args: any[]
) => any
  ? (PropertyType &
      // @ts-ignore
      jest.MockInstance<
        DeepPartial<ReturnType<PropertyType>>,
        Parameters<PropertyType>
      >)
  : PropertyType;
