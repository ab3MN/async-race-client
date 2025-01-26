import { IWinner } from '../../Types/Winners';
import './Winners.scss';
interface IWinners {
    container: HTMLElement;
    winners: IWinner[];
}
declare class Winners implements IWinners {
    table: HTMLElement;
    container: HTMLDivElement;
    winners: IWinner[];
    body: HTMLElement;
    private page;
    private totalPages;
    private allWinners;
    private typeOfSort;
    private order;
    generateWinners(container: HTMLDivElement): Promise<void>;
    createWinners(): Promise<string>;
    sortWinners(e: MouseEvent): Promise<void>;
    rerenderTable(): Promise<void>;
    prevPage: () => void;
    nextPage: () => void;
}
declare const winners: Winners;
export default winners;
