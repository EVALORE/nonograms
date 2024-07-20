export class StaticGrid<DataType> {
  private readonly width: number;
  private readonly height: number;
  private readonly grid: (DataType | null)[];

  constructor(width: number, height = 1) {
    this.width = width;
    this.height = height;
    this.grid = new Array<DataType | null>(width * height);
  }

  public setData(value: DataType, xCoord: number, yCoord = 0): void {
    const DataIndex = this.calculateIndex(xCoord, yCoord);
    if (DataIndex === -1) {
      return;
    }
    this.grid[this.calculateIndex(xCoord, yCoord)] = value;
  }

  public getData(xCoord: number, yCoord = 0): DataType | null {
    const DataIndex = this.calculateIndex(xCoord, yCoord);
    if (DataIndex === -1) {
      return null;
    }
    const DataValue = this.grid[DataIndex];
    return DataValue!;
  }

  public getAllData(): DataType[] {
    return this.grid as DataType[];
  }

  public fill(value: DataType): void {
    this.grid.fill(value);
  }

  public forEach(
    callbackfn: (value: DataType | null, index: number, grid: (DataType | null)[]) => void,
  ): void {
    this.grid.forEach(callbackfn);
  }

  public clearData(xCoord: number, yCoord = 0): void {
    const DataIndex = this.calculateIndex(xCoord, yCoord);
    if (DataIndex === -1) {
      return;
    }
    this.grid[DataIndex] = null;
  }

  private validateXCoordinate(xCoord: number): boolean {
    if (xCoord < 0 || xCoord >= this.width) {
      return false;
    }
    return true;
  }

  private validateYCoordinate(yCoord: number): boolean {
    if (yCoord < 0 || yCoord >= this.height) {
      return false;
    }
    return true;
  }

  private calculateIndex(xCoord: number, yCoord = 0): number {
    if (this.validateXCoordinate(xCoord) || this.validateYCoordinate(yCoord)) {
      return yCoord * this.width + xCoord;
    }
    console.warn('Coordinates out of bounds');
    return -1;
  }
}
