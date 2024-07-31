import { beforeEach, describe, expect, it } from 'vitest';
import { ModalComponent } from './modal.component';

describe('test modal component', () => {
  let modal: ModalComponent;

  beforeEach(() => {
    modal = new ModalComponent('modal', 'title', 'content');
  });

  it('should render the modal component with string content', () => {
    const expectedContent =
      '<div class="modal-background"></div><div class="modal-modal"><h5>title</h5><div>content</div></div>';
    expect(modal.node.innerHTML).toBe(expectedContent);
  });

  it('should match the snapshot', () => {
    expect(modal.node).toMatchSnapshot();
  });
});
