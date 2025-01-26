import { createDomNode } from '../../../utils/createDomNodes';

interface IGarageControllers {
  (
    parentNode: HTMLElement,
    start: () => void,
    reset: () => void,
    create: () => void
  ): void;
}

const GarageControllers: IGarageControllers = (
  parentNode,
  start,
  reset,
  create
) => {
  const container = createDomNode(
    'div',
    ['race__controllers--container'],
    parentNode
  );
  createDomNode('button', ['race__button'], container, 'race', start).id =
    'start__race';
  createDomNode('button', ['race__button'], container, 'reset', reset).id =
    'reset__race';

  createDomNode(
    'button',
    ['race__button'],
    container,
    'generate cars',
    create
  ).id = 'create__cars';
  parentNode.append(container);
};

export default GarageControllers;
