import {admin, backMes, keySelect, pressEnterToBack, productsList, readlineSync} from "../../Main";
import {MainMenu} from "./MainMenu";
import {AdminWithProductFunction} from "../Function/AdminWithProductFunction";
import {AdminWithUserFunction} from "../Function/AdminWithUserFunction";
import {borderWhite, requestsRechargeEmpty, requestsUnlockEmpty} from "../ConsoleMessenger/ConsoleMessenger";

export class MenuOfAdmin {
    static adminMenu() {
        const adminMenu: string[] = ['User Manager', 'Product Manager', 'ADMIN'];
        let loop: boolean = true;
        while (loop) {
            switch (keySelect(adminMenu)) {
                case 0:
                    console.log(borderWhite);
                    this.userManagerMenu();
                    break;
                case 1:
                    console.log(borderWhite);
                    this.productManagerMenu();
                    break;
                case 2:
                    console.log(borderWhite);
                    this.ADMINMenu();
                    break;
                default:
                    if (readlineSync.keyInYN(backMes)) {
                        console.log(borderWhite);
                        loop = false;
                    }
                    break;
            }
        }
    }

    static userManagerMenu() {
        const userManagerMenu: string[] = [
            'Add User',
            'Display Users List',
            'Display Cart Of User',
            'Reset Password Of User',
            'Check Request',
            'Locked Account User',
            'Delete User',
            'Bills'
        ];
        let loop: boolean = true;
        while (loop) {
            switch (keySelect(userManagerMenu)) {
                case 0:
                    MainMenu.registerAccount();
                    pressEnterToBack();
                    break;
                case 1:
                    console.log(borderWhite);
                    AdminWithUserFunction.displayUserList();
                    pressEnterToBack();
                    break;
                case 2:
                    console.log(borderWhite);
                    AdminWithUserFunction.displayCartOfUser();
                    pressEnterToBack();
                    break;
                case 3:
                    console.log(borderWhite);
                    AdminWithUserFunction.resetPasswordOfUser();
                    pressEnterToBack();
                    break;
                case 4:
                    console.log(borderWhite);
                    this.checkRequestMenu();
                    break;
                case 5:
                    console.log(borderWhite);
                    AdminWithUserFunction.lockAccountOfUser();
                    pressEnterToBack();
                    break;
                case 6:
                    console.log(borderWhite);
                    AdminWithUserFunction.deleteUser();
                    pressEnterToBack();
                    break;
                case 7:
                    console.log(borderWhite);
                    AdminWithUserFunction.displayBillsOfUser();
                    pressEnterToBack();
                    break;
                default:
                    if (readlineSync.keyInYN(backMes)) {
                        console.log(borderWhite);
                        loop = false;
                    }
                    break;
            }
        }
    }

    static checkRequestMenu() {
        const requestMenu: string[] = [
            'Accept RequestRecharge',
            'Accept RequestUnlock',
            'Clear RequestsRecharge',
            'Clear RequestsUnlock'
        ];
        let loop: boolean = true;
        while (loop) {
            switch (keySelect(requestMenu)) {
                case 0:
                    console.log(borderWhite);
                    if (admin.showRequestsRecharge().length !== 0) {
                        console.table(admin.showRequestsRecharge());
                        AdminWithUserFunction.rechargeForUser();
                    } else {
                        console.log(requestsRechargeEmpty);
                    }
                    pressEnterToBack();
                    break;
                case 1:
                    console.log(borderWhite);
                    if (admin.showRequestsUnlock().length !== 0) {
                        console.table(admin.showRequestsUnlock());
                        AdminWithUserFunction.unlockAccountUser();
                    } else {
                        console.log(requestsUnlockEmpty);
                    }
                    pressEnterToBack();
                    break;
                case 2:
                    console.log(borderWhite);
                    admin.resetRequestsRecharge();
                    pressEnterToBack();
                    break;
                case 3:
                    console.log(borderWhite);
                    admin.resetRequestsUnlock();
                    pressEnterToBack();
                    break;
                default:
                    if (readlineSync.keyInYN(backMes)) {
                        console.log(borderWhite);
                        loop = false;
                    }
                    break;
            }
        }
    }

    static productManagerMenu() {
        const productManagerMenu: string[] = [
            'Add Product',
            'Display Products List',
            'Find Product By Name',
            'Update Product Info',
            'Delete Product'
        ];
        let loop: boolean = true;
        while (loop) {
            switch (keySelect(productManagerMenu)) {
                case 0:
                    console.log(borderWhite);
                    productsList.addProduct();
                    pressEnterToBack();
                    break;
                case 1:
                    console.log(borderWhite);
                    AdminWithProductFunction.displayProductList();
                    pressEnterToBack();
                    break;
                case 2:
                    console.log(borderWhite);
                    AdminWithProductFunction.findProductByName();
                    pressEnterToBack();
                    break;
                case 3:
                    console.log(borderWhite);
                    AdminWithProductFunction.updateProductInfo();
                    break;
                case 4:
                    console.log(borderWhite);
                    AdminWithProductFunction.deleteProduct();
                    pressEnterToBack();
                    break;
                default:
                    if (readlineSync.keyInYN(backMes)) {
                        console.log(borderWhite);
                        loop = false;
                    }
                    break;
            }
        }
    }

    static updateProductMenu(index: number) {
        const updateProductMenu: string[] = [
            'Update Product Name',
            'Update Product Cost',
            'Update Product Quantity',
            'Update Product Describe'
        ];
        let loop: boolean = true;
        while (loop) {
            switch (keySelect(updateProductMenu)) {
                case 0:
                    console.log(borderWhite);
                    productsList.updateProductName(index);
                    pressEnterToBack();
                    break;
                case 1:
                    console.log(borderWhite);
                    productsList.updateProductCost(index);
                    pressEnterToBack();
                    break;
                case 2:
                    console.log(borderWhite);
                    productsList.updateProductQuantity(index);
                    pressEnterToBack();
                    break;
                case 3:
                    console.log(borderWhite);
                    productsList.updateProductDescribe(index);
                    pressEnterToBack();
                    break;
                default:
                    if (readlineSync.keyInYN(backMes)) {
                        console.log(borderWhite);
                        loop = false;
                    }
                    break;
            }
        }
    }

    static ADMINMenu() {
        const ADMINMenu: string[] = ['Wallet', 'Change Password'];
        let loop: boolean = true;
        while (loop) {
            switch (keySelect(ADMINMenu)) {
                case 0:
                    console.log(borderWhite);
                    console.log(`Balance in your wallet is: ${admin.getWallet().toLocaleString()} VND.`);
                    pressEnterToBack();
                    break;
                case 1:
                    console.log(borderWhite);
                    admin.updatePassword();
                    pressEnterToBack();
                    break;
                default:
                    if (readlineSync.keyInYN(backMes)) {
                        console.log(borderWhite);
                        loop = false;
                    }
                    break;
            }
        }
    }
}