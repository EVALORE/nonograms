import { BaseComponent } from '@shared/ui';

export class Table extends BaseComponent<'table'> {
  constructor() {
    super({ tagName: 'table' });
  }
}
