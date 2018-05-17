import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthManagerService} from '../../../service/auth-manager.service';

@Component({
    selector: 'crm-form-creator',
    templateUrl: './form-creator.component.html',
    styleUrls: ['./form-creator.component.scss']
})
export class FormCreatorComponent implements OnInit {

    @Output() submitted: EventEmitter<any> = new EventEmitter<any>();

    @Input() config: any[] = [];

    form: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.form = this.createGroup();
    }

    createGroup() {
        const group = this.fb.group({});
        this.config.forEach(control => group.addControl(control.name, this.fb.control({value: control.value, disabled: control.disabled}, control.validators)));
        return group;
    }

}
