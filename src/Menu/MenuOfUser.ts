import {admin, backMes, keySelect, pressEnterToBack, readlineSync} from "../../Main";
import {User} from "../Model/User";
import {UserFunction} from "../Function/UserFunction";
import {InputFunction} from "../Function/InputFunction";
import {borderWhite, successSendRechargeRequest} from "../ConsoleMessenger/ConsoleMessenger";

export class MenuOfUser {
    static userMenu(user: User) {
        const userMenu: string[] = ['Information', 'ProductsList', 'Cart', 'Wallet'];
        let loop: boolean = true;
        while (loop) {
            switch (keySelect(userMenu)) {
                case 0:
                    console.log(borderWhite);
                    this.informationMenu(user);
                    break;
                case 1:
                    console.log(borderWhite);
                    UserFunction.showProductList();
                    pressEnterToBack();
                    break;
                case 2:
                    console.log(borderWhite);
                    this.cartMenu(user);
                    break;
                case 3:
                    console.log(borderWhite);
                    this.walletMenu(user);
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

    static informationMenu(user: User) {
        const infoMenu: string[] = [
            'Display Information',
            'Change Name',
            'Change Gender',
            'Change PhoneNumber',
            'Change Address',
            'Change Password'
        ];
        let loop: boolean = true;
        while (loop) {
            switch (keySelect(infoMenu)) {
                case 0:
                    console.log(borderWhite);
                    UserFunction.showInfoOfUser(user);
                    pressEnterToBack();
                    break;
                case 1:
                    console.log(borderWhite);
                    UserFunction.changeName(user);
                    pressEnterToBack();
                    break;
                case 2:
                    console.log(borderWhite);
                    UserFunction.changeGender(user);
                    pressEnterToBack();
                    break;
                case 3:
                    console.log(borderWhite);
                    UserFunction.changePhoneNumber(user);
                    pressEnterToBack();
                    break;
                case 4:
                    console.log(borderWhite);
                    UserFunction.changeAddress(user);
                    pressEnterToBack();
                    break;
                case 5:
                    console.log(borderWhite);
                    UserFunction.changePassword(user);
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

    static cartMenu(user: User) {
        const cartMenu: string[] = [
            'Show Cart',
            'Add Product To Cart',
            'Delete Product From Cart'
        ];
        let loop: boolean = true;
        while (loop) {
            switch (keySelect(cartMenu)) {
                case 0:
                    console.log(borderWhite);
                    UserFunction.showCart(user);
                    pressEnterToBack();
                    break;
                case 1:
                    console.log(borderWhite);
                    UserFunction.addProductToCart(user);
                    pressEnterToBack();
                    break;
                case 2:
                    console.log(borderWhite);
                    UserFunction.deleteProductFromCart(user);
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

    static walletMenu(user: User) {
        const walletMenu: string[] = ['Display wallet', 'Pay', 'Recharge', 'Bills'];
        let loop: boolean = true;
        while (loop) {
            switch (keySelect(walletMenu)) {
                case 0:
                    console.log(borderWhite);
                    console.log(`Balance in your wallet is: ${user.getWallet().toLocaleString()} VND.`);
                    pressEnterToBack();
                    break;
                case 1:
                    console.log(borderWhite);
                    UserFunction.payMoney(user);
                    pressEnterToBack();
                    break;
                case 2:
                    console.log(borderWhite);
                    let money: number = InputFunction.inputMoneys();
                    admin.addRequestRecharge({username: user.getUsername(), money: money});
                    console.log(successSendRechargeRequest);
                    pressEnterToBack();
                    break;
                case 3:
                    console.log(borderWhite);
                    UserFunction.displayDetailBill(user);
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