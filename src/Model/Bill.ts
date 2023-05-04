import {Cart} from "./Cart";
import {Gender} from "./User";
import {randomUUID} from "crypto";
import {
    brightYellow, resetEffect,
    brightGreen, borderBLue, repeatSpaceLong
} from "../ConsoleMessenger/ConsoleMessenger";

export class Bill {
    private readonly _code: string = randomUUID();
    private readonly _dayCreat: string = new Date().toLocaleString();
    private readonly _infoProducts: Cart;
    private readonly _clientName: string;
    private readonly _clientGender: Gender;
    private readonly _clientPhoneNumber: string;
    private readonly _clientAddress: string;

    constructor(infoProducts: Cart, clientName: string, clientGender: Gender, clientPhoneNumber: string, clientAddress: string) {
        this._infoProducts = infoProducts;
        this._clientName = clientName;
        this._clientGender = clientGender;
        this._clientPhoneNumber = clientPhoneNumber;
        this._clientAddress = clientAddress;
    }

    getCode(): string {
        return this._code;
    }

    getDayCreat(): string {
        return this._dayCreat;
    }

    getInfoProducts(): Cart {
        return this._infoProducts;
    }

    getClientName(): string {
        return this._clientName;
    }

    getClientGender(): Gender {
        return this._clientGender;
    }

    getClientPhoneNumber(): string {
        return this._clientPhoneNumber;
    }

    getClientAddress(): string {
        return this._clientAddress;
    }

    showDetailBill() {
        console.log(borderBLue);
        console.log(brightYellow + repeatSpaceLong + 'DETAIL OF BILL' + repeatSpaceLong + resetEffect);
        console.log(borderBLue);
        console.log(`${brightGreen}Bill Code:${resetEffect} ${this.getCode()}`);
        console.log(`${brightGreen}Day Creat:${resetEffect} ${this.getDayCreat()}`);
        console.log(`${brightGreen}Client Name:${resetEffect} ${this.getClientName()}`);
        console.log(`${brightGreen}Client Gender:${resetEffect} ${this.getClientGender()}`);
        console.log(`${brightGreen}Client PhoneNumber:${resetEffect} ${this.getClientPhoneNumber()}`);
        console.log(`${brightGreen}Client Address:${resetEffect} ${this.getClientAddress()}`);
        console.log(`${brightGreen}Info Products Buy:${resetEffect}`)
        console.table(this.getInfoProducts().showCart());
        console.log(`${brightGreen}Total Value Of Bill:${resetEffect} ${this.getInfoProducts().getTotalCost()} VND`);
        console.log(borderBLue);
    }
}