const sortWinnersEvents = (onSort: (e: MouseEvent) => void) => {
  const wins = <HTMLElement>document.querySelector('#wins__sort');
  const time = <HTMLElement>document.querySelector('#times__sort');

  wins.addEventListener('click', (e: MouseEvent) => onSort(e));

  time.addEventListener('click', (e: MouseEvent) => onSort(e));
};

export default sortWinnersEvents;
