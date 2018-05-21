import {Location} from './location';
import {UserProfile} from './user';
import {Validators} from '@angular/forms';
import {Injectable} from '@angular/core';
import {AuthManagerService} from '../service/auth-manager.service';

export interface Doctors {
    id?: number;
    surname?: string;
    name?: string;
    patronymic?: string;
    location?: number;
    city?: string;
    medical_representative?: number;
    medical_representative_text?: string;
    status?: number;
    statusText?: string;
    phone?: string;
    created_at?: number;
    updated_at?: number;


    doctorPatients?: any;

    locationAll?: Location[];
    statusAll?: any;
    medical_representativeAll?: UserProfile[];

    doctorLocation?: Location;
    medicalRepresentative?: UserProfile;
}

export interface DoctorsTable {
    count?: number;
    data?: Doctors[];
}

export const DoctorsTableColumns = [
    'id',
    'location',
    // 'medical_representative',
    'surname',
    'name',
    'patronymic',
    // 'phone',
    'status',
    'created_at',
    'updated_at',
    'buttons'
];

export interface DoctorFormControlsI {
    type: string;
    label?: string;
    name: string;
    disabled?: boolean;
    value?: string | number;
    validators?: any;
    options?: any;
    placeholder?: string;
}

export interface DoctorFormI {
    doctor: any;
    disabledField?: any[];
    hiddenFields?: any[];
}


@Injectable({
    providedIn: 'root'
})
export class DoctorForm {

    public formsControl: DoctorFormControlsI[];

    constructor(private authManager: AuthManagerService) {

    }

    getForm(params: DoctorFormI) {

        const locationsAll = [];
        params.doctor.locationAll.forEach((location) => {
            locationsAll.push({
                value: location.id,
                text: location.city
            });
        });

        const statusAll = [];
        params.doctor.statusAll.forEach((status) => {
            statusAll.push({
                value: status.id,
                text: status.text
            });
        });

        const medical_representativeAll = [];
        params.doctor.medical_representativeAll.forEach((medical_representative) => {
            medical_representativeAll.push({
                value: medical_representative.id,
                text: medical_representative.name + ' ' + medical_representative.surname
            });
        });


        this.formsControl = [
            {
                type: 'text',
                label: 'Фамилия',
                name: 'surname',
                value: params.doctor.surname,
                validators: [Validators.required],
                placeholder: 'Enter your surname',
            },
            {
                type: 'text',
                label: 'Имя',
                name: 'name',
                value: params.doctor.name,
                validators: [Validators.required],
                placeholder: 'Enter your name',
            },
            {
                type: 'text',
                label: 'Отчество',
                name: 'patronymic',
                value: params.doctor.patronymic,
                validators: [Validators.required],
                placeholder: 'Enter your patronymic',
            },
            {
                type: 'text',
                label: 'Телефон',
                name: 'phone',
                value: params.doctor.phone,
                validators: [Validators.required],
                placeholder: 'Enter your phone',
            },
            {
                type: 'select',
                label: 'Мед представитель',
                name: 'medical_representative',
                value: params.doctor.medical_representative,
                validators: [Validators.required],
                options: medical_representativeAll,
                placeholder: 'Select an option'
            },
            {
                type: 'select',
                label: 'Город',
                name: 'location',
                value: params.doctor.location,
                validators: [Validators.required],
                options: locationsAll,
                placeholder: 'Select an option'
            },
            {
                type: 'select',
                label: 'Статус',
                name: 'status',
                value: params.doctor.status,
                validators: [Validators.required],
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