import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
@Component({
    selector: 'crm-input-select',
    templateUrl: './input-select.component.html',
    styleUrls: ['./input-select.component.scss']
})
export class InputSelectComponent {
    config;
    group: FormGroup;

    constructor(){

    }



    getErrorMessage(controlName) {
        return this.group.get(controlName).hasError('required') ? 'You must enter a value' : '';
    }
}
