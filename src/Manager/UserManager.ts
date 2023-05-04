import {accountStatus, Gender, SecretQuestion, User} from "../Model/User";
import {ValidateInputUser} from "../Validate/ValidateInputUser";
import {
    hasBeenSentUnlockMes,
    ipNewPassword,
    ipPassword,
    noUsernameFound,
    rechargeSuccessMes,
    retypePassword,
    retypePasswordWrong,
    successClearRequestRecharge,
    successClearRequestUnlock,
    successDeleteAccMes,
    successSendUnlockRequest,
} from "../ConsoleMessenger/ConsoleMessenger";

const readlineSync = require('readline-sync');

export class UserManager extends User {
    private _usersList: User[] = [];
    private _requestsRecharge: { username: string, money: number }[] = [];
    private _requestsUnlock: string[] = [];

    constructor(username: string, password: string) {
        super(username, password, SecretQuestion.YOUR_JOB, '' , '', Gender.MALE, '', '');
    }

    addAccount(account: User) {
        this._usersList.push(account);
    }

    isEmpty() {
        return this.showList().length === 0;
    }

    showList() {
        return this._usersList.sort((a, b) => a.getUsername().localeCompare(b.getUsername()));
    }

    findIndexAccount(username: string): number {
        return this.showList().findIndex(item => username === item.getUsername());
    }

    findUserByUsername(username: string) {
        return this.showList().find(item => username === item.getUsername());
    }

    updatePassword() {
        let flag: boolean = true;
        while (flag) {
            let newPassword = readlineSync.question(ipNewPassword, {hideEchoBack: true});
            if (!ValidateInputUser.validatePassword(newPassword)) continue;
            let confirmPassword = readlineSync.question(retypePassword, {hideEchoBack: true});
            if (confirmPassword === newPassword) {
                this.setPassword(newPassword);
                flag = false;
            } else {
                console.log(retypePasswordWrong);
            }
        }
    }

    ResetPasswordOfUser(username: string) {
        let index: number = this.findIndexAccount(username);
        if (index !== -1) {
            let flag: boolean = true;
            while (flag) {
                let newPassword = readlineSync.question(ipPassword, {hideEchoBack: true});
                if (!ValidateInputUser.validatePassword(newPassword)) continue;
                let confirmPassword = readlineSync.question(retypePassword, {hideEchoBack: true});
                if (confirmPassword === newPassword) {
                    this._usersList[index].setPassword(newPassword);
                    flag = false;
                } else {
                    console.log(retypePasswordWrong);
                }
            }
        }
    }

    deleteAccount(username: string) {
        let index: number = this.findIndexAccount(username);
        if (index !== -1) {
            this.showList().splice(index, 1);
            successDeleteAccMes(username);
        }
    }

    showRequestsRecharge() {
        return this._requestsRecharge;
    }

    addRequestRecharge(request: { username: string, money: number }) {
        this._requestsRecharge.push(request);
    }

    deleteRequestRecharge(username: string) {
        let index: number =
            this._requestsRecharge.findIndex(item => item.username === username);
        if (index !== -1) {
            this._requestsRecharge.splice(index, 1);
        }
    }

    rechargeForWalletOfUser(username: string, money: number) {
        let user: User | undefined = this.findUserByUsername(username);
        if (user) {
            user.setWallet(user.getWallet() + money);
            this.deleteRequestRecharge(username);
            rechargeSuccessMes(username, money);
        } else {
            console.log(noUsernameFound);
        }
    }

    resetRequestsRecharge() {
        this._requestsRecharge = [];
        console.log(successClearRequestRecharge);
    }

    lockedAccountUser(user: User) {
        user.setStatus(accountStatus.LOCKED);
    }

    unlockAccountUser(user: User) {
        user.setStatus(accountStatus.UNLOCK);
    }

    showRequestsUnlock() {
        return this._requestsUnlock;
    }

    addRequestUnlock(username: string) {
        let index: number = this._requestsUnlock.findIndex(item => item === username);
        if (index !== -1) {
            console.log(hasBeenSentUnlockMes);
            return;
        }
        this._requestsUnlock.push(username);
        console.log(successSendUnlockRequest);
    }

    deleteRequestUnlock(username: string) {
        let index: number = this._requestsUnlock.findIndex(item => item === username);
        if (index !== -1) {
            this._requestsUnlock.splice(index, 1);
        }
    }

    resetRequestsUnlock() {
        this._requestsUnlock = [];
        console.log(successClearRequestUnlock);
    }
}