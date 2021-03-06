import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {User} from '../../../../lib/interface/user';
import {AuthManagerService} from '../../../../lib/service/auth-manager.service';
import {Title} from '@angular/platform-browser';


@Component({
    selector: 'crm-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {


    Loading = true;
    user: User;


    constructor(private userServise: UserService,
                private titleService: Title) {}


    ngOnInit() {
        this.userServise.getUser().subscribe((user) => {
            this.user = user;
            this.titleService.setTitle('Профиль: ' + this.user.profile.name + ' ' + this.user.profile.surname);
            this.Loading = false;
        });


    }


}
