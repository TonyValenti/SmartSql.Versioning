import { Component, ElementRef, Input} from 'angular2/core';


@Component({
    selector: 'confirm',
    templateUrl: '../templates/directives/confirm.directive.html'
})
export class Confirm {
    @Input() onConfirm: () => void;
    @Input() onReject: () => void;

    constructor(private el: ElementRef) { }

    onClick() { this._openModal(); }

    private _openModal() {
        this.el.nativeElement;
    }

    confirm() {
        this.onConfirm();
    }

    reject() {
        this.onReject();
    }
}