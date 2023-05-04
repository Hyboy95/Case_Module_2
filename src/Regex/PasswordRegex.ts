export class PasswordRegex {
    static validate(regex: string): boolean {
        let PASSWORD_REGEX: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{5,}$/;
        return PASSWORD_REGEX.test(regex);
    }
}