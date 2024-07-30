export abstract class Observable<T> {
  private readonly observers: ((value: T) => void)[] = [];

  public subscribe(observer: (value: T) => void): void {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }

  public unsubscribe(observer: (value: T) => void): void {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  public notify(value: T): void {
    this.observers.forEach((observer) => {
      observer(value);
    });
  }
}
