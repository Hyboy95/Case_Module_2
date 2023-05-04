import {Product} from "./Product";
import {productsList} from "../Main";
import {noProdFound, quantityNotEnough, successAddProd, successDelProd} from "../ConsoleMessenger/ConsoleMessenger";


export class Cart {
    private _listProductSelect: { id: string, name: string, quantity: number, cost: number, costMulti: number }[];
    private _totalCost: number;

    constructor(listProductSelect: {
        id: string;
        name: string;
        quantity: number;
        cost: number;
        costMulti: number
    }[] = [], totalCost: number = 0) {
        this._listProductSelect = listProductSelect;
        this._totalCost = totalCost;
    }

    getQty(id: string) {
        let index: number = this.findIndexInCart(id);
        if (index !== -1) {
            let prod = this._listProductSelect[index];
            return prod.quantity;
        }
    }

    findIndexInCart(id: string) {
        return this._listProductSelect.findIndex(item => item.id === id);
    }

    addProdToCart(id: string, quantity: number) {
        let index: number = productsList.findIndexOfProductByID(id);
        if (index !== -1) {
            let indexInCart: number = this.findIndexInCart(id);
            let product: Product = productsList.showList()[index];
            if (indexInCart === -1) {
                if (quantity <= product.getQuantity()) {
                    let id: string = product.getId();
                    let name: string = product.getName();
                    let cost: number = product.getCost();
                    let costMulti: number = cost * quantity;
                    this._totalCost += costMulti;
                    this._listProductSelect.push({id, name, quantity, cost, costMulti});
                    console.log(successAddProd);
                } else {
                    console.log(quantityNotEnough);
                }
            } else {
                let prod = this._listProductSelect[indexInCart];
                if (quantity <= product.getQuantity()) {
                    prod.quantity += quantity;
                    prod.costMulti += product.getCost() * quantity;
                    this._totalCost += product.getCost() * quantity;
                    console.log(successAddProd);
                } else {
                    console.log(quantityNotEnough);
                }
            }
        } else {
            console.log(noProdFound);
        }
    }

    deleteProdFromCart(id: string) {
        let index: number = this.findIndexInCart(id);
        if (index !== -1) {
            let costMulti: number = this._listProductSelect[index].costMulti;
            this._listProductSelect.splice(index, 1);
            this._totalCost -= costMulti;
            console.log(successDelProd);
        } else {
            console.log(noProdFound);
        }
    }

    getTotalCost(): number {
        return this._totalCost;
    }

    showCart() {
        return this._listProductSelect.sort
        ((a, b) => a.name.localeCompare(b.name));
    }

    resetCart() {
        this._listProductSelect = [];
        this._totalCost = 0;
    }

    clone() {
        return new Cart(this._listProductSelect, this._totalCost);
    }
}