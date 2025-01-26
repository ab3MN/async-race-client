import { createDomNode } from '../utils/createDomNodes';
import './RaceControllers.scss';

interface IRaceControllers {
  root: HTMLBodyElement;
}

export default class RaceControllers implements IRaceControllers {
  root: HTMLBodyElement;

  protected container: HTMLDivElement;

  protected garageButton: HTMLButtonElement;

  protected showWinnersButton: HTMLButtonElement;

  constructor() {
    this.root = <HTMLBodyElement>document.querySelector('#root');
    this.container = <HTMLDivElement>createDomNode('div', ['container']);
    this.generateControllers();
  }

  generateControllers() {
    const main = createDomNode('main', ['main'], this.root);
    const section = createDomNode('section', ['section'], main);
    this.createButtonContainer(section);

    section.append(this.container);

    this.root.append(main);
  }

  createButtonContainer(section: HTMLElement) {
    const raceController = <HTMLDivElement>(
      createDomNode('div', ['race__controller'], section)
    );
    this.garageButton = <HTMLButtonElement>(
      createDomNode('button', ['button'], raceController, 'to garage')
    );
    this.showWinnersButton = <HTMLButtonElement>(
      createDomNode('button', ['button'], raceController, 'to winners')
    );
  }
}
