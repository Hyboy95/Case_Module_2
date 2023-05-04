export class AccountRegex {
    static validate(regex: string): boolean {
        let ACCOUNT_REGEX: RegExp = /^[_a-zA-Z0-9]{4,}$/;
        return ACCOUNT_REGEX.test(regex);
    }
}