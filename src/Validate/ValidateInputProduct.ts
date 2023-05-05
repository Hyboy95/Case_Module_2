import {productsList} from "../../Main";
import {InputRegex} from "../Regex/InputRegex";
import {
    costNotValidate,
    describeNotValidate,
    prodNameNotValidate,
    qtyNotValidate,
} from "../ConsoleMessenger/ConsoleMessenger";

export class ValidateInputProduct {
    static ValidateProductName(name: string) {
        let check: boolean = true;
        if (!InputRegex.validate(name) || productsList.findIndexOfProductByName(name) !== -1) {
            console.log(prodNameNotValidate);
            check = false;
        }
        return check;
    }

    static ValidateProductCost(costStr: string) {
        let check: boolean = true;
        if (!costStr || isNaN(+costStr) || parseFloat(costStr) <= 0) {
            console.log(costNotValidate);
            check = false;
        }
        return check;
    }

    static ValidateProductQuantity(qStr: string) {
        let check: boolean = true;
        if (!qStr || isNaN(+qStr) || parseInt(qStr) <= 0) {
            console.log(qtyNotValidate);
            check = false;
        }
        return check;
    }

    static ValidateDescribe(describe: string) {
        let check: boolean = true;
        if (!describe) {
            console.log(describeNotValidate);
            check = false;
        }
        return check;
    }
}