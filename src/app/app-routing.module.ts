import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthComponent} from './modules/auth/auth.component';
import {AuthGuard} from './modules/auth/auth.guard';
import {DashboardComponent} from './modules/dashboard/dashboard.component';
import {DashboardGuard} from './modules/dashboard/dashboard.guard';




const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'auth'},
    {
        path: 'auth',
        loadChildren: './modules/auth/auth.module#AuthModule',
        component: AuthComponent,
        canActivate: [AuthGuard]
        // loadChildren: () => AuthModule
    },
    {
        path: 'dashboard',
        loadChildren: './modules/dashboard/dashboard.module#DashboardModule',
        component: DashboardComponent,
        canActivate: [DashboardGuard],
        canActivateChild: [DashboardGuard]
        // loadChildren: () => DashboardModule
    }


];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}


