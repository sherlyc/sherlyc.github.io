export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

type FilterFlags<T, PropertyType> = {
  [Key in keyof T]: T[Key] extends PropertyType ? Key : never
};
type AllowedNames<T, PropertyType> = FilterFlags<T, PropertyType>[keyof T];

type SubType<T, PropertyType> = Pick<T, AllowedNames<T, PropertyType>>;

export type AutoMock<T, PropertyType = Function> = {
  [K in keyof SubType<T, PropertyType>]: AutoMocked<T[K]>
};

export type AutoMocked<P> = P extends (...args: any[]) => any
  ? (P &
      // @ts-ignore
      jest.MockInstance<Partial<ReturnType<P>>, Parameters<P>>)
  : P;
