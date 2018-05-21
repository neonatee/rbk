import {AuthManagerService} from '../service/auth-manager.service';
import {Injectable} from '@angular/core';
import {Validators} from '@angular/forms';
import {Location} from './location';
import {UserProfile} from './user';
import {Doctors} from './doctors';

export interface Patient {
    id?: number;
    surname?: string;
    name?: string;
    patronymic?: string;
    location?: number;
    city?: string;
    representative?: number;
    representative_text?: string;
    comment?: string;
    moid?: string;
    status?: number;
    statusText?: string;
    phone?: string;
    created_at?: number;
    updated_at?: number;


    locationAll?: Location[];
    statusAll?: any;
    doctorAll?: Doctors[];

    patientLocation?: Location;
    doctorsRepresentative?: UserProfile;
}


export const PatientsTableColumns = [
    'id',
    'surname',
    'name',
    'patronymic',
    'phone',
    'status',
    'moid',
    'comment',
    'location',
    'representative',
    // 'created_at',
    'updated_at',
    'buttons'
];


export interface PatientFormControlsI {
    type: string;
    label?: string;
    name: string;
    disabled?: boolean;
    value?: string | number;
    validators?: any;
    options?: any;
    placeholder?: string;
}

export interface PatientFormI {
    patient: any;
    disabledField?: any[];
    hiddenFields?: any[];
}


@Injectable({
    providedIn: 'root'
})
export class PatientForm {

    public formsControl: PatientFormControlsI[];

    constructor() {

    }

    getForm(params: PatientFormI) {

        const locationsAll = [];
        params.patient.locationAll.forEach((location) => {
            locationsAll.push({
                value: location.id,
                text: location.city
            });
        });

        const statusAll = [];
        params.patient.statusAll.forEach((status) => {
            statusAll.push({
                value: status.id,
                text: status.text
            });
        });

        const doctorAll = [];
        params.patient.doctorAll.forEach((doctor) => {
            doctorAll.push({
                value: doctor.id,
                text: doctor.name + ' ' + doctor.surname
            });
        });


        this.formsControl = [
            {
                type: 'text',
                label: 'Фамилия',
                name: 'surname',
                value: params.patient.surname,
                validators: [Validators.required],
                placeholder: 'Enter your surname',
            },
            {
                type: 'text',
                label: 'Имя',
                name: 'name',
                value: params.patient.name,
                validators: [Validators.required],
                placeholder: 'Enter your name',
            },
            {
                type: 'text',
                label: 'Отчество',
                name: 'patronymic',
                value: params.patient.patronymic,
                placeholder: 'Enter your patronymic',
            },
            {
                type: 'text',
                label: 'Телефон',
                name: 'phone',
                value: params.patient.phone,
                placeholder: 'Enter your phone',
            },
            {
                type: 'text',
                label: 'Коментарий',
                name: 'comment',
                value: params.patient.comment,
                placeholder: 'Enter your comment',
            },
            {
                type: 'text',
                label: 'MOID',
                name: 'moid',
                value: params.patient.moid,
                placeholder: 'Enter your moid',
            },
            {
                type: 'select',
                label: 'Врач',
                name: 'representative',
                value: params.patient.representative,
                validators: [Validators.required],
                options: doctorAll,
                placeholder: 'Select an option'
            },
            {
                type: 'select',
                label: 'Город',
                name: 'location',
                value: params.patient.location,
                options: locationsAll,
                placeholder: 'Select an option'
            },
            {
                type: 'select',
                label: 'Статус',
                name: 'status',
                value: params.patient.status,
                options: statusAll,
                placeholder: 'Select an option'
            },
            {
                label: 'Сохранить',
                name: 'submit',
                type: 'button',
            }

        ];

        this.formsControl.forEach((control, index) => {

            if (params.disabledField) {
                params.disabledField.forEach((key) => {
                    if (key === control.name) {
                        control.disabled = true;
                    }
                });
            }

            if (params.hiddenFields) {
                params.hiddenFields.forEach((key) => {
                    if (key === control.name) {
                        this.formsControl.splice(index, 1);
                    }
                });


            }

        });

        return this.formsControl;
    }
}

