import {MainMenu} from "./src/Menu/MainMenu";
import {UserManager} from "./src/Manager/UserManager";
import {ProductManager} from "./src/Manager/ProductManager";
import {borderWhite} from "./src/ConsoleMessenger/ConsoleMessenger";

export const readlineSync = require('readline-sync');
const selectMenuMes: string = 'Select Function: ';

export function pressEnterToBack() {
    readlineSync.question('Press "ENTER" To Back');
    console.log(borderWhite);
}

export function keySelect(data: string[]) {
    return readlineSync.keyInSelect(data, selectMenuMes, {cancel: 'EXIT'});
}

export const exitConfirmMes: string = 'Confirm Exit: ';
export const backMes: string = 'Confirm Back: ';

export const admin: UserManager = new UserManager('admin', 'admin');
export const productsList: ProductManager = new ProductManager();
export const maxInputPasswordWrong: number = 5;
export const minMoneysRecharge: number = 50000;

function init() {
    const initMenu: string[] = [
        'Sign In',
        'Register',
        'Forgot Password',
        'Send Account Unlock Request'
    ];
    let loop: boolean = true;
    while (loop) {
        switch (keySelect(initMenu)) {
            case 0:
                MainMenu.signInAccount();
                break;
            case 1:
                MainMenu.registerAccount();
                pressEnterToBack();
                break;
            case 2:
                MainMenu.findPassword();
                pressEnterToBack();
                break;
            case 3:
                MainMenu.sendAccountUnlockRequest();
                pressEnterToBack();
                break;
            default:
                if (readlineSync.keyInYN(exitConfirmMes)) {
                    loop = false;
                }
                break;
        }
    }
}

init();