import {Component, AfterViewInit, ElementRef} from 'angular2/core';

@Component({})
export class BaseComponent implements AfterViewInit {
    constructor() { }

    ngAfterViewInit() {
        console.log("called Base component ngAfterViewInit");
        setTimeout(function () {
            $(".modal").on('shown.bs.modal', function () {
                $(this).find('input:first:visible').focus();
            }); //Focus
        });
    }
}
