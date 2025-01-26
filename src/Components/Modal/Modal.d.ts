import './Modal.scss';
interface IModal {
    classes?: string[];
}
type ContentType = HTMLElement | string;
declare class Modal implements IModal {
    classes?: string[] | undefined;
    private modal;
    private modalContent;
    private backdrop;
    constructor(classes?: string[]);
    genereateModal(content: ContentType): void;
    createDomNode(el: string, classes?: string): HTMLElement;
    setContent(content: ContentType): void;
    handleKeyPress(e: KeyboardEvent): void;
    handleBackdropClick(e: MouseEvent): void;
    handleClose(): void;
    handleOpen(): void;
    appendModalElements(): void;
}
declare const modal: Modal;
export default modal;
