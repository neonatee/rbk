import {Injectable} from '@angular/core';

import {User} from '../interface/user';


@Injectable({
    providedIn: 'root'
})
export class AuthManagerService {

    public permissions;
    public Loading = false;
    private logged = false;
    private secretKey: string;

    constructor() {
    }

    isLogged() {
        if (window.sessionStorage.getItem('user') && window.sessionStorage.getItem('secretKey')) {
            this.logged = true;
        }
        return this.logged;
    }

    public getSecretKey() {
        return window.sessionStorage.getItem('secretKey');
    }

    setSecretKey(secretKey: string) {
        this.secretKey = secretKey;
        return true;
    }

    getIdentity(): User {
        if (window.sessionStorage.getItem('user')) {
            return JSON.parse(window.sessionStorage.getItem('user'));
        }
        this.logout();
    }

    login() {
        this.logged = true;
    }

    logout() {
        window.sessionStorage.clear();
        this.logged = false;
        return true;
    }


    getPermissions() {
        if (this.permissions) {
            return true;
        }
        return false;
    }

    public setPermissions(permissions) {
        this.permissions = permissions;
        this.Loading = true;
        return true;
    }

    can(permissionName: string): boolean {

        if (permissionName === 'access-denied' || '**') {
            return true;
        }

        let isset = false;
        Object.keys(this.permissions).forEach(key => {
            if (key === permissionName) {
                isset = true;
            }
        });

        if (isset) {
            return true;
        } else {
            return false;
        }

    }

}
