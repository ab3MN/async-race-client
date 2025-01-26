import { IWinner } from '../../Types/Winners';
import CarTableIcon from '../Icons/CarTableIcon';

interface IWinnerItem {
  (idx: number, color: string, name: string, winner: IWinner): string;
}

const WinnerItem: IWinnerItem = (idx, color, name, { wins, time }) => {
  const icon = CarTableIcon(color).innerHTML;
  return `
    <tbody>
        <tr>
            <th>${idx}</th>
            <th>${icon}</th>
            <th>${name}</th>
            <th>${wins}</th>
            <th>${time}</th>
        </tr>
    </tbody>`;
};
export default WinnerItem;
