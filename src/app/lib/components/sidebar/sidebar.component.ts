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
        path: 'user',
        title: 'User',
        type: 'link',
        canAccess: 'dashboard',
        icontype: 'person'
    },
    {
        path: '/components',
        title: 'Components',
        canAccess: 'dashboard',
        type: 'sub',
        icontype: 'apps',
        collapse: 'components',
        children: [
            {path: 'buttons', title: 'Buttons', ab: 'B'},
            {path: 'grid', title: 'Grid System', ab: 'GS'},
            {path: 'panels', title: 'Panels', ab: 'P'},
            {path: 'sweet-alert', title: 'Sweet Alert', ab: 'SA'},
            {path: 'notifications', title: 'Notifications', ab: 'N'},
            {path: 'icons', title: 'Icons', ab: 'I'},
            {path: 'typography', title: 'Typography', ab: 'T'}
        ]
    }, {
        path: '/forms',
        title: 'Forms',
        type: 'sub',
        icontype: 'content_paste',
        collapse: 'forms',
        children: [
            {path: 'regular', title: 'Regular Forms', ab: 'RF'},
            {path: 'extended', title: 'Extended Forms', ab: 'EF'},
            {path: 'validation', title: 'Validation Forms', ab: 'VF'},
            {path: 'wizard', title: 'Wizard', ab: 'W'}
        ]
    }, {
        path: '/tables',
        title: 'Tables',
        type: 'sub',
        icontype: 'grid_on',
        collapse: 'tables',
        children: [
            {path: 'regular', title: 'Regular Tables', ab: 'RT'},
            {path: 'extended', title: 'Extended Tables', ab: 'ET'},
            {path: 'datatables.net', title: 'Datatables.net', ab: 'DT'}
        ]
    }, {
        path: '/maps',
        title: 'Maps',
        type: 'sub',
        icontype: 'place',
        collapse: 'maps',
        children: [
            {path: 'google', title: 'Google Maps', ab: 'GM'},
            {path: 'fullscreen', title: 'Full Screen Map', ab: 'FSM'},
            {path: 'vector', title: 'Vector Map', ab: 'VM'}
        ]
    }, {
        path: '/widgets',
        title: 'Widgets',
        type: 'link',
        icontype: 'widgets'

    }, {
        path: '/charts',
        title: 'Charts',
        type: 'link',
        icontype: 'timeline'

    }, {
        path: '/calendar',
        title: 'Calendar',
        type: 'link',
        icontype: 'date_range'
    }, {
        path: '/pages',
        title: 'Pages',
        type: 'sub',
        icontype: 'image',
        collapse: 'pages',
        children: [
            {path: 'pricing', title: 'Pricing', ab: 'P'},
            {path: 'timeline', title: 'Timeline Page', ab: 'TP'},
            {path: 'login', title: 'Login Page', ab: 'LP'},
            {path: 'register', title: 'Register Page', ab: 'RP'},
            {path: 'lock', title: 'Lock Screen Page', ab: 'LSP'},
            {path: 'user', title: 'User Page', ab: 'UP'}
        ]
    }, {
        path: '/documentation/tutorial',
        title: 'Documentation',
        type: 'link',
        icontype: 'school'
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
