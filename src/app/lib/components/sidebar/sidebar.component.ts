import {Component, OnInit} from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import {UserService} from '../../../modules/dashboard/services/user/user.service';
import {UserProfile} from '../../interface/user';
import {AuthManagerService} from '../../service/auth-manager.service';


declare const $: any;


export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    canAccess?: string;
    icontype: string;
    collapse?: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    canAccess?: string;
    ab: string;
    type?: string;
}


export const ROUTES: RouteInfo[] = [
    {
        path: 'main',
        title: 'Main',
        type: 'link',
        canAccess: 'dashboard',
        icontype: 'dashboard'
    },
    {
        path: 'doctors',
        title: 'Врачи',
        type: 'sub',
        canAccess: 'doctors',
        icontype: 'person',
        collapse: 'doctors',
        children: [
            {path: 'doctors',  title: 'Все врачи', ab: 'ВВ'},
            {path: 'doctors/create', canAccess: 'doctors/create', title: 'Добавить врача', ab: 'ДВ'}
        ]
    },
    {
        path: 'patients',
        title: 'Пациенты',
        type: 'sub',
        canAccess: 'patients',
        icontype: 'assignment_ind',
        collapse: 'patients',
        children: [
            {path: 'patients',  title: 'Все пациенты', ab: 'ВП'},
            {path: 'patients/create', canAccess: 'patients/create', title: 'Добавить пациента', ab: 'ДП'}
        ]
    },
    {
        path: '/components',
        title: 'Components',
        canAccess: 'dashboard',
        type: 'sub',
        icontype: 'apps',
        collapse: 'components',
        children: [
            {path: 'buttons', title: 'Buttons', ab: 'B'}
        ]
    }
];

@Component({
    selector: 'crm-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    public menuItems = [];
    public profile: UserProfile;
    Loading = true;

    constructor(private userServise: UserService,
                private authManager: AuthManagerService) {
    }

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    }

    ngOnInit() {
        this.userServise.getProfile().subscribe((profile) => {
            this.profile = profile;
            this.Loading = false;
        });
        ROUTES.forEach((menuItem) => {
            if (this.authManager.can(menuItem.canAccess)) {
                this.menuItems.push(menuItem);
            }
        });
    }

    updatePS(): void {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
            let ps = new PerfectScrollbar(elemSidebar, {wheelSpeed: 2, suppressScrollX: true});
        }
    }

    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }


}
