export interface IDomNode {
  (
    node: string,
    cssClasses: string[],
    parentNode?: HTMLElement,
    txt?: string,
    onClick?: (e: unknown) => void
  ): HTMLElement;
}
export interface IInput {
  (
    attributes: { [key: string]: string }[],
    onChange: (e: Event) => void,
    cssClasses: string[],
    parentNode?: HTMLElement
  ): HTMLInputElement;
}
