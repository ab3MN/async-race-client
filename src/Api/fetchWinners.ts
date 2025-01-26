import { IWinner } from '../Types/Winners';

const BASE_URL = 'https://async-race-server-production-f64f.up.railway.app/';

interface IFetchWinners {
  (
    page?: number,
    sort?: 'id' | 'wins' | 'time',
    order?: 'ASC' | 'DESC',
    limit?: number
  ): Promise<IWinner[]>;
}

export const getWinners: IFetchWinners = async (
  page?,
  sort?,
  order?,
  limit?
) => {
  const res = await fetch(
    `${BASE_URL}winners?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`
  );
  const data: IWinner[] = await res.json();

  return data;
};

export const getWinnersLength = async () => {
  const res = await fetch(`${BASE_URL}winners`);
  const data: IWinner[] = await res.json();

  return data.length;
};

export const getWinner = async (id: number): Promise<IWinner> => {
  const res = await fetch(`${BASE_URL}winners/${id}`);
  const data: IWinner = await res.json();
  return data;
};

export const createWinner = async (winner: IWinner) => {
  const res = await fetch(`${BASE_URL}winners`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(winner),
  });

  const data: IWinner = await res.json();
  return data;
};

export const deleteWinner = async (id: number): Promise<number> => {
  const { status } = await fetch(`${BASE_URL}winners/${id}`, {
    method: 'DELETE',
  });
  return status;
};

interface IUpdateWinners {
  (id: number, winner: { wins: number; time: number }): Promise<IWinner>;
}

export const updateWinner: IUpdateWinners = async (id, winner) => {
  const res = await fetch(`${BASE_URL}winners/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(winner),
  });
  const data: IWinner = await res.json();
  return data;
};
