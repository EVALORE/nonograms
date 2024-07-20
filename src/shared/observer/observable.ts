import { type Observer } from './observer';

export abstract class Observable<T> {
  private readonly observers: Observer<T>[] = [];

  public attach(observer: Observer<T>): void {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }

  public detach(observer: Observer<T>): void {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  public notify(value: T): void {
    this.observers.forEach((observer) => {
      observer.update(value);
    });
  }
}
