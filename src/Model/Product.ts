import {randomUUID} from "crypto";


export class Product {
    private _id: string = randomUUID();
    private _name: string;
    private _cost: number;
    private _quantity: number;
    private _describe: string;

    constructor(name: string, cost: number, quantity: number, describe: string) {
        this._name = name;
        this._cost = cost;
        this._quantity = quantity;
        this._describe = describe;
    }

    getId(): string {
        return this._id;
    }

    getName(): string {
        return this._name;
    }

    setName(value: string) {
        this._name = value;
    }

    getCost(): number {
        return this._cost;
    }

    setCost(value: number) {
        this._cost = value;
    }

    getQuantity(): number {
        return this._quantity;
    }

    setQuantity(value: number) {
        this._quantity = value;
    }

    // getDescribe(): string {
    //     return this._describe;
    // }

    setDescribe(value: string) {
        this._describe = value;
    }
}