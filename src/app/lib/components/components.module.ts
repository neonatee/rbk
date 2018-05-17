import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {FooterComponent} from './footer/footer.component';
import {NavbarComponent} from './navbar/navbar.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {LoaderComponent} from './loader/loader.component';
import {LoadersCssModule} from 'angular2-loaders-css';
import {MatProgressSpinnerModule} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        LoadersCssModule,
        MatProgressSpinnerModule
    ],
    declarations: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        LoaderComponent
    ],
    exports: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        LoaderComponent
    ]
})
export class ComponentsModule {
}
