import { getCar } from '../../Api/fetchCars';
import { getWinners, getWinnersLength } from '../../Api/fetchWinners';
import { IWinner } from '../../Types/Winners';
import sortWinnersEvents from './sorrtWinnersEvents';
import WinnerItem from './WinnerItem';
import WinnersTableHead from './WinnersTableHead';

import './Winners.scss';
import { createDomNode } from '../../utils/createDomNodes';
import WinnersHead from './WinnersHead';
import Pagination from '../Pagination/Pagination';

interface IWinners {
  container: HTMLElement;
  winners: IWinner[];
}

class Winners implements IWinners {
  table: HTMLElement;

  container: HTMLDivElement;

  winners: IWinner[];

  body: HTMLElement;

  private page: number = 1;

  private totalPages: number = 0;

  private allWinners: number = 0;

  private typeOfSort: 'id' | 'wins' | 'time' = 'wins';

  private order: 'ASC' | 'DESC' = 'ASC';

  async generateWinners(container: HTMLDivElement) {
    this.container = container;
    this.container.innerHTML = '';

    const { page, typeOfSort, order } = this;

    this.winners = await getWinners(page, typeOfSort, order, 10);

    this.allWinners = await getWinnersLength();
    this.totalPages = Math.ceil(this.allWinners / 10);

    const header = WinnersHead(page, this.allWinners);

    this.container.innerHTML = header;

    this.table = WinnersTableHead();

    this.body = createDomNode('tbody', ['winner__container'], this.table);
    this.body.innerHTML = await this.createWinners();

    this.container.append(this.table);

    Pagination(
      this.container,
      this.prevPage.bind(this),
      this.nextPage.bind(this),
      page,
      this.totalPages
    );

    sortWinnersEvents(this.sortWinners.bind(this));
  }

  async createWinners(): Promise<string> {
    try {
      let template = '';
      await Promise.all(
        this.winners.map(async (el) => {
          const car = await getCar(el.id);
          return { ...car, ...el };
        })
      ).then((winners) => {
        template += winners
          .map((el, i) => WinnerItem(i + 1, el.color, el.name, el))
          .join('');
      });

      return template;
    } catch (e: unknown) {
      console.log(e);
    }
    return '';
  }

  async sortWinners(e: MouseEvent) {
    const button = <HTMLButtonElement>e.target;

    const sort = button.dataset.sort as 'wins' | 'time';

    if (!sort) return;

    if (this.typeOfSort !== sort) {
      this.typeOfSort = sort;
      button.classList.add('active');
      await this.rerenderTable();
      return;
    }
    if (this.order === 'ASC') {
      this.order = 'DESC';
      await this.rerenderTable();
      button.classList.remove('active');
    } else {
      this.order = 'ASC';
      await this.rerenderTable();
      button.classList.add('active');
    }
  }

  async rerenderTable() {
    const { page, typeOfSort, order } = this;

    this.winners = await getWinners(page, typeOfSort, order);
    this.body.innerHTML = await this.createWinners();
  }

  prevPage = () => {
    if (this.page === 1) return;
    this.page -= 1;
    this.generateWinners(this.container);
  };

  nextPage = () => {
    if (this.page === this.totalPages) return;
    this.page += 1;
    this.generateWinners(this.container);
  };
}

const winners = new Winners();

export default winners;
