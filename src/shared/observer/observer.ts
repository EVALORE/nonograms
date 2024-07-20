export interface Observer<T> {
  update: (value: T) => void;
}
