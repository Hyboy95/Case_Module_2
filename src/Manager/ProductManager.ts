import {Product} from "../Model/Product";
import {ValidateInputProduct} from "../Validate/ValidateInputProduct";
import {readlineSync} from "../Main";
import {InputFunction} from "../Function/InputFunction";
import {
    costNotValidate, describeNotValidate, ipDescribe,
    ipProdCost, ipProdID, ipProdName, ipProdQty,
    noProdFound, qtyNotValidate, successAddProd, successDelProd, successUpdateProduct
} from "../ConsoleMessenger/ConsoleMessenger";

export class ProductManager {
    _productsList: Product[] = [];

    constructor() {
    }

    inputInfoProduct() {
        let name: string = InputFunction.inputProductName();
        let cost: number = InputFunction.inputProductCost();
        let quantity: number = InputFunction.inputProductQuantity();
        let describe: string = InputFunction.inputProductDescribe();
        return new Product(name, cost, quantity, describe);
    }

    addProduct() {
        this._productsList.push(this.inputInfoProduct());
        console.log(successAddProd);
    }

    showList() {
        return this._productsList.sort((a, b) => a.getName().localeCompare(b.getName()));
    }

    isEmpty() {
        return this.showList().length === 0;
    }

    findIndexOfProductByID(id: string): number {
        return this._productsList.findIndex(item => item.getId() === id);
    }

    findIndexOfProductByName(name: string): number {
        return this._productsList.findIndex(item => item.getName() === name);
    }

    findProduct(name: string) {
        let listProductFindByName: Product[] = []
        this._productsList.forEach(item => {
            if (item.getName().toLowerCase().includes(name.toLowerCase())) {
                listProductFindByName.push(item);
            }
        })
        return listProductFindByName;
    }

    updateProductName(index: number) {
        let name = readlineSync.question(ipProdName)
        if (ValidateInputProduct.ValidateProductName(name)) {
            this._productsList[index].setName(name);
            console.log(successUpdateProduct);
        }
    }

    updateProductCost(index: number) {
        let costStr: string = readlineSync.question(ipProdCost);
        if (!costStr || isNaN(+costStr) || parseFloat(costStr) <= 0) {
            console.log(costNotValidate);
        } else {
            let cost: number = parseFloat(costStr);
            this._productsList[index].setCost(cost);
            console.log(successUpdateProduct);
        }
    }

    updateProductQuantity(index: number) {
        let qStr: string = readlineSync.question(ipProdQty);
        if (!qStr || isNaN(+qStr) || parseInt(qStr) < 0) {
            console.log(qtyNotValidate);
        } else {
            let quantity: number = parseInt(qStr);
            this._productsList[index].setQuantity(quantity);
            console.log(successUpdateProduct);
        }
    }

    updateProductDescribe(index: number) {
        let describe: string = readlineSync.question(ipDescribe);
        if (!describe) {
            console.log(describeNotValidate);
        } else {
            this._productsList[index].setDescribe(describe);
            console.log(successUpdateProduct);
        }
    }

    deleteProduct() {
        let id: string = readlineSync.question(ipProdID);
        let index: number = this.findIndexOfProductByID(id);
        if (index !== -1) {

            this._productsList.splice(index, 1);
            console.log(successDelProd);
        } else {
            console.log(noProdFound);
        }
    }

    reduceProductQuantity(id: string, quantity: number) {
        let index: number = this.findIndexOfProductByID(id);
        if (index !== -1) {
            let product: Product = this._productsList[index];
            if (product.getQuantity() >= quantity) {
                product.setQuantity(product.getQuantity() - quantity);
            }
        }
    }

    increaseProductQuantity(id: string, quantity: number) {
        let index: number = this.findIndexOfProductByID(id);
        if (index !== -1) {
            let product: Product = this._productsList[index];
            product.setQuantity(product.getQuantity() + quantity);
        }
    }
}