import {Cart} from "./Cart";
import {
    successUpdateAddress,
    successUpdateName,
    successUpdatePassword,
    successUpdatePhoneNumber
} from "../ConsoleMessenger/ConsoleMessenger";
import {BillsManager} from "../Manager/BillsManager";

export enum accountStatus {
    LOCKED,
    UNLOCK
}

export enum Gender {
    FEMALE = 'Female',
    MALE = 'Male'
}

export enum SecretQuestion {
    YOUR_HOBBY,
    YOUR_JOB,
    YOUR_COUNTRY,
    YOUR_PET,
    YOUR_BEST_FRIEND
}

export class User {
    private readonly _username: string;
    private _password: string;
    private readonly _secretQuestion: SecretQuestion;
    private readonly _secretAnswer: string;
    private _name: string;
    private _gender: Gender;
    private _phoneNumber: string;
    private _address: string;
    private _status: accountStatus = 1;
    private _paymentWallet: number = 0;
    private _cart: Cart = new Cart();
    private _billsList: BillsManager = new BillsManager();

    constructor(username: string, password: string, secretQuestion: SecretQuestion, secretAnswer: string,
                name: string, gender: Gender, phoneNumber: string, address: string) {
        this._username = username;
        this._password = password;
        this._secretQuestion = secretQuestion;
        this._secretAnswer = secretAnswer;
        this._name = name;
        this._gender = gender;
        this._phoneNumber = phoneNumber;
        this._address = address;
    }


    getUsername(): string {
        return this._username;
    }

    getPassword(): string {
        return this._password;
    }

    setPassword(value: string) {
        this._password = value;
        console.log(successUpdatePassword);
    }

    getSecretQuestion() {
        return this._secretQuestion;
    }

    getSecretAnswer() {
        return this._secretAnswer;
    }

    getName(): string {
        return this._name;
    }

    setName(value: string) {
        this._name = value;
        console.log(successUpdateName);
    }

    getGender() {
        return this._gender;
    }

    setGender(gender: Gender) {
        this._gender = gender;
    }

    getPhoneNumber(): string {
        return this._phoneNumber;
    }

    setPhoneNumber(value: string) {
        this._phoneNumber = value;
        console.log(successUpdatePhoneNumber);
    }

    getAddress(): string {
        return this._address;
    }

    setAddress(value: string) {
        this._address = value;
        console.log(successUpdateAddress);
    }

    getStatus(): accountStatus {
        return this._status;
    }

    setStatus(status: accountStatus) {
        this._status = status;
    }

    getWallet(): number {
        return this._paymentWallet;
    }

    setWallet(money: number) {
        this._paymentWallet = money;
    }

    getCart() {
        return this._cart;
    }

    displayCart() {
        return this._cart.showCart();
    }

    getQtyOfProdInCart(id: string) {
        return this._cart.getQty(id);
    }

    addProductToCart(id: string, quantity: number) {
        this._cart.addProdToCart(id, quantity);
    }

    deleteProductFromCart(id: string) {
        this._cart.deleteProdFromCart(id);
    }

    getTotalCost(): number {
        return this._cart.getTotalCost();
    }

    resetCart() {
        this._cart.resetCart();
    }

    pay(money: number) {
        this._paymentWallet -= money;
    }

    getBillsList() {
        return this._billsList;
    }
}
