import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {AuthManagerService} from '../../../../lib/service/auth-manager.service';
import {ActivatedRoute, Params} from '@angular/router';
import {DoctorForm} from '../../../../lib/interface/doctors';
import {Location} from '@angular/common';
import {PatientService} from '../../services/patient/patient.service';
import {PatientForm} from '../../../../lib/interface/patient';

@Component({
  selector: 'crm-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.scss']
})
export class PatientEditComponent implements OnInit {

    form = [];
    Loading = true;

    id: number;

    constructor(public patientService: PatientService,
                private authManager: AuthManagerService,
                private activatedRoute: ActivatedRoute,
                private location: Location,
                private patientForm: PatientForm) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.id = params['id'];
        });
        this.patientService.getPatient(this.id, true).subscribe((patient) => {
            this.form = this.patientForm.getForm({
                patient: patient,
                // hiddenFields: ['representative'],
            });

            this.Loading = false;
        });

    }

    formSubmitted(form) {
        this.patientService.editPatient(this.id, form.value).subscribe((patient) => {
            this.location.back();
        });
    }

}
