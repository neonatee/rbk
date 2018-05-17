import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user/user.service';
import {DoctorForm, Doctors} from '../../../../../lib/interface/doctors';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import {AuthManagerService} from '../../../../../lib/service/auth-manager.service';

@Component({
    selector: 'crm-user-doctor-edit',
    templateUrl: './user-doctor-edit.component.html',
    styleUrls: ['./user-doctor-edit.component.scss']
})
export class UserDoctorEditComponent implements OnInit {

    form = [];
    Loading = true;

    id: number;

    constructor(private userServise: UserService,
                private authManager: AuthManagerService,
                private activatedRoute: ActivatedRoute,
                private location: Location,
                private doctorForm: DoctorForm) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.id = params['id'];
        });
        this.userServise.getDoctor(this.id, true).subscribe((doctor) => {
            this.form = this.doctorForm.getForm({
                doctor: doctor,
                hiddenFields: ['medical_representative'],
            });

            this.Loading = false;
        });

    }

    formSubmitted(form) {
        this.userServise.editDoctor(this.id, form.value).subscribe((doctor) => {
            this.location.back();
        });
    }

}
