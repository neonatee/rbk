import {ComponentFactoryResolver, Directive, Input, OnInit, ViewContainerRef} from '@angular/core';
import {InputButtonComponent} from './form-creator/input-button/input-button.component';
import {InputTextComponent} from './form-creator/input-text/input-text.component';
import {InputSelectComponent} from './form-creator/input-select/input-select.component';
import {FormGroup} from '@angular/forms';


const components = {
    button: InputButtonComponent,
    text: InputTextComponent,
    select: InputSelectComponent
};

@Directive({
    selector: '[crmFormCreator]'
})
export class FormCreatorDirective implements OnInit {
    @Input() config;

    @Input() group: FormGroup;

    component;

    constructor(private resolver: ComponentFactoryResolver,
                private container: ViewContainerRef) {
    }

    ngOnInit() {
        const component = components[this.config.type];
        const factory = this.resolver.resolveComponentFactory<any>(component);
        this.component = this.container.createComponent(factory);
        this.component.instance.config = this.config;
        this.component.instance.group = this.group;
    }

}
