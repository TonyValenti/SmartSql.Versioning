import { Component, Input, Inject, OnInit, AfterViewInit} from 'angular2/core';
import { FORM_DIRECTIVES } from 'angular2/common';
import { Router, RouteParams } from 'angular2/router';

import { BaseComponent } from '../components/Base.component';
import { Person } from '../models/Person';
import { ServerAPI } from '../services/ServerAPI.service';

@Component({
    selector: 'selected-person',
    templateUrl: '../app/templates/selectedPerson.html',
    directives: [FORM_DIRECTIVES]
})
export class SelectedPersonDirective extends BaseComponent implements OnInit, AfterViewInit {

    // Prop from parent component
    @Input() selectedPerson: Person;

    instanceId: string;
    isAdd: boolean;

    constructor( @Inject(ServerAPI) private _serverAPI, private _routeParams: RouteParams) { super(); }

    ngOnInit() {
        this.instanceId = this._routeParams.get('instanceId');
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
    }

    openChangeName(event, isAdd) {
        event.preventDefault();
        this.isAdd = isAdd;
        $('#editPersonNameModal').modal('show');
    }

    closeChangeName(event, txtName: HTMLInputElement) {
        event.preventDefault();
        txtName.value = this.selectedPerson.name;
        $('#editPersonNameModal').modal('hide');
    }

    changeName(event, txtNameVal, txtAddNameVal) {
        event.preventDefault();

        if (this.isAdd) {
            this._serverAPI.addPerson(txtAddNameVal).subscribe(p => console.log(p), error => alert(`Server error. Try again later`));
        } else {
            this._serverAPI.updatePerson(this.instanceId, txtNameVal).subscribe(p => console.log(p), error => alert(`Server error. Try again later`));
            this.selectedPerson.name = txtNameVal;
        }

        $('#editPersonNameModal').modal('hide');
    }
}