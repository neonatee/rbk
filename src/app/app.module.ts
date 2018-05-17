import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {AppComponent} from './app.component';
import {
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTooltipModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import {DashboardGuard} from './modules/dashboard/dashboard.guard';
import {AuthGuard} from './modules/auth/auth.guard';


import {AuthComponent} from './modules/auth/auth.component';
import {DashboardComponent} from './modules/dashboard/dashboard.component';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {ComponentsModule} from './lib/components/components.module';


@NgModule({
    declarations: [
        AppComponent,
        AuthComponent,
        DashboardComponent
    ],
    imports: [
        AppRoutingModule,
        ComponentsModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        MatTableModule,
        MatInputModule,
        MatPaginatorModule,
        MatSortModule
    ],
    providers: [
        DashboardGuard,
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule{

}
