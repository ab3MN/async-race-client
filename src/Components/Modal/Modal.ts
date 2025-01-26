import { allowScroll, blockScroll } from '../../utils/scroll';
import './Modal.scss';

interface IModal {
  classes?: string[];
}
type ContentType = HTMLElement | string;

class Modal implements IModal {
  classes?: string[] | undefined;

  private modal: HTMLElement;

  private modalContent: HTMLElement;

  private backdrop: HTMLElement;

  constructor(classes?: string[]) {
    this.classes = classes;
  }

  genereateModal(content: ContentType): void {
    this.backdrop = this.createDomNode('div', 'backdrop');
    this.modal = this.createDomNode('div', 'modal');
    this.modalContent = <HTMLDivElement>(
      this.createDomNode('div', 'modal__content')
    );

    this.setContent(content);
    this.appendModalElements();
    this.handleOpen();
  }

  createDomNode(el: string, classes = ''): HTMLElement {
    const domElement = document.createElement(el);
    domElement.classList.add(classes);
    return domElement;
  }

  setContent(content: ContentType) {
    if (typeof content === 'string') {
      this.modalContent.innerHTML = content;
    } else {
      this.modalContent.innerHTML = '';
      this.modalContent.append(content);
    }
  }

  handleKeyPress(e: KeyboardEvent) {
    if (e.code === 'Escape') {
      this.handleClose();
    }
  }

  handleBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      this.handleClose();
    }
  }

  handleClose() {
    this.backdrop.remove();
    window.removeEventListener('keydown', this.handleKeyPress.bind(this));

    this.backdrop.removeEventListener(
      'click',
      this.handleBackdropClick.bind(this)
    );

    allowScroll();
  }

  handleOpen() {
    document.body.append(this.backdrop);
    window.addEventListener('keydown', this.handleKeyPress.bind(this));

    this.backdrop.addEventListener(
      'click',
      this.handleBackdropClick.bind(this)
    );
    blockScroll();
  }

  appendModalElements() {
    this.modal.append(this.modalContent);
    this.backdrop.append(this.modal);
  }
}

const modal = new Modal();
export default modal;
