import {AccountRegex} from "../Regex/AccountRegex";
import {PasswordRegex} from "../Regex/PasswordRegex";
import {PhoneNumberRegex} from "../Regex/PhoneNumberRegex";
import {InputRegex} from "../Regex/InputRegex";
import {admin, minMoneysRecharge} from "../../Main";
import {
    inputNotValidate,
    moneysNotValidate,
    passwordNotValidate,
    phoneNumberNotValidate,
    userNameNotValidate
} from "../ConsoleMessenger/ConsoleMessenger";

export class ValidateInputUser {
    static validateUsername(username: string): boolean {
        let check: boolean = true;
        if (!AccountRegex.validate(username) || username === admin.getUsername() ||
            admin.findIndexUserByUsername(username) !== -1) {
            console.log(userNameNotValidate);
            check = false;
        }
        return check;
    }

    static validatePassword(password: string): boolean {
        let check: boolean = true;
        if (!PasswordRegex.validate(password)) {
            console.log(passwordNotValidate);
            check = false;
        }
        return check;
    }

    static validateInput(input: string): boolean {
        if (!InputRegex.validate(input)) console.log(inputNotValidate);
        return InputRegex.validate(input);
    }

    static validatePhoneNumber(phoneNumber: string): boolean {
        if (!PhoneNumberRegex.validate(phoneNumber)) console.log(phoneNumberNotValidate);
        return PhoneNumberRegex.validate(phoneNumber);
    }

    static validateMoney(moneyStr: string): boolean {
        let check: boolean = true;
        if (!moneyStr || isNaN(+moneyStr) || parseInt(moneyStr) < minMoneysRecharge) {
            console.log(moneysNotValidate);
            check = false;
        }
        return check;
    }

    static checkCorrectPassword(username: string, password: string): boolean {
        let index: number = admin.findIndexUserByUsername(username);
        return (index !== -1 && admin.showList()[index].getPassword() === password);
    }
}