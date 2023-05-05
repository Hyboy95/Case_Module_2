
//Function Messenger:
export function lockedBeforeMes(username: string) {
    console.log(`Account ${username} Has Been Looked Before!`);
}

export function lockedSuccessMes(username: string) {
    console.log(`Account ${username} Locked Success!`);
}

export function unlockedSuccessMes(username: string) {
    console.log(`Account ${username} Unlocked Success!`);
}

export function rechargeSuccessMes(username: string, money: number) {
    console.log(`Successfully Recharge Account ${username} With The Amount Of ${money.toLocaleString()} VND.`);
}

export function successDeleteAccMes(username: string) {
    console.log(`Account ${username} Was Deleted Successfully!`);
}


//Product:
export const ipProdName: string = 'Input Product Name: ';
export const ipProdID: string = 'Input Product ID: ';
export const ipProdCost: string = 'Input Product Cost: ';
export const ipProdQty: string = 'Input Product Quantity: ';
export const ipDescribe: string = 'Input Product Describe: ';
export const prodsListEmpty: string = 'Products List Is Empty!';
export const successAddProd: string = 'Add Product Success!';
export const quantityNotEnough: string = 'The Number Of Products Is Not Enough!';
export const successDelProd: string = 'Delete Product Success!';
export const noProdFound: string = 'No Product Found!';
export const successUpdateProduct: string = 'Update Product Success!';

// User:
export const reRegisterMes: string = 'Too Many Incorrect Password. Try Register Again!'
export const successRegister: string = 'Register Account Success!'
export const ipUsername: string = 'Input Username: ';
export const ipPassword: string = 'Input Password: ';
export const passwordWrong: string = 'Incorrect Password!';
export const ipNewPassword: string = 'Input New Password: ';
export const retypePassword: string = 'Retype PassWord: ';
export const retypePasswordWrong: string = 'Retype Password Does Not Match!';
export const ipAnswer: string = 'Input Secret Answer: ';
export const wrongQuestOrAnswer: string = 'Secret Question Or Secret Answer Wrong!';
export const ipName: string = 'Input Name: ';
export const ipPhoneNumber: string = 'Input PhoneNumber(10 Digits Starting With 09 Or 08): ';
export const ipAddress: string = 'Input Address: ';
export const successUpdateName: string = 'Update Name Success!';
export const successUpdateGender: string = 'Update Gender Success!';
export const successUpdatePassword: string = 'Update Password Success!';
export const successUpdatePhoneNumber: string = 'Update PhoneNumber Success!';
export const successUpdateAddress: string = 'Update Address Success!';
export const ipWallet: string = 'Input Amount Of Money: ';
export const noUsernameFound: string = 'No Username Found!';
export const accIsNotExist: string = 'Account Is Not Exist!';
export const usersListEmpty: string = 'Users List Is Empty!';
export const doesNotNeedUnlock: string = 'Account Does Not Need To Be Unlocked!';
export const successSendUnlockRequest: string = 'Send Account Unlock Request Success!';
export const successSendRechargeRequest: string = 'Send Recharge Request Success!';
export const hasBeenLockedMes: string = 'Account Has Been Locked. Please Send Unlock Request To Admin!'
export const hasBeenSentUnlockMes: string = 'The Request To Unlock The Account Has Been Sent Before!'


// Admin:
export const dataUserDisplay: string[] = ['_username', '_name', '_gender', '_status', '_phoneNumber', '_address'];
export const successClearRequestRecharge: string = 'Clear RequestsRecharge Success!';
export const successClearRequestUnlock: string = 'Clear RequestsUnlock Success!';
export const successLoggedInAsAdmin: string = 'Successfully Logged In As Admin!';
export const successLoggedInAsUser: string = 'Successfully Logged In As User!';

// Cart, Request & Pay:
export const cartEmpty: string = 'Cart Is Empty!';
export const successPay: string = 'Payment Success!';
export const balanceNotEnough: string = 'The Balance In The Wallet Is Not Enough!';
export const requestsRechargeEmpty: string = 'Requests Recharge List Is Empty!';
export const requestsUnlockEmpty: string = 'Requests Unlock List Is Empty!';

//Bill:
export const billDisplay: string[] = ['_code', '_dayCreat'];
export const inputCodeBill: string = 'Input Code Of Bill: ';
export const noBillFound: string = 'No Bill Found!';
export const billsListEmpty: string = 'Bills List Is Empty!';


// Check Validate:
export const inputNotValidate: string = 'Input Is Not Validate!';
export const prodNameNotValidate: string = 'Product Name Is Not Validate!';
export const costNotValidate: string = 'Cost Is Not Validate!';
export const qtyNotValidate: string = 'Quantity Is Not Validate!';
export const describeNotValidate: string = 'Describe Is Not Validate!';
export const userNameNotValidate: string = 'Username Is Not Validate!';
export const passwordNotValidate: string = 'Password Is Not Validate!';
export const phoneNumberNotValidate: string = 'PhoneNumber Is Not Validate!';
export const moneysNotValidate: string = 'Amount Of Money Is Not Validate!';

// Border, Color Text (ANSI Escape Codes):
export const resetEffect: string = "\u001b[0m";
export const brightGreen: string = "\u001b[92m";
export const brightYellow: string = "\u001b[93m";
export const brightBLue: string = "\u001b[94m";
export const brightWhite: string = "\u001b[97m";
export const  repeatSpace: string = " ".repeat(30);
export const  repeatSpaceLong: string = " ".repeat(40);
export const  repeatAdd: string = "+".repeat(70);
export const  repeatAddLong: string = "+".repeat(100);

export const border: string = brightBLue + repeatAdd + resetEffect;
export const borderBLue: string = brightBLue + repeatAddLong + resetEffect;
export const borderWhite: string = brightWhite + repeatAddLong + resetEffect;



