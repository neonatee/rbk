import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'crm-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.scss']
})
export class AccessDeniedComponent implements OnInit {

    constructor(private titleService: Title) {
    }

    ngOnInit() {
        this.titleService.setTitle('Доступ запрещен!');
    }
}
