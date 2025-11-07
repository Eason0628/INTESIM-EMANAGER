import CryptoJS from "crypto-js";
const keyStr = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";

export function encrypt(word) {
    if (word instanceof Object) word = JSON.stringify(word);
    let key = CryptoJS.enc.Utf8.parse(keyStr);
    let encryptedObj = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(word), key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    return encryptedObj.toString();
}

export function decrypt(word) {
    let key = CryptoJS.enc.Utf8.parse(keyStr);
    let decrypt = CryptoJS.AES.decrypt(word, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    let decString = CryptoJS.enc.Utf8.stringify(decrypt);
    return decString;
}
