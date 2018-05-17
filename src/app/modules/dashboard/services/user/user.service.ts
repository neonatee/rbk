import {Injectable} from '@angular/core';
import {BaseHttpService} from '../../../../lib/service/base-http.service';
import {Security} from '../../../../lib/class/security';
import {HttpClient} from '@angular/common/http';
import {Doctors, DoctorsTable} from '../../../../lib/interface/doctors';
import {Observable} from 'rxjs';
import {User, UserProfile} from '../../../../lib/interface/user';
import {AuthManagerService} from '../../../../lib/service/auth-manager.service';
import {Router} from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class UserService extends BaseHttpService {

    constructor(public http: HttpClient,
                public security: Security,
                public router: Router,
                public authManager: AuthManagerService) {
        super(http, security, router);
    }


    getUser(id?: number): Observable<User> {
        if (!id) {
            id = this.authManager.getIdentity().id;
        }
        const params = {
            expand: 'profile,authLog,userTasks'
        };
        return this.get('user/' + id, params);
    }


    getProfile(): Observable<UserProfile> {

        return this.get('user/profile');
    }

    getDoctor(id: number, expand = false): Observable<Doctors> {
        let params = {};
        if (expand) {
            params = {
                expand: 'locationAll,statusAll,medical_representativeAll'
            };
        }
        return this.get('doctor/' + id, params);
    }

    getDoctorSelectFields() {
        /* const params = {
             expand: 'profile,authLog,userTasks'
         };*/
        return this.get('doctor/select-fields');
    }

    addDoctor(data): Observable<Doctors> {
        return this.post('doctor/create-doctor', data);
    }

    editDoctor(id, data): Observable<Doctors> {
        return this.put('doctor/' + id, data);
    }

    deleteDoctor(id): Observable<any> {
        return this.get('doctor/delete-doctor/' + id);
    }


    getDoctors(id?: number, sort_active?: string, sort_direction?: string, pageIndex?: number, pageSize?: number): Observable<DoctorsTable> {
        if (!id) {
            id = this.authManager.getIdentity().id;
        }

        const params = {
            page: {
                sort_active: sort_active,
                sort_direction: sort_direction,
                pageIndex: pageIndex,
                pageSize: pageSize
            }
        };
        return this.get('doctor/doctors/' + id, params);
    }
}
