import {ValidateInputUser} from "../Validate/ValidateInputUser";
import {accountStatus, Gender, SecretQuestion, User} from "../Model/User";
import {MenuOfAdmin} from "./MenuOfAdmin";
import {admin, maxInputPasswordWrong, pressEnterToBack, readlineSync} from "../../Main";
import {MenuOfUser} from "./MenuOfUser";
import {InputFunction} from "../Function/InputFunction";
import {
    accIsNotExist, borderWhite, doesNotNeedUnlock,
    hasBeenLockedMes, ipPassword, ipUsername, passwordWrong, reRegisterMes, retypePassword,
    successLoggedInAsAdmin, successLoggedInAsUser, successRegister, wrongQuestOrAnswer
} from "../ConsoleMessenger/ConsoleMessenger";


export class MainMenu {
    static signInAccount() {
        console.log(borderWhite);
        const username = readlineSync.question(ipUsername);
        if (username === admin.getUsername()) {
            const password = readlineSync.question(ipPassword, {hideEchoBack: true});
            if (password === admin.getPassword()) {
                console.log(successLoggedInAsAdmin);
                console.log(borderWhite);
                MenuOfAdmin.adminMenu();
                return;
            }
            console.log(passwordWrong);
            pressEnterToBack();
            return;
        }
        const user: User | undefined = admin.findUserByUsername(username);
        if (!user) {
            console.log(accIsNotExist);
            pressEnterToBack();
            return;
        }
        if (user.getStatus() === accountStatus.LOCKED) {
            console.log(hasBeenLockedMes);
            pressEnterToBack();
            return;
        }
        for (let i = 0; i < maxInputPasswordWrong; i++) {
            const password = readlineSync.question(ipPassword, {hideEchoBack: true});
            if (ValidateInputUser.checkCorrectPassword(username, password)) {
                console.log(successLoggedInAsUser);
                console.log(borderWhite);
                MenuOfUser.userMenu(user);
                return;
            }
            console.log(passwordWrong);
        }
        admin.lockedAccountUser(user);
        console.log(hasBeenLockedMes);
        pressEnterToBack();
    }


    static registerAccount() {
        console.log(borderWhite);
        let username: string = InputFunction.inputUsername();
        let password: string = InputFunction.inputPassword();
        let confirmPassword: string;
        let inputCount: number = 0;
        while (inputCount < maxInputPasswordWrong) {
            confirmPassword = readlineSync.question(retypePassword, {hideEchoBack: true});
            if (confirmPassword === password) break;
            inputCount++;
        }
        if (inputCount === maxInputPasswordWrong) {
            console.log(reRegisterMes);
            return;
        }
        let secretQuestion: SecretQuestion = InputFunction.inputSecretQuestion();
        let secretAnswer: string = InputFunction.inputSecretAnswer();
        let name: string = InputFunction.inputName();
        let gender: Gender = InputFunction.inputGender();
        let phoneNumber: string = InputFunction.inputPhoneNumber();
        let address: string = InputFunction.inputAddress();
        admin.addAccountUser(new User(username, password, secretQuestion, secretAnswer, name, gender, phoneNumber, address));
        console.log(successRegister);
    }

    static findPassword() {
        console.log(borderWhite);
        let username: string = readlineSync.question(ipUsername);
        let user: User | undefined = admin.findUserByUsername(username);
        if (!user) {
            console.log(accIsNotExist);
            return;
        }
        let secretQuestion: SecretQuestion = InputFunction.inputSecretQuestion();
        let secretAnswer: string = InputFunction.inputSecretAnswer();
        if (secretQuestion === user.getSecretQuestion() && secretAnswer === user.getSecretAnswer()) {
            console.log(`Your Password: ${user.getPassword()}`);
            return;
        }
        console.log(wrongQuestOrAnswer);
    }

    static sendAccountUnlockRequest() {
        console.log(borderWhite);
        const username = readlineSync.question(ipUsername);
        const user: User | undefined = admin.findUserByUsername(username);
        if (!user) {
            console.log(accIsNotExist);
            return;
        }
        if (user.getStatus() === accountStatus.UNLOCK) {
            console.log(doesNotNeedUnlock);
            return;
        }
        admin.addRequestUnlock(username);
    }
}