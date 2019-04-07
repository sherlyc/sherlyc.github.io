import { Type } from '@angular/core';
import { DeepPartial, PickByValue } from 'utility-types/dist/mapped-types';

export type ServiceMock<T> = {
  [K in keyof PickByValue<T, Function>]: ServiceMethodMock<T[K]>
} &
  T;

export type ServiceMethodMock<PropertyType> = PropertyType extends (
  ...args: any[]
) => any
  ? (PropertyType &
      // @ts-ignore
      jest.MockInstance<
        DeepPartial<ReturnType<PropertyType>> | null,
        Parameters<PropertyType>
      >)
  : PropertyType;

export function mockService<TService>(
  service: Type<TService>
): Type<ServiceMock<TService>> {
  class ServiceMockClass {
    constructor() {
      Object.keys(service.prototype).forEach((method) => {
        if (!(this as any)[method]) {
          // @ts-ignore
          (this as any)[method] = jest.fn();
        }
      });
    }
  }

  return ServiceMockClass as Type<ServiceMock<TService>>;
}
