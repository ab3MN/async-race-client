const getButton = (selector = '') =>
  <HTMLButtonElement>document.querySelector(`${selector}`);

export const toogleStopButton = (disabled: boolean) => {
  document.querySelectorAll('.car__stop--button').forEach((el) => {
    const button = <HTMLButtonElement>el;
    button.disabled = disabled;
  });
};

export const toogleStarButton = (disabled: boolean) => {
  document.querySelectorAll('.car__start--button').forEach((el) => {
    const button = <HTMLButtonElement>el;
    button.disabled = disabled;
  });
};
export const toogleStartRaceButton = (disabled: boolean) => {
  const startRace = getButton('#start__race');
  startRace.disabled = disabled;
};

export const toogleResetRaceButton = (disabled: boolean) => {
  const startRace = getButton('#reset__race');
  startRace.disabled = disabled;
};

export const toogleGarageControlls = (disabled: boolean) => {
  const createCars = getButton('#create__cars');
  const createCar = getButton('.create__button');

  const updateCar = getButton('.update_button');

  document.querySelectorAll('.car__start--button').forEach((el) => {
    const button = <HTMLButtonElement>el;
    button.disabled = disabled;
  });

  toogleResetRaceButton(disabled);
  toogleStarButton(disabled);
  toogleStopButton(!disabled);
  toogleStartRaceButton(disabled);
  createCars.disabled = disabled;
  createCar.disabled = disabled;
  updateCar.disabled = disabled;
};
