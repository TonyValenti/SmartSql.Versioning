import { Injectable } from 'angular2/core';

@Injectable()
export class ModalConfirmSvc {
    activate: (message?: string, title?: string, okBtnTxt?: string, cancelBtnTxt?: string) => Promise<boolean>;
}
