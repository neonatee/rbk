import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {DoctorForm} from '../../../../../lib/interface/doctors';
import {UserService} from '../../../services/user/user.service';
import {AuthManagerService} from '../../../../../lib/service/auth-manager.service';

@Component({
    selector: 'crm-user-doctor-create',
    templateUrl: './user-doctor-create.component.html',
    styleUrls: ['./user-doctor-create.component.scss']
})
export class UserDoctorCreateComponent implements OnInit {

    form = [];
    Loading = true;

    id: number;

    constructor(private userServise: UserService,
                private location: Location,
                private authManager: AuthManagerService,
                private doctorForm: DoctorForm) {
    }

    ngOnInit() {
        this.userServise.getDoctorSelectFields().subscribe((select_fields) => {

            this.form = this.doctorForm.getForm({
                doctor: select_fields,
                hiddenFields: ['medical_representative'],
            });
            this.Loading = false;
        });


    }

    formSubmitted(form) {
        this.userServise.addDoctor(form.value).subscribe(() => {
            this.location.back();
        });
    }

}
