import {admin, productsList, readlineSync} from "../../Main";
import {Gender, User} from "../Model/User";
import {ValidateInputUser} from "../Validate/ValidateInputUser";
import {InputFunction} from "./InputFunction";
import {
    balanceNotEnough, billDisplay, billsListEmpty, brightYellow, border, cartEmpty, inputCodeBill,
    ipAddress, ipName, ipNewPassword, ipPhoneNumber,
    ipProdID, noBillFound, noProdFound, prodsListEmpty, repeatSpace, resetEffect,
    retypePassword, retypePasswordWrong, successPay, successUpdateGender, brightGreen
} from "../ConsoleMessenger/ConsoleMessenger";
import {Cart} from "../Model/Cart";
import {Bill} from "../Model/Bill";


export class UserFunction {
    static showProductList() {
        if (!productsList.isEmpty()) {
            console.table(productsList.showList());
            return;
        }
        console.log(prodsListEmpty);
    }

    static showInfoOfUser(user: User) {
        console.log(border);
        console.log(brightYellow + repeatSpace + 'INFORMATION' + repeatSpace + resetEffect);
        console.log(border);
        console.log(`${brightGreen}Account name:${resetEffect} ${user.getUsername()}`);
        console.log(`${brightGreen}Name:${resetEffect} ${user.getName()}`);
        console.log(`${brightGreen}Gender:${resetEffect} ${user.getGender()}`);
        console.log(`${brightGreen}PhoneNumber:${resetEffect} ${user.getPhoneNumber()}`);
        console.log(`${brightGreen}Address:${resetEffect} ${user.getAddress()}`);
        console.log(border);
    }

    static changeName(user: User) {
        let name = readlineSync.question(ipName);
        if (ValidateInputUser.validateInput(name)) {
            user.setName(name);
        }
    }

    static changeGender(user: User) {
        const genderMenu: string[] = ['Male', 'Female'];
        const index = readlineSync.keyInSelect(genderMenu, 'Select Gender:', {cancel: false});
        const newGender = index === 0 ? Gender.MALE : Gender.FEMALE;
        user.setGender(newGender);
        console.log(successUpdateGender);
    }

    static changePhoneNumber(user: User) {
        let phoneNumber = readlineSync.question(ipPhoneNumber);
        if (ValidateInputUser.validatePhoneNumber(phoneNumber)) {
            user.setPhoneNumber(phoneNumber);
        }
    }

    static changeAddress(user: User) {
        let address = readlineSync.question(ipAddress);
        if (ValidateInputUser.validateInput(address)) {
            user.setAddress(address);
        }
    }

    static changePassword(user: User) {
        let flag: boolean = true;
        while (flag) {
            const newPassword = readlineSync.question(ipNewPassword, {hideEchoBack: true});
            if (!ValidateInputUser.validatePassword(newPassword)) continue;
            let confirmPassword = readlineSync.question(retypePassword, {hideEchoBack: true});
            if (confirmPassword === newPassword) {
                user.setPassword(newPassword);
                flag = false;
            } else {
                console.log(retypePasswordWrong);
            }
        }
    }

    static showCart(user: User) {
        if (user.displayCart().length !== 0) {
            console.table(user.displayCart());
        } else console.log(cartEmpty);
        console.log(`Total amount to pay: ${user.getTotalCost().toLocaleString()} VND`);
    }

    static addProductToCart(user: User) {
        if (productsList.showList().length === 0) {
            console.log(prodsListEmpty);
            return;
        }
        console.table(productsList.showList());
        let id = readlineSync.question(ipProdID);
        let index: number = productsList.findIndexOfProductByID(id);
        if (index === -1) {
            console.log(noProdFound);
            return;
        }
        let quantity: number = InputFunction.inputProductQuantity();
        user.addProductToCart(id, quantity);
        productsList.reduceProductQuantity(id, quantity);
    }


    static deleteProductFromCart(user: User) {
        if (user.displayCart().length === 0) {
            console.log(cartEmpty);
            return;
        }
        console.table(user.displayCart());
        let id = readlineSync.question(ipProdID);
        let index = user.getCart().findIndexInCart(id);
        if (index === -1) {
            console.log(noProdFound);
            return;
        }
        let quantity = user.getQtyOfProdInCart(id);
        if (quantity) {
            user.deleteProductFromCart(id);
            productsList.increaseProductQuantity(id, quantity);
        }
    }

    static payMoney(user: User) {
        let money: number = user.getTotalCost();
        if (money === 0) {
            console.log(cartEmpty);
            return;
        }
        if (money > user.getWallet()) {
            console.log(balanceNotEnough);
            return;
        }
        let cartCopy: Cart = user.getCart().clone();
        let bill: Bill = this.creatBill(user, cartCopy);
        user.getBillsList().addBill(bill);
        admin.getBillsList().addBill(bill);
        user.pay(money);
        user.resetCart();
        console.log(successPay);
    }

    static creatBill(user: User, cart: Cart) {
        let infoProducts: Cart = cart;
        let clientName: string = user.getName();
        let clientGender: Gender = user.getGender();
        let clientPhoneNumber: string = user.getPhoneNumber();
        let clientAddress: string = user.getAddress();
        return new Bill(infoProducts, clientName, clientGender, clientPhoneNumber, clientAddress);
    }

    static displayDetailBill(user: User) {
        if (user.getBillsList().showBillsList().length === 0) {
            console.log(billsListEmpty);
            return;
        }
        console.table(user.getBillsList().showBillsList(), billDisplay);
        let code: string = readlineSync.question(inputCodeBill);
        let bill: Bill | undefined = user.getBillsList().findBillByCode(code);
        if (!bill) {
            console.log(noBillFound);
            return;
        }
        bill.showDetailBill();
    }
}