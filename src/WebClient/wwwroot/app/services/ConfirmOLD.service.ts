import {Injectable, Inject, Component} from 'angular2/core';

@Injectable()
export class ClothingSvc {

    constructor() { }

    openConfirm(
        modalId: string,
        title: string,
        body: string,
        okBtnText: string,
        cancelBtnText: string,
        okCallback: () => void,
        cancelCallback: () => void) {

        console.log(modalId);

        var mdlConfirmHtml = `<div id=` + modalId + ` class="modal-dialog" style="width:400px">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3>`+ title + `</h3>
                        </div>
                        <div class="modal-body">
                            <p>`+ body + `</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn mdlConfirmCancel">
                                `+ okBtnText + `
                            </button>
                            <button class="btn btn-primary mdlConfirmOk">
                                `+ cancelBtnText + `
                            </button>
                        </div>
                    </div>
                </div>`

        $('body').append(mdlConfirmHtml);



        okCallback();
        cancelCallback();
    }
}

