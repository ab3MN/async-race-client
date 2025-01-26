import { ICar, IEngine } from '../Types/Cars';
export declare const getGarageLength: () => Promise<number>;
export declare const getCars: (page?: number, limit?: number) => Promise<ICar[]>;
export declare const getCar: (id: number) => Promise<ICar>;
export declare const createCar: (car: {
    name: string;
    color: string;
}) => Promise<ICar>;
export declare const deleteCar: (id: number) => Promise<boolean | number>;
export declare const updateCar: (id: number, car: {
    [key: string]: string;
}) => Promise<ICar>;
export declare const startEngine: (id: number) => Promise<IEngine>;
export declare const stopEngine: (id: number) => Promise<IEngine>;
export declare const switchEngine: (id: number) => Promise<boolean>;
