import { ICar } from '../../../Types/Cars';
import './GarageItem.scss';
interface IGarageItem {
    (parentNode: HTMLElement, car: ICar, onSelect: (id: number) => void, onRemove: (id: number) => void, onStart: (e: unknown, id: number) => void, onReset: (e: unknown, id: number) => void): void;
}
declare const GarageItem: IGarageItem;
export default GarageItem;
