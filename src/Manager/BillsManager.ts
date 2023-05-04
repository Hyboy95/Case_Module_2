import {Bill} from "../Model/Bill";

export class BillsManager {
    private _bills: Bill[] = [];

    constructor() {
    }

    addBill(bill: Bill) {
        this._bills.push(bill);
    }

    showBillsList() {
        return this._bills.sort((a, b) => a.getDayCreat().localeCompare(b.getDayCreat()));
    }

    // deleteBill(index: number) {
    //     this._bills.splice(index, 1);
    // }

    findIndexOfBill(code: string) {
        return this._bills.findIndex(item => item.getCode() === code);
    }

    findBillByCode(code: string) {
        let index = this.findIndexOfBill(code);
        return this._bills[index];
    }
}