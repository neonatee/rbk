import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {ComponentsModule} from '../../lib/components/components.module';
import {MainPageComponent} from './main-page/main-page.component';
import {UserPageComponent} from './user-page/user-page.component';
import {UserProfileComponent} from './user-page/user-profile/user-profile.component';


import {UserDoctorsComponent} from './user-page/user-doctors/user-doctors.component';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule, MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule
} from '@angular/material';
import {UserDoctorEditComponent} from './user-page/user-doctors/user-doctor-edit/user-doctor-edit.component';
import {ReactiveFormsModule} from '@angular/forms';

import {FormCreatorModule} from '../../lib/modules/form-creator/form-creator.module';
import {UserDoctorCreateComponent} from './user-page/user-doctors/user-doctor-create/user-doctor-create.component';
import {AccessDeniedComponent} from './access-denied/access-denied.component';
import { NotFoundComponent } from './not-found/not-found.component';

import {SweetAlert2Module} from '@toverux/ngx-sweetalert2';
import { PatientPageComponent } from './patient-page/patient-page.component';
import { PatientCreateComponent } from './patient-page/patient-create/patient-create.component';
import { PatientEditComponent } from './patient-page/patient-edit/patient-edit.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DashboardRoutingModule,
        FormCreatorModule,
        ComponentsModule,
        SweetAlert2Module.forRoot(),
        MatProgressSpinnerModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        MatSortModule,
        MatTableModule,
        MatPaginatorModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatFormFieldModule
    ],
    declarations: [
        MainPageComponent,
        UserPageComponent,
        UserProfileComponent,
        UserDoctorsComponent,
        UserDoctorEditComponent,
        UserDoctorCreateComponent,
        AccessDeniedComponent,
        NotFoundComponent,
        PatientPageComponent,
        PatientCreateComponent,
        PatientEditComponent
    ]
})
export class DashboardModule {
}
