import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'crm-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

    constructor(private titleService: Title) {
    }

    ngOnInit() {
        this.titleService.setTitle('Страница не найдена');
    }

}
