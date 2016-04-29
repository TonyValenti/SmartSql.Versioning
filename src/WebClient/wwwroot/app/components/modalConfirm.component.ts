import { Component, OnInit } from 'angular2/core';

import { ModalConfirmSvc } from '../services/ModalConfirm.service';

const KEY_ESC = 27;

@Component({
    selector: 'modal-confirm',
    templateUrl: '../app/templates/modalConfirm.html'
})
export class ModalConfirm implements OnInit {

    private _defaults = {
        title: 'Confirmation',
        message: 'Do you really want to delete this item?',
        cancelText: 'Cancel',
        okText: 'OK'
    };

    title: string;
    message: string;
    okText: string;
    cancelText: string;
    negativeOnClick: (e: any) => void;
    positiveOnClick: (e: any) => void;

    private _modalElement: any;
    private _cancelButton: any;
    private _okButton: any;

    constructor(modalService: ModalConfirmSvc) {
        modalService.activate = this.activate.bind(this);
    }

    activate(
        message = this._defaults.message,
        title = this._defaults.title,
        okText = this._defaults.okText,
        cancelText = this._defaults.cancelText) {

        this.title = title;
        this.message = message;
        this.okText = okText;
        this.cancelText = cancelText;

        let promise = new Promise<boolean>((resolve, reject) => {
            this.negativeOnClick = (e: any) => resolve(false);


            this.positiveOnClick = (e: any) => resolve(true);

            this._show();
        });

        return promise;
    }

    ngOnInit() {
        this._modalElement = document.getElementById('confirmationModal');
        this._cancelButton = document.getElementById('cancelButton');
        this._okButton = document.getElementById('okButton');
    }

    private _show() {
        document.onkeyup = null;

        if (!this._modalElement || !this._cancelButton || !this._okButton) return;

        this._cancelButton.onclick = ((e: any) => {
            e.preventDefault();

            if (!this.negativeOnClick(e)) {
                this._hideDialog();
            }
        });

        this._okButton.onclick = ((e: any) => {
            e.preventDefault();

            if (!this.positiveOnClick(e)) {
                this._hideDialog();
            }
        });

        this._modalElement.onclick = () => {
            this._hideDialog();
            return this.negativeOnClick(null);
        };

        document.onkeyup = (e: any) => {
            if (e.which == KEY_ESC) {
                this._hideDialog();
                return this.negativeOnClick(null);
            }
        };

        $(this._modalElement).modal("show");
    }

    private _hideDialog() {
        document.onkeyup = null;

        $(this._modalElement).modal("hide");
    }
}
