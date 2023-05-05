import {readlineSync} from "../../Main";
import {ValidateInputUser} from "../Validate/ValidateInputUser";
import {ValidateInputProduct} from "../Validate/ValidateInputProduct";
import {
    ipAddress, ipAnswer,
    ipDescribe,
    ipName,
    ipPassword,
    ipPhoneNumber,
    ipProdCost,
    ipProdName,
    ipProdQty,
    ipUsername,
    ipWallet
} from "../ConsoleMessenger/ConsoleMessenger";

import {Gender, SecretQuestion} from "../Model/User";

export class InputFunction {
    //Input User Info:
    static inputUsername() {
        let username: string;
        do {
            username = readlineSync.question(ipUsername);
        } while (!ValidateInputUser.validateUsername(username));
        return username;
    }

    static inputPassword() {
        let password: string;
        do {
            password = readlineSync.question(ipPassword, {hideEchoBack: true});
        } while (!ValidateInputUser.validatePassword(password));
        return password;
    }

    static inputName() {
        let name: string;
        do {
            name = readlineSync.question(ipName);
        } while (!ValidateInputUser.validateInput(name));
        return name;
    }

    static inputGender() {
        const genderMenu: string[] = ['Male', 'Female'];
        const index = readlineSync.keyInSelect(genderMenu, 'Select Gender: ', {cancel: false});
        return index === 0 ? Gender.MALE : Gender.FEMALE;
    }

    static inputSecretQuestion() {
        const secretQuestMenu: string[] = [
            'What is your hobby?',
            'What is your job?',
            'What is your country?',
            'What is your pet?',
            'What is your best friend?'
        ]
        const index = readlineSync.keyInSelect(secretQuestMenu, 'Select Secret Question: ', {cancel: false});
        switch (index) {
            case 0:
                return SecretQuestion.YOUR_HOBBY;
            case 1:
                return SecretQuestion.YOUR_JOB;
            case 2:
                return SecretQuestion.YOUR_COUNTRY;
            case 3:
                return SecretQuestion.YOUR_PET;
            default:
                return SecretQuestion.YOUR_BEST_FRIEND;
        }
    }

    static inputSecretAnswer() {
        let secretAnswer: string;
        do {
            secretAnswer = readlineSync.question(ipAnswer);
        } while (!ValidateInputUser.validateInput(secretAnswer));
        return secretAnswer;
    }

    static inputPhoneNumber() {
        let phoneNumber: string;
        do {
            phoneNumber = readlineSync.question(ipPhoneNumber);
        } while (!ValidateInputUser.validatePhoneNumber(phoneNumber));
        return phoneNumber;
    }

    static inputAddress() {
        let address: string;
        do {
            address = readlineSync.question(ipAddress);
        } while (!ValidateInputUser.validateInput(address));
        return address;
    }

    static inputMoneys() {
        let moneyStr: string;
        do {
            moneyStr = readlineSync.question(ipWallet);
        } while (!ValidateInputUser.validateMoney(moneyStr));
        return parseInt(moneyStr);
    }

    //Input Product Info:
    static inputProductName() {
        let productName: string;
        do {
            productName = readlineSync.question(ipProdName);
        } while (!ValidateInputProduct.ValidateProductName(productName));
        return productName;
    }

    static inputProductCost() {
        let costStr: string;
        do {
            costStr = readlineSync.question(ipProdCost);
        } while (!ValidateInputProduct.ValidateProductCost(costStr));
        return parseFloat(costStr);
    }

    static inputProductQuantity() {
        let qStr: string;
        do {
            qStr = readlineSync.question(ipProdQty);
        } while (!ValidateInputProduct.ValidateProductQuantity(qStr));
        return parseInt(qStr);
    }

    static inputProductDescribe() {
        let describe: string;
        do {
            describe = readlineSync.question(ipDescribe);
        } while (!ValidateInputProduct.ValidateDescribe(describe));
        return describe;
    }
}