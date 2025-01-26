import {
  createCar,
  deleteCar,
  getCars,
  getGarageLength,
  startEngine,
  stopEngine,
  switchEngine,
  updateCar,
} from '../../Api/fetchCars';
import { ICar, ICarEngine } from '../../Types/Cars';
import { createDomNode, createInput } from '../../utils/createDomNodes';
import RaceControllers from '../RaceControllers';
import winners from '../Winners/Winners';
import GarageItem from './GarageItem/GarageItem';
import './Garage.scss';
import {
  createWinner,
  deleteWinner,
  getWinner,
  updateWinner,
} from '../../Api/fetchWinners';
import createRandomCars from '../../utils/createRandomCars';
import { getElementsDistance } from '../../utils/getElementsDistance';
import modal from '../Modal/Modal';
import Pagination from '../Pagination/Pagination';
import GarageControllers from './GarageControllers/GarageControllers';
import {
  toogleGarageControlls,
  toogleResetRaceButton,
  toogleStartRaceButton,
} from './toogleGarageControlls';

class Garage extends RaceControllers {
  private garage: ICar[] = [];

  private carsCounter: number = 0;

  private createState: { [key: string]: string } = {
    color: '#e66465',
  };

  private updateState: { [key: string]: string } = {
    color: '#e66465',
  };

  private selectedCar: number | null = null;

  private page: number = 1;

  private totalPages: number = 0;

  private carlist: HTMLElement;

  private garageInfo: HTMLElement;

  private selectedCarInput: HTMLInputElement;

  private winners: number[] = [];

  private animations: { id: number; animation: Animation }[] = [];

  constructor() {
    super();
    this.garageButton.onclick = this.handleOpenGarage.bind(this);
    this.showWinnersButton.onclick = this.showWinners.bind(this);
  }

  private generateGarage() {
    this.container.innerHTML = '';
    this.garageInfo = createDomNode('div', ['garage'], this.container);

    this.createGarageInfo();
    this.createGarageControllers();
    this.createCarList();

    Pagination(
      this.container,
      this.prevPage.bind(this),
      this.nextPage.bind(this),
      this.page,
      this.totalPages
    );

    this.getSelectedInput();
  }

  /* ==================== CreateElements ==================== */

  private createGarageInfo() {
    this.garageInfo.innerHTML = `
    <h2>Garage: (<span class="garage__span">${this.carsCounter}</span>)</h2>
    <h3>Page <span class="garage__span">#${this.page}</span></h3>
  `;
  }

  private createGarageControllers() {
    const controllers = createDomNode(
      'article',
      ['garage__controllers'],
      this.container
    );
    this.createCarInputs(controllers);

    GarageControllers(
      controllers,
      this.startRace.bind(this),
      this.resetRace.bind(this),
      this.createCars.bind(this)
    );

    const carsContainer = createDomNode(
      'article',
      ['cars__container'],
      this.container
    );

    this.carlist = createDomNode('ul', ['garage__list'], carsContainer);
  }

  private createCarInputs(parentNode: HTMLElement) {
    const createContainer = createDomNode(
      'div',
      ['garage__controllers--container'],
      parentNode
    );

    [
      {
        name: 'name',
        type: 'text',
        method: 'post',
        value: this.createState.name,
      },
      {
        name: 'color',
        type: 'color',
        value: this.createState.color,
        method: 'post',
      },
    ].forEach((el) => this.createControlInput(createContainer, el));
    createDomNode(
      'button',
      ['button', 'create__button'],
      createContainer,
      'create',
      this.createCar.bind(this)
    );

    const updateContainer = createDomNode(
      'div',
      ['garage__controllers--container'],
      parentNode
    );

    [
      {
        name: 'name',
        type: 'text',
        method: 'put',
        value: this.updateState.name,
      },
      {
        name: 'color',
        type: 'color',
        value: this.updateState.color,
        method: 'put',
      },
    ].forEach((el) => this.createControlInput(updateContainer, el));
    createDomNode(
      'button',
      ['button', 'update_button'],
      updateContainer,
      'update',
      this.updateCar.bind(this)
    );
  }

  private createControlInput(
    parentNode: HTMLElement,
    { name = '', type = '', method = '', value = '' }
  ) {
    createInput(
      [{ type, name, method, value }],
      this.onChange.bind(this),
      ['input', 'garage__input'],
      parentNode
    );
  }

  private createCarList() {
    this.carlist.innerHTML = '';

    this.garage.forEach((car) => {
      GarageItem(
        this.carlist,
        car,
        (id: number) => this.selectCar.apply(this, [id]),
        (id: number) => this.removeCar.apply(this, [id]),
        (e: unknown, id: number) => this.startCarEngine.apply(this, [e, id]),
        (e: unknown, id: number) => this.stopCar.apply(this, [e, id])
      );
    });
  }

  private getDistanceBetweenCarAndFinish(id: number) {
    return getElementsDistance(
      <HTMLElement>document.querySelector(`.car__${id}`),
      <HTMLElement>document.querySelector(`.flag__${id}`)
    );
  }

  private resetState(type = 'create') {
    type === 'update'
      ? ((this.updateState = { color: '#e66465', name: '' }),
        (this.selectedCar = null))
      : (this.createState = { color: '#e66465', name: '' });
  }

  private animateDriveCar({ id, velocity, distance }: ICarEngine) {
    const car = <HTMLElement>document.querySelector(`.car__${id}`);

    const finishDistance = this.getDistanceBetweenCarAndFinish(id);

    const animation = car.animate(
      [
        { transform: 'translateX(0px)' },
        { transform: `translateX(${finishDistance}px)` },
      ],
      { duration: distance / velocity, fill: 'forwards' }
    );

    return animation;
  }

  private animateStopCar(id: number) {
    const car = <HTMLElement>document.querySelector(`.car__${id}`);

    car.animate([{}, { transform: 'translateX(0px)' }], {
      duration: 0,
      fill: 'forwards',
    });
  }

  private async saveWinner(id: number, velocity: number, distance: number) {
    this.winners.push(id);
    if (this.winners.length > 1) return;

    const currentTime = Math.floor(distance / velocity) / 1000;
    const { wins, time } = await getWinner(id);
    this.showWinner(id, currentTime);

    !wins
      ? await createWinner({ id, wins: 1, time: currentTime })
      : await updateWinner(id, {
          wins: wins + 1,
          time: currentTime < time ? currentTime : time,
        });
    toogleResetRaceButton(false);
  }

  private showWinner(id: number, time: number) {
    const winner = this.garage.find((el) => el.id === id);
    if (winner) {
      modal.genereateModal(`<h3 class="race__result">The ${winner.name} has won,its time is ${time}</h3>
      `);
    }
  }

  /* ==================== LISTENERS ==================== */
  onChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    if (input) {
      const { value, name } = input;
      const method = input.getAttribute('method');
      if (method) {
        method === 'post'
          ? (this.createState[name] = value)
          : (this.updateState[name] = value);
      }
    }
  };

  handleOpenGarage = async () => {
    this.garage = await getCars(this.page);
    this.carsCounter = await getGarageLength();

    this.totalPages = Math.ceil(this.carsCounter / 7);
    this.generateGarage();
  };

  showWinners = () => {
    winners.generateWinners(this.container);
  };

  createCar = async () => {
    try {
      const { name, color } = this.createState;

      await createCar({ name, color });
      this.handleOpenGarage();
    } catch (e: unknown) {
      console.error(e);
    }
    this.resetState();
  };

  updateCar = async () => {
    try {
      const { name, color } = this.updateState;
      if (!this.selectedCar) return;
      const item: ICar | undefined = this.garage.find(
        (el) => el.id === this.selectedCar
      );
      const newCar = { color, name };
      if (item) {
        name ? (newCar.name = name) : (newCar.name = item?.name);

        const car = await updateCar(this.selectedCar, newCar);
        item.name = car.name ? car.name : item.name;
        item.color = car.color ? car.color : item.color;
      }

      this.createCarList();
    } catch (e: unknown) {
      console.error(e);
    }
    this.resetState('update');
  };

  startRace = () => {
    toogleGarageControlls(true);
    Promise.all(
      this.garage.map(async ({ id }) => ({ ...(await startEngine(id)), id }))
    )
      .then((res) =>
        res
          .map((el) => {
            const animation = <Animation>this.animateDriveCar(el);

            this.animations.push({ id: el.id, animation });
            return { animation, ...el };
          })
          .map(async (el) => ({ isDrived: await switchEngine(el.id), ...el }))
      )
      .then((promises) => {
        promises.forEach(async (promise) => {
          const { animation, isDrived, velocity, distance, id } = await promise;

          if (animation.playState === 'idle') return;

          !isDrived
            ? animation.pause()
            : await this.saveWinner(id, velocity, distance);
        });
      })
      .catch((error: unknown) => console.log(error))
      .finally(() => {
        this.winners = [];
      });
  };

  resetRace = async () => {
    try {
      const carId: number[] = await Promise.all(
        this.garage.map(async ({ id }) => {
          await stopEngine(id);
          return id;
        })
      );
      carId.forEach((id) => {
        this.animateStopCar(id);
        toogleGarageControlls(false);
      });
    } catch (error: unknown) {
      console.log(error);
    }
  };

  createCars = async () => {
    try {
      await Promise.all(
        createRandomCars().map(async (car) => {
          await createCar(car);
        })
      );
      await this.handleOpenGarage();
    } catch (error) {
      console.log(error);
    }
  };

  selectCar = (id: number) => {
    this.selectedCar = id;
    this.selectedCarInput = <HTMLInputElement>(
      document.querySelector(`#select__${this.selectedCar}`)
    );
  };

  removeCar = async (id: number) => {
    try {
      const isDeleted = await deleteCar(id);
      await deleteWinner(id);

      if (isDeleted === 200) {
        this.garage = this.garage.filter((el) => el.id !== id);
        if (this.garage.length === 0 && this.page !== 1) this.page -= 1;
        this.handleOpenGarage();
      }
    } catch (e: unknown) {
      console.log(e);
    }
  };

  startCarEngine = async (e: unknown, id: number) => {
    try {
      const { velocity, distance } = await startEngine(id);
      const button = this.getButtonByEvent(e);

      this.disabledControllsButton(e, 'start');

      toogleStartRaceButton(true);

      const animation = this.animateDriveCar({ id, velocity, distance });

      this.animations.push({ id, animation });
      const isDrived = await switchEngine(id);
      if (!isDrived) {
        animation.pause();
        button.disabled = false;
      }
    } catch (error: unknown) {
      console.log(error);
    }
  };

  stopCar = async (e: unknown, id: number) => {
    try {
      const car = this.animations.find((el) => el.id === id);

      if (car) car.animation.cancel();
      await stopEngine(id);

      this.winners = this.winners.filter((el) => el !== id);
      if (this.winners.length === 0) {
        toogleStartRaceButton(false);
        this.disabledControllsButton(e, 'stop');
      }
    } catch (error: unknown) {
      console.log(error);
    }
  };

  prevPage = () => {
    if (this.page === 1) return;
    this.page -= 1;
    this.handleOpenGarage();
  };

  nextPage = () => {
    if (this.page === this.totalPages) return;
    this.page += 1;
    this.handleOpenGarage();
  };

  getSelectedInput() {
    if (!this.selectedCarInput) return;

    this.selectedCarInput.checked = true;
  }

  disabledControllsButton(e: unknown, type: 'start' | 'stop') {
    const button = this.getButtonByEvent(e);

    button.disabled = true;
    if (type === 'start') {
      const stopButton = <HTMLButtonElement>button.nextElementSibling;
      stopButton.disabled = false;
    } else {
      const startButton = <HTMLButtonElement>button.previousElementSibling;
      startButton.disabled = false;
    }
  }

  getButtonByEvent(e: unknown) {
    const event = <MouseEvent>e;
    const button = <HTMLButtonElement>event.target;
    return button;
  }
}

const garage = new Garage();

export default garage;
