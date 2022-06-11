export interface Database<T> {
  get: (field: keyof T) => Promise<T>;
  //TODO improve type for value must be value from object
  set: (field: keyof T, value: string) => Promise<void>;
  setAll: (obj: T) => Promise<void>;
}
