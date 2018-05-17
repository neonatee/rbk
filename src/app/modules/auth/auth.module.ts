import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {LoginPageComponent} from './login-page/login-page.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material';
import {ComponentsModule} from '../../lib/components/components.module';

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        ComponentsModule,
        ReactiveFormsModule,
        MatFormFieldModule
    ],
    declarations: [
        LoginPageComponent
    ]
})
export class AuthModule {
}
