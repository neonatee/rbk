import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild} from '@angular/router';

import {AuthManagerService} from '../../lib/service/auth-manager.service';

import {AuthService} from '../auth/service/auth.service';
import {Observable, Subject} from 'rxjs';


@Injectable()
export class DashboardGuard implements CanActivate, CanActivateChild {
    constructor(public authManager: AuthManagerService,
                private router: Router,
                private authService: AuthService) {
    }

    public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

        if (!this.authManager.isLogged()) {
            this.router.navigate(['/auth']);
            return Observable.of(true);
        }

        const subject = new Subject<boolean>();

        this.authService.getPermissionsByUser(this.authManager.getIdentity().id).subscribe((permissions) => {
            console.log(next.routeConfig.path);
            this.authManager.setPermissions(permissions);
            if (!this.authManager.can(next.routeConfig.path)) {
                this.router.navigate(['dashboard/access-denied']);
                subject.next(true);
                subject.complete();
            } else {
                subject.next(true);
                subject.complete();
            }
        });
        return subject;
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.canActivate(childRoute, state);
    }
}
