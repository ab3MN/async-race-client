const CAR_NAMES = [
  'Honda',
  'Nissan',
  'Toyota',
  'Ford',
  'Hyundai',
  'Chevrole',
  'Nissan',
  'Tesla',
  'Subaru',
  'Jeep',
  'Chevy',
  'GMC',
  'Ram',
];

const CAR_MODELS = [
  'Accord',
  'Altima',
  'Camry',
  'Fusion',
  'Sonata',
  'Equinox',
  'Rogue',
  'Model 3',
  'Outback',
  'Wrangler',
  'Equinox',
  'Sierra',
  'Pickup',
];

const getRandomItemFromArr = (arr: unknown[]): unknown =>
  arr[Math.floor(Math.random() * arr.length)];

const getRandomLightColor = (): string => {
  const letters = ['b', 'c', 'd', 'e', 'f'];
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += getRandomItemFromArr(letters);
  }
  return color;
};

const createRandomCars = () => {
  const cars = [];
  for (let i = 0; i < 100; i += 1) {
    const name = `${getRandomItemFromArr(CAR_NAMES)} ${getRandomItemFromArr(CAR_MODELS)}`;
    const color = getRandomLightColor();
    cars.push({ name, color });
  }
  return cars;
};

export default createRandomCars;
