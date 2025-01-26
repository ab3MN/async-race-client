import { IWinner } from '../Types/Winners';
interface IFetchWinners {
    (page?: number, sort?: 'id' | 'wins' | 'time', order?: 'ASC' | 'DESC', limit?: number): Promise<IWinner[]>;
}
export declare const getWinners: IFetchWinners;
export declare const getWinnersLength: () => Promise<number>;
export declare const getWinner: (id: number) => Promise<IWinner>;
export declare const createWinner: (winner: IWinner) => Promise<IWinner>;
export declare const deleteWinner: (id: number) => Promise<number>;
interface IUpdateWinners {
    (id: number, winner: {
        wins: number;
        time: number;
    }): Promise<IWinner>;
}
export declare const updateWinner: IUpdateWinners;
export {};
