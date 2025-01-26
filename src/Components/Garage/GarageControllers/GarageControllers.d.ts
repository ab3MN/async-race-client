interface IGarageControllers {
    (parentNode: HTMLElement, start: () => void, reset: () => void, create: () => void): void;
}
declare const GarageControllers: IGarageControllers;
export default GarageControllers;
