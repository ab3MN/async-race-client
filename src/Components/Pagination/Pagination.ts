import { createDomNode } from '../../utils/createDomNodes';

const Pagination = (
  parent: HTMLDivElement,
  onPrev: () => void,
  onNext: () => void,
  currentPage: number,
  totalPage: number
) => {
  const container = <HTMLButtonElement>(
    createDomNode('div', ['pagination__container'], parent)
  );
  const prev = <HTMLButtonElement>(
    createDomNode('button', ['button'], container, 'prev', onPrev)
  );
  const next = <HTMLButtonElement>(
    createDomNode('button', ['button'], container, 'next', onNext)
  );

  prev.disabled = currentPage === 1 || currentPage === 0;
  next.disabled =
    (currentPage === 1 && totalPage === 0) || currentPage === totalPage;
};

export default Pagination;
