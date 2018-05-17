import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'crm-input-text',
    templateUrl: './input-text.component.html',
    styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent {
    config;
    group: FormGroup;



    getErrorMessage(controlName) {
        return this.group.get(controlName).hasError('required') ? 'You must enter a value' : '';
    }
}
