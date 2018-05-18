import * as CryptoJS from 'crypto-js';

import {Injectable} from '@angular/core';
import {AuthManagerService} from '../service/auth-manager.service';

@Injectable({
    providedIn: 'root'
})
export class Security {

    constructor(private authManager: AuthManagerService) {
    }


    public isUnauthorized() {
       this.authManager.logout();

    }

    public enCrypt(data: any) {
        const salt = CryptoJS.lib.WordArray.random(256);
        const iv = CryptoJS.lib.WordArray.random(16);
        const key = CryptoJS.PBKDF2(this.authManager.getSecretKey(), salt, {
            hasher: CryptoJS.algo.SHA512,
            keySize: 64 / 8,
            iterations: 999
        });
        const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, {iv: iv});


        const out = {
            ciphertext: CryptoJS.enc.Base64.stringify(encrypted.ciphertext),
            salt: CryptoJS.enc.Hex.stringify(salt),
            iv: CryptoJS.enc.Hex.stringify(iv)
        };

        return out;
    }

    public deCrypt(data: any) {
        const encrypted = data.ciphertext;
        const salt = CryptoJS.enc.Hex.parse(data.salt);
        const iv = CryptoJS.enc.Hex.parse(data.iv);

        const key = CryptoJS.PBKDF2(this.authManager.getSecretKey(), salt, {
            hasher: CryptoJS.algo.SHA512,
            keySize: 64 / 8,
            iterations: 999
        });

        const decrypted = CryptoJS.AES.decrypt(encrypted, key, {iv: iv});
        return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
    }
}
