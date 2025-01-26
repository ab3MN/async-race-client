import { createDomNode } from '../../utils/createDomNodes';
import ArrowIcon from '../Icons/ArrowIcon';

const WinnersTableHead = () => {
  const table = createDomNode('table', ['winner__table']);
  table.innerHTML = `
            <thead>
                <th>Number</th>
                <th>Car</th>
                <th>Name</th>
                <th id="wins__sort"><button class="sort__button" data-sort="wins">Wins ${ArrowIcon()}</button></th>
                <th id="times__sort"><button class="sort__button" data-sort="time">Best time (sec) ${ArrowIcon()}</button></th>`;
  return table;
};

export default WinnersTableHead;
