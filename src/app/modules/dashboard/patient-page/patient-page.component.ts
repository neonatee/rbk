import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

import {SwalComponent} from '@toverux/ngx-sweetalert2';
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import * as moment from 'moment';


import {AuthManagerService} from '../../../lib/service/auth-manager.service';
import {PatientService} from '../services/patient/patient.service';

import {PatientsTableColumns} from '../../../lib/interface/patient';

@Component({
    selector: 'crm-patient-page',
    templateUrl: './patient-page.component.html',
    styleUrls: ['./patient-page.component.scss']
})
export class PatientPageComponent implements AfterViewInit {
    displayedColumns = [];
    resultsLength = 0;
    isLoadingResults = true;
    isRateLimitReached = false;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    dataSource = new MatTableDataSource();
    @ViewChild('deleteSwal') private deleteSwal: SwalComponent;

    constructor(public authManager: AuthManagerService,
                public patientService: PatientService) {
    }


    ngAfterViewInit() {
        this.getPatients();
    }

    getDateFormat(date) {
        return moment.unix(date).format('DD.MM.YYYY HH:mm:ss');
    }

    getPatients() {
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);


        merge(this.sort.sortChange, this.paginator.page).pipe(
            startWith({}),
            switchMap(() => {
                this.isLoadingResults = true;

                return this.patientService.getPatients(
                    this.authManager.getIdentity().id,
                    this.sort.active,
                    this.sort.direction,
                    this.paginator.pageIndex,
                    this.paginator.pageSize
                );
            }),
            map(patients => {
                this.isLoadingResults = false;
                this.isRateLimitReached = false;
                this.resultsLength = patients.count;
                this.displayedColumns = PatientsTableColumns;
                return patients.data;
            }),
            catchError(() => {
                this.isLoadingResults = false;
                this.isRateLimitReached = true;
                return observableOf([]);
            })
        ).subscribe(data => this.dataSource.data = data);

    }

    deleteDoctor(id) {
        this.deleteSwal.options = {
            title: 'Are you sure?',
            text: 'This cannot be undone',
            type: 'question',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel!',
            showCancelButton: true
        };

        this.deleteSwal.show().then((result) => {
            if (result.value) {
                const sub = this.patientService.deletePatient(id).subscribe(() => {
                    this.deleteSwal.options = {
                        title: 'Deleted!',
                        text: 'Your file has been deleted.',
                        type: 'success',
                        confirmButtonText: 'Ok!!!...',
                        showCancelButton: false
                    };
                    this.deleteSwal.show();
                    setTimeout(() => {
                        this.getPatients();
                    }, 2000);
                    sub.unsubscribe();
                });
            } else if (result.dismiss) {
                this.deleteSwal.options = {
                    title: 'Cancelled',
                    text: 'Your imaginary file is safe :)',
                    type: 'error',
                    confirmButtonText: 'Ok!!!...',
                    showCancelButton: false
                };
                this.deleteSwal.show();
            }
        });

    }


}
