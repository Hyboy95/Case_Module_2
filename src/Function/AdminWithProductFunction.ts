import {pressEnterToBack, productsList, readlineSync} from "../Main";
import {MenuOfAdmin} from "../Menu/MenuOfAdmin";
import {ipProdID, ipProdName, noProdFound, prodsListEmpty} from "../ConsoleMessenger/ConsoleMessenger";

export class AdminWithProductFunction {
    static displayProductList() {
        if (productsList.isEmpty()) {
            console.log(prodsListEmpty);
            return;
        }
        console.table(productsList.showList());
    }

    static findProductByName() {
        if (productsList.isEmpty()) {
            console.log(prodsListEmpty);
            return;
        }
        let name: string = readlineSync.question(ipProdName);
        let foundProducts = productsList.findProduct(name);
        if (foundProducts.length !== 0) {
            console.table(foundProducts);
        } else {
            console.log(noProdFound);
        }
    }

    static updateProductInfo() {
        if (productsList.isEmpty()) {
            console.log(prodsListEmpty);
            pressEnterToBack();
            return;
        }
        console.table(productsList.showList());
        let index: number;
        do {
            let id: string = readlineSync.question(ipProdID);
            index = productsList.findIndexOfProductByID(id);
            if (index === -1) {
                console.log(noProdFound);
            }
        } while (index === -1);
        MenuOfAdmin.updateProductMenu(index);
    }

    static deleteProduct() {
        if (productsList.isEmpty()) {
            console.log(prodsListEmpty);
            return;
        }
        console.table(productsList.showList());
        productsList.deleteProduct();
    }
}