import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {AuthManagerService} from '../../../../lib/service/auth-manager.service';

import {Location} from '@angular/common';
import {PatientForm, PatientFormControlsI} from '../../../../lib/interface/patient';
import {PatientService} from '../../services/patient/patient.service';

@Component({
    selector: 'crm-patient-create',
    templateUrl: './patient-create.component.html',
    styleUrls: ['./patient-create.component.scss']
})
export class PatientCreateComponent implements OnInit {

    form = [];
    Loading = true;

    id: number;

    constructor(private patientService: PatientService,
                private location: Location,
                private authManager: AuthManagerService,
                private patientForm: PatientForm) {
    }

    ngOnInit() {
        this.patientService.getPatientSelectFields().subscribe((select_fields) => {

            console.log(select_fields);
            this.form = this.patientForm.getForm({
                patient: select_fields,
                hiddenFields: ['moid', 'status'],
            });
            this.Loading = false;
        });


    }

    formSubmitted(form) {
        this.patientService.addPatient(form.value).subscribe(() => {
            this.location.back();
        });
    }

}
