import {admin, readlineSync} from "../../Main";
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
        if (admin.isEmpty()) {
            console.log(usersListEmpty);
            return;
        }
        console.table(admin.showList(), dataUserDisplay);
        let username: string = readlineSync.question(ipUsername);
        let user: User | undefined = admin.findUserByUsername(username);
        if (!user) {
            console.log(accIsNotExist);
            return;
        }
        UserFunction.showCart(user);
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
        admin.resetPasswordOfUser(accountUpdate);
    }

    static deleteUser() {
        if (admin.isEmpty()) {
            console.log(usersListEmpty);
            return;
        }
        console.table(admin.showList(), dataUserDisplay);
        let accountDelete = readlineSync.question(ipUsername);
        admin.deleteAccountUser(accountDelete);
    }

    static rechargeForUser() {
        if (admin.isEmpty()) {
            console.log(usersListEmpty);
            return;
        }
        let username = readlineSync.question(ipUsername);
        let request =
            admin.showRequestsRecharge().find(item => item.username === username);
        if (!request) {
            console.log(noUsernameFound);
            return;
        }
        admin.rechargeForWalletOfUser(username, request.money);
    }

    static lockAccountOfUser() {
        if (admin.isEmpty()) {
            console.log(usersListEmpty);
            return;
        }
        console.table(admin.showList(), dataUserDisplay);
        let username = readlineSync.question(ipUsername);
        let user: User | undefined = admin.findUserByUsername(username);
        if (!user) {
            console.log(accIsNotExist);
            return;
        }
        if (user.getStatus() === accountStatus.LOCKED) {
            lockedBeforeMes(username);
            return;
        }
        admin.lockedAccountUser(user);
        lockedSuccessMes(username);
    }

    static unlockAccountUser() {
        if (admin.isEmpty()) {
            console.log(usersListEmpty);
            return;
        }
        let username = readlineSync.question(ipUsername);
        let user: User | undefined = admin.findUserByUsername(username);
        if (!user) {
            console.log(accIsNotExist);
            return;
        }
        if (user.getStatus() === accountStatus.UNLOCK) {
            console.log(doesNotNeedUnlock);
            return;
        }
        admin.unlockAccountUser(user);
        admin.deleteRequestUnlock(username);
        unlockedSuccessMes(username);
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