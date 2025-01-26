import './RaceControllers.scss';
interface IRaceControllers {
    root: HTMLBodyElement;
}
export default class RaceControllers implements IRaceControllers {
    root: HTMLBodyElement;
    protected container: HTMLDivElement;
    protected garageButton: HTMLButtonElement;
    protected showWinnersButton: HTMLButtonElement;
    constructor();
    generateControllers(): void;
    createButtonContainer(section: HTMLElement): void;
}
export {};
