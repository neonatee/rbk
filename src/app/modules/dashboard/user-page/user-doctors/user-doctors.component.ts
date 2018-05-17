import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {UserService} from '../../services/user/user.service';

import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {DoctorsTableColumns} from '../../../../lib/interface/doctors';

import * as moment from 'moment';
import {AuthManagerService} from '../../../../lib/service/auth-manager.service';


@Component({
    selector: 'crm-user-doctors',
    templateUrl: './user-doctors.component.html',
    styleUrls: ['./user-doctors.component.scss']
})
export class UserDoctorsComponent implements OnInit, AfterViewInit {
    displayedColumns = [];
    resultsLength = 0;
    isLoadingResults = true;
    isRateLimitReached = false;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    dataSource = new MatTableDataSource();

    constructor(public authManager: AuthManagerService,
                public userServise: UserService) {
    }


    getDateFormat(date) {
        return moment.unix(date).format('DD.MM.YYYY HH:mm:ss');
    }

    ngAfterViewInit() {

    }

    ngOnInit(): void {
      this.getDoctors();
    }

    getDoctors(){
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);


        merge(this.sort.sortChange, this.paginator.page).pipe(
            startWith({}),
            switchMap(() => {
                this.isLoadingResults = true;
                return this.userServise.getDoctors(
                    this.authManager.getIdentity().id,
                    this.sort.active,
                    this.sort.direction,
                    this.paginator.pageIndex,
                    this.paginator.pageSize
                );
            }),
            map(doctors => {
                this.isLoadingResults = false;
                this.isRateLimitReached = false;
                this.resultsLength = doctors.count;
                this.displayedColumns = DoctorsTableColumns;
                return doctors.data;
            }),
            catchError(() => {
                this.isLoadingResults = false;
                this.isRateLimitReached = true;
                return observableOf([]);
            })
        ).subscribe(data => this.dataSource.data = data);

    }

    deleteDoctor(id) {
        const sub = this.userServise.deleteDoctor(id).subscribe(() => {
           this.getDoctors();
            sub.unsubscribe();
        });
    }

}
