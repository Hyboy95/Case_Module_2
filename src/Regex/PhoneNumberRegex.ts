export class PhoneNumberRegex {
    static validate(regex: string): boolean {
        let PHONE_NUMBER_REGEX: RegExp = /^(09|08)\d{8}$/;
        return PHONE_NUMBER_REGEX.test(regex);
    }
}