import { ICar } from '../../../Types/Cars';
import { createDomNode, createInput } from '../../../utils/createDomNodes';
import CarIcon from '../../Icons/CarIcon';
import FlagIcon from '../../Icons/FlagIcon';

import './GarageItem.scss';

interface IGarageItem {
  (
    parentNode: HTMLElement,
    car: ICar,
    onSelect: (id: number) => void,
    onRemove: (id: number) => void,
    onStart: (e: unknown, id: number) => void,
    onReset: (e: unknown, id: number) => void
  ): void;
}

const GarageItem: IGarageItem = (
  parentNode,
  car,
  onSelect,
  onRemove,
  onStart,
  onReset
) => {
  const { name, id, color } = car;
  const item = createDomNode('li', ['garage__item'], parentNode);

  /* ==================== HEAD ==================== */
  const head = createDomNode('div', ['garage__item--head'], item);

  createInput(
    [
      {
        name: 'select',
        type: 'radio',
        value: String(id),
        id: `select__${id}`,
      },
    ],
    () => onSelect(id),
    ['select__input'],
    head
  );

  createDomNode(
    'button',
    ['button', 'garage__item--button'],
    head,
    'remove',
    () => onRemove(id)
  );

  createDomNode('h4', ['garage__item--name'], head, name);

  /* ==================== BODY ==================== */
  const body = createDomNode('div', ['garage__item--body'], item);

  const carContainer = createDomNode('div', ['car__container'], body);
  createDomNode(
    'button',
    ['button', 'car__start--button'],
    carContainer,
    'A',
    (e: unknown) => onStart(e, id)
  );
  (<HTMLButtonElement>(
    createDomNode(
      'button',
      ['button', 'car__stop--button'],
      carContainer,
      'B',
      (e: unknown) => onReset(e, id)
    )
  )).disabled = true;

  CarIcon(color, carContainer, id);
  const flagContainer = createDomNode('div', ['flag__container'], body);

  FlagIcon(flagContainer, id);

  return item;
};

export default GarageItem;
