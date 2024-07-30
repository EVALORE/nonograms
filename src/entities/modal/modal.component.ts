import { BaseComponent, div, h5 } from '@control.ts/min';

export class ModalComponent extends BaseComponent<HTMLDivElement> {
  private readonly modalWrapper = div({ className: 'modal-background' });
  private readonly modalContent: HTMLDivElement;

  constructor(context: string, title: string, content: string | HTMLElement) {
    super({});
    this.modalContent = div(
      { className: `${context}-modal` },
      h5({ txt: title }, typeof content === 'string' ? div({ txt: content }) : content),
    );

    this.appendChildren([this.modalWrapper, this.modalContent]);
  }
}
