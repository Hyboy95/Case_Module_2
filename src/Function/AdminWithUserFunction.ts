import {admin, readlineSync} from "../Main";
import {accountStatus, User} from "../Model/User";
import {
    accIsNotExist, doesNotNeedUnlock, dataUserDisplay,
    ipUsername, noUsernameFound, usersListEmpty,
    billsListEmpty, billDisplay, inputCodeBill, noBillFound,
    lockedBeforeMes, lockedSuccessMes, unlockedSuccessMes,
} from "../ConsoleMessenger/ConsoleMessenger";
import {UserFunction} from "./UserFunction";
import {Bill} from "../Model/Bill";

export class AdminWithUserFunction {
    static displayUserList() {
        if (admin.isEmpty()) {
            console.log(usersListEmpty);
            return;
        }
        console.table(admin.showList(), dataUserDisplay);
    }

    static displayCartOfUser() {
        let username: string = readlineSync.question(ipUsername);
        let user: User | undefined = admin.findUserByUsername(username);
        if (!user) {
            console.log(accIsNotExist);
        } else {
            UserFunction.showCart(user);
        }
    }

    static resetPasswordOfUser() {
        if (admin.isEmpty()) {
            console.log(usersListEmpty);
            return;
        }
        console.table(admin.showList(), dataUserDisplay);
        let accountUpdate = readlineSync.question(ipUsername);
        if (!accountUpdate) {
            console.log(accIsNotExist);
            return;
        }
        admin.ResetPasswordOfUser(accountUpdate);
    }

    static deleteUser() {
        if (admin.isEmpty()) {
            console.log(usersListEmpty);
            return;
        }
        console.table(admin.showList(), dataUserDisplay);
        let accountDelete = readlineSync.question(ipUsername);
        if (!accountDelete) {
            console.log(accIsNotExist);
            return;
        }
        admin.deleteAccount(accountDelete);
    }

    static rechargeForUser() {
        let username = readlineSync.question(ipUsername);
        let request =
            admin.showRequestsRecharge().find(item => item.username === username);
        if (request) {
            admin.rechargeForWalletOfUser(username, request.money);
            admin.setWallet(admin.getWallet() + request.money);
        } else {
            console.log(noUsernameFound);
        }
    }

    static lockAccountOfUser() {
        let username = readlineSync.question(ipUsername);
        let user: User | undefined = admin.findUserByUsername(username);
        if (!user) {
            console.log(accIsNotExist);
        } else {
            if (user.getStatus() === accountStatus.LOCKED) {
                lockedBeforeMes(username);
            } else {
                admin.lockedAccountUser(user);
                lockedSuccessMes(username);
            }
        }
    }

    static unlockAccountUser() {
        let username = readlineSync.question(ipUsername);
        let user: User | undefined = admin.findUserByUsername(username);
        if (!user) {
            console.log(accIsNotExist);
        } else {
            if (user.getStatus() === accountStatus.UNLOCK) {
                console.log(doesNotNeedUnlock);
            } else {
                admin.unlockAccountUser(user);
                admin.deleteRequestUnlock(username);
                unlockedSuccessMes(username);
            }
        }
    }

    static displayBillsOfUser() {
        if (admin.getBillsList().showBillsList().length === 0) {
            console.log(billsListEmpty);
            return;
        }
        console.table(admin.getBillsList().showBillsList(), billDisplay);
        let code: string = readlineSync.question(inputCodeBill);
        let bill: Bill | undefined = admin.getBillsList().findBillByCode(code);
        if (!bill) {
            console.log(noBillFound);
            return;
        }
        bill.showDetailBill();
    }
}