import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BaseHttpService} from '../../../../lib/service/base-http.service';
import {Security} from '../../../../lib/class/security';
import {AuthManagerService} from '../../../../lib/service/auth-manager.service';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PatientService extends BaseHttpService {

    constructor(public http: HttpClient,
                public security: Security,
                public router: Router,
                public authManager: AuthManagerService) {
        super(http, security, router);
    }

    getPatients(id?: number, sort_active?: string, sort_direction?: string, pageIndex?: number, pageSize?: number): Observable<any> {
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
        return this.get('patient/patients/' + id, params);
    }

    getPatient(id: number, expand = false): Observable<any> {
        let params = {};
        if (expand) {
            params = {
                expand: 'locationAll,statusAll,doctorAll'
            };
        }
        return this.get('patient/' + id, params);
    }

    addPatient(data): Observable<any> {
        return this.post('patient/create-patient', data);
    }

    editPatient(id, data): Observable<any> {
        return this.put('patient/' + id, data);
    }

    deletePatient(id): Observable<any> {
        return this.get('patient/delete-patient/' + id);
    }

    getPatientSelectFields() {
        return this.get('patient/select-fields');
    }


}
