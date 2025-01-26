import { IWinner } from '../../Types/Winners';
interface IWinnerItem {
    (idx: number, color: string, name: string, winner: IWinner): string;
}
declare const WinnerItem: IWinnerItem;
export default WinnerItem;
