import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainPageComponent} from './main-page/main-page.component';
import {UserPageComponent} from './user-page/user-page.component';
import {UserProfileComponent} from './user-page/user-profile/user-profile.component';
import {UserDoctorsComponent} from './user-page/user-doctors/user-doctors.component';
import {UserDoctorEditComponent} from './user-page/user-doctors/user-doctor-edit/user-doctor-edit.component';
import {UserDoctorCreateComponent} from './user-page/user-doctors/user-doctor-create/user-doctor-create.component';
import {AccessDeniedComponent} from './access-denied/access-denied.component';
import {NotFoundComponent} from './not-found/not-found.component';

const routes: Routes = [
    {path: '', redirectTo: 'main', pathMatch: 'full'},
    {path: 'main', component: MainPageComponent},
    {path: 'user', component: UserPageComponent},
    {path: 'user/profile/:id', component: UserProfileComponent},
    {path: 'doctors', component: UserDoctorsComponent},
    {path: 'doctors/edit/:id', component: UserDoctorEditComponent},
    {path: 'doctors/create', component: UserDoctorCreateComponent},
    {path: 'access-denied', component: AccessDeniedComponent},
    {path: '**', component: NotFoundComponent}

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {
}
