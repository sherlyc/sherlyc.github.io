import { Type } from '@angular/core';
import { DeepPartial, PickByValue } from 'utility-types/dist/mapped-types';

export type ServiceMock<T> = {
  [K in keyof PickByValue<T, Function>]: ServiceMethodMock<T[K]>;
} &
  T;

export type PartialOrPromise<T> = T extends Promise<infer U>
  ? U
  : DeepPartial<T> | null;

export type ServiceMethodMock<PropertyType> = PropertyType extends (
  ...args: any[]
) => any
  ? (PropertyType &
      jest.MockInstance<
        PartialOrPromise<ReturnType<PropertyType>>,
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
          (this as any)[method] = jest.fn();
        }
      });
    }
  }

  return ServiceMockClass as Type<ServiceMock<TService>>;
}
