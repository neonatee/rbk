import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../service/auth.service';
import {Router} from '@angular/router';


declare const $: any;

interface FileReaderEventTarget extends EventTarget {
    result: string;
}

interface FileReaderEvent extends Event {
    target: FileReaderEventTarget;

    getMessage(): string;
}

@Component({
    selector: 'crm-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
    Loading = false;
    form: FormGroup;
    formCode: FormGroup;
    formCodeError = {auth_code: undefined};
    successCode = false;

    constructor(private formBuilder: FormBuilder,
                private authService: AuthService,
                private router: Router) {
    }

    loadKey(files: FileList) {
        const myReader: FileReader = new FileReader();
        if (files.item(0)) {
            myReader.readAsText(files.item(0));
            myReader.onloadend = function (e) {
                const picture = document.getElementsByClassName('picture')[0];
                picture.classList.add('unlock');
                window.sessionStorage.setItem('secretKey', myReader.result);
                // Cookie.set('secretKey', myReader.result, .1);
            };
        } else {
            myReader.onloadend = function (e) {
                const picture = document.getElementsByClassName('picture')[0];
                window.sessionStorage.removeItem('secretKey');
                // Cookie.delete('secretKey');
                picture.classList.remove('unlock');
            };
        }
    }

    checkSuccessForm() {
        if (this.form.valid && window.sessionStorage.getItem('secretKey')) {
            return false;
        } else {
            return true;
        }
    }

    ngOnInit() {
        if (!window.sessionStorage.getItem('successCode')) {
            this.form = this.formBuilder.group({
                username: [null, [Validators.required, Validators.minLength(5)]],
                password: [null, [Validators.required, Validators.minLength(5)]]
            });
        } else {
            this.formCode = this.formBuilder.group({
                auth_code: [null, [Validators.required, Validators.minLength(6)]]
            });
            this.successCode = true;
        }


        const body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');
    }


    onSubmit() {
        this.Loading = true;
        this.authService.login(this.form.value).subscribe(
            success => {
                if (success.status === 'success') {
                    this.formCode = this.formBuilder.group({
                        auth_code: [null, [Validators.required, Validators.minLength(6)]]
                    });
                    this.successCode = true;

                    window.sessionStorage.setItem('successCode', JSON.stringify(true));

                }
                this.Loading = false;
            }
        );

    }

    onSubmitCode() {
        this.Loading = true;
        this.authService.code(this.formCode.value).subscribe(
            user => {
                if (user.identity) {
                    window.sessionStorage.setItem('user', JSON.stringify(user.identity));
                    window.sessionStorage.removeItem('successCode');
                    this.router.navigate(['/dashboard']);
                } else {
                    this.formCodeError.auth_code = user.status;
                }
                this.Loading = false;
            }
        );

    }


    ngOnDestroy() {
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');
    }
}
