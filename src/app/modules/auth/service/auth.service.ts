import {Injectable} from '@angular/core';
import {Security} from '../../../lib/class/security';
import {HttpClient} from '@angular/common/http';
import {BaseHttpService} from '../../../lib/service/base-http.service';
import {AuthManagerService} from '../../../lib/service/auth-manager.service';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class AuthService extends BaseHttpService {


    constructor(public http: HttpClient,
                public security: Security,
                public router: Router,
                public authManager: AuthManagerService) {
        super(http, security, router);

    }

    login(data: any) {
        return this.post('auth/login', data);
    }

    code(data: any) {
        return this.post('auth/code', data);
    }

    getPermissionsByUser(id: number) {


        return this.get('auth/permissions/' + id);

    }

}
