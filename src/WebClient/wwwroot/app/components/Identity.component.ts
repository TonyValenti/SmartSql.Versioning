import {Component, Inject, OnInit, AfterViewInit} from 'angular2/core';

import { BaseComponent } from '../components/Base.component';
import {Person} from '../models/Person';
import {eyeColors} from '../models/eyeColors';
import {PersonDetailDirective} from '../directives/PersonDetail.directive';
import {SelectedPersonDirective} from '../directives/SelectedPerson.directive';
import {ServerAPI} from '../services/ServerAPI.service';

import {RouteParams, Router} from 'angular2/router';

@Component({
    selector: 'identity',
    templateUrl: '../app/templates/identityComp.html',
    directives: [PersonDetailDirective, SelectedPersonDirective]
})
export class Identity extends BaseComponent  implements OnInit, AfterViewInit {

    selectedDude: Person;
    activePersonEl: HTMLElement;

    constructor( @Inject(ServerAPI) private _serverAPI, private _routeParams: RouteParams) {
        super();
    }

    ngOnInit() {

        let instanceId = this._routeParams.get('instanceId');

        console.log("Looking for Person with InstanceId: " + instanceId)

        if (!instanceId) {
            alert(`No instanceId provided ... try entering one in the url, like so: http://localhost:3000/Identity?instanceId=22fcf440-d3d5-e511-8d7c-a0b3cc47d18e`);
        }

        // Make an Ajax call to get person from DB
        this._serverAPI.getPersonByInstanceId(instanceId).subscribe(person => {
            this.selectedDude = person;
        }, error => alert(`Server error. Try again later`));
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
    }

    //selectDude(element, dude: Person) {
    //    this.activePersonEl = element;
    //    this.selectedDude = dude;
    //}
}
