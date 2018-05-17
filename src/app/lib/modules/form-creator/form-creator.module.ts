import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule
} from '@angular/material';


import {FormCreatorComponent} from './form-creator/form-creator.component';
import {InputTextComponent} from './form-creator/input-text/input-text.component';
import {InputButtonComponent} from './form-creator/input-button/input-button.component';
import {InputSelectComponent} from './form-creator/input-select/input-select.component';
import {FormCreatorDirective} from './form-creator.directive';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatSelectModule
    ],
    declarations: [
        FormCreatorDirective,
        FormCreatorComponent,
        InputTextComponent,
        InputButtonComponent,
        InputSelectComponent
    ],
    entryComponents: [
        InputTextComponent,
        InputButtonComponent,
        InputSelectComponent
    ],
    exports: [FormCreatorComponent],
})
export class FormCreatorModule {
}
