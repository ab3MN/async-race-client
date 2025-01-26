import { IDomNode, IInput } from './NodeTypes';

export const createDomNode: IDomNode = (
  node,
  cssClasses,
  parentNode?,
  txt?,
  onClick?: (e: MouseEvent) => void
) => {
  const domNode = <HTMLElement>document.createElement(node);
  cssClasses.forEach((className) => domNode.classList.add(className));

  if (txt) domNode.innerText = txt;
  if (onClick) domNode.addEventListener('click', (e: MouseEvent) => onClick(e));
  if (parentNode) parentNode.append(domNode);

  return domNode;
};

export const createInput: IInput = (
  attributes,
  onChange,
  cssClasses,
  parentNode?
) => {
  const input = <HTMLInputElement>(
    createDomNode('input', cssClasses, parentNode)
  );

  attributes.forEach((attribute) => {
    Object.entries(attribute).forEach(([key, value]) => {
      input.setAttribute(key, value);
    });
  });

  input.addEventListener('change', (e: Event) => onChange(e));

  return input;
};
