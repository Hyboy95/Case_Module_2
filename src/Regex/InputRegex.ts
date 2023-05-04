export class InputRegex {
    static validate(regex: string): boolean {
        let INPUT_REGEX: RegExp = /^[a-z_A-Z]+\s?.*/;
        return INPUT_REGEX.test(regex);
    }
}