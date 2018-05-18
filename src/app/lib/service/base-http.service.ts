import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Security} from '../class/security';
import {Headers} from '@angular/http';
import {NavigationExtras, Router} from '@angular/router';

declare var $: any;

export class BaseHttpService {

    private apiServer = 'https://api-server/';

    constructor(public http: HttpClient,
                public security: Security,
                public router: Router) {
    }

    public get(url: string, params?: any) {
        return this.http.get(this.createUrl(url, params), {
            headers: this.getHeaders()
        }).map((event) => {
            console.log(this.security.deCrypt(event));
            return this.security.deCrypt(event);
        }).catch((error) => {
            console.log(error);
            this.showNotification(error);
            return Observable.empty();
        });

    }

    public post(url: string, data: any): Observable<any> {
        return this.http.post(this.createUrl(url), this.security.enCrypt(data), {
            headers: this.getHeaders()
        }).map(event => {
            // console.log(event);
            console.log(this.security.deCrypt(event));
            return this.security.deCrypt(event);
        }).catch((error) => {
            console.log(event);
            this.showNotification(error);
            return Observable.empty();
        });

    }

    public put(url: string, data: any): Observable<any> {
        return this.http.put(this.createUrl(url), this.security.enCrypt(data), {
            headers: this.getHeaders()
        }).map(event => {
            console.log(this.security.deCrypt(event));
            return this.security.deCrypt(event);
        }).catch((error) => {
            console.log(error);
            this.showNotification(error);


            return Observable.empty();
        });

    }

    public delete(url: string, params?: any) {
        return this.http.delete(this.createUrl(url, params), {
            headers: this.getHeaders()
        }).map((event) => {
            return this.security.deCrypt(event);
        }).catch((error) => {
            console.log(error);
            this.deleteNotification(error);
            return Observable.empty();
        });

    }

    public deleteNotification(message, from = 'bottom', align = 'right') {

        $.notify({
            icon: 'notifications',
            message: `${message.statusText} ${message.status} `

        }, {
            type: 'danger',
            timer: 4000,
            placement: {
                from: from,
                align: align
            }
        });


    }

    public showNotification(message, from = 'bottom', align = 'right') {

        window.localStorage.setItem('saveUrl', this.router.url);
        if (message.status === 401) {
            this.security.isUnauthorized();
            window.location.href = '/auth?authlog=error';
        }
        if (message.status === 403) {
            return this.router.navigate(['dashboard/access-denied']);
        }
        if (message.status === 404) {
            return this.router.navigate(['dashboard/not-found']);
        }

        $.notify({
            icon: 'notifications',
            message: `${message.name} ${message.status} `

        }, {
            type: 'danger',
            timer: 4000,
            placement: {
                from: from,
                align: align
            }
        });


    }

    private getHeaders() {

        if (window.sessionStorage.getItem('user')) {
            const header = new Headers();
            header.append('Authorization', 'Bearer ' + JSON.parse(window.sessionStorage.getItem('user')).auth_key);
            const headers = new HttpHeaders(header.toJSON());
            return headers;
        }
    }

    private createUrl(url: string, params: any = {}): string {
        return this.apiServer + url + this.getQueryParam(params);
    }

    private getQueryParam(params?: any) {
        let query = '';

        if (params.expand || params.page) {
            query = '?';
        }


        if (params.expand) {
            query += '&expand=' + params.expand;
        }

        if (params.page) {
            if (params.page.pageSize) {
                query += '&per-page=' + params.page.pageSize;
            }
            if (params.page.pageIndex) {
                query += '&page=' + (params.page.pageIndex + 1);
            }
            if (params.page.sort_direction) {
                if (params.page.sort_direction === 'asc') {
                    query += '&sort=' + params.page.sort_active;
                } else {
                    query += '&sort=-' + params.page.sort_active;
                }
            }
        }

        return query;
    }

}
