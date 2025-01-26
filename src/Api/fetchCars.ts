import { ICar, IEngine } from '../Types/Cars';

const BASE_URL = 'https://async-race-server-production-f64f.up.railway.app/';

export const getGarageLength = async (): Promise<number> => {
  const res = await fetch(`${BASE_URL}garage`);
  const data: ICar[] = await res.json();

  return data.length;
};

export const getCars = async (page = 1, limit = 7): Promise<ICar[]> => {
  const res = await fetch(`${BASE_URL}garage?_page=${page}&_limit=${limit}`);
  const data: ICar[] = await res.json();

  return data;
};

export const getCar = async (id: number): Promise<ICar> => {
  const res = await fetch(`${BASE_URL}garage/${id}`);
  const data: ICar = await res.json();
  return data;
};

export const createCar = async (car: {
  name: string;
  color: string;
}): Promise<ICar> => {
  const res = await fetch(`${BASE_URL}garage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(car),
  });

  const data: ICar = await res.json();
  return data;
};

export const deleteCar = async (id: number): Promise<boolean | number> => {
  try {
    const { status } = await fetch(`${BASE_URL}garage/${id}`, {
      method: 'DELETE',
    });
    return status;
  } catch (e: unknown) {
    console.log(e);
  }
  return false;
};

export const updateCar = async (
  id: number,
  car: { [key: string]: string }
): Promise<ICar> => {
  const res = await fetch(`${BASE_URL}garage/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(car),
  });
  const data: ICar = await res.json();
  return data;
};

export const startEngine = async (id: number): Promise<IEngine> => {
  const res = await fetch(`${BASE_URL}engine?id=${id}&status=started`, {
    method: 'PATCH',
  });
  const data: IEngine = await res.json();
  return data;
};

export const stopEngine = async (id: number): Promise<IEngine> => {
  const res = await fetch(`${BASE_URL}engine?id=${id}&status=stopped`, {
    method: 'PATCH',
  });
  const data: IEngine = await res.json();
  return data;
};

export const switchEngine = async (id: number): Promise<boolean> => {
  const { status } = await fetch(`${BASE_URL}engine?id=${id}&status=drive`, {
    method: 'PATCH',
  });

  return status === 200;
};
