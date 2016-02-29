import { Component, Inject } from 'angular2/core';
import { Person } from '../models/Person';
import { ClothingSizes } from '../models/ClothingSizes';
import { ServerAPI } from '../services/ServerAPI.service';
import { ClothingSvc } from '../services/Clothing.service';
import { SelectedPersonDirective } from '../directives/SelectedPerson.directive';
import { Router, RouteParams } from 'angular2/router';

@Component({
    selector: 'clothingSizes',
    templateUrl: '../app/templates/clothingSizes.html',
    directives: [SelectedPersonDirective],
    providers: [ClothingSvc]
})
export class ClothingSizesView {

    private selectedDude: Person;
    private clothingSizes: ClothingSizes;
    clothingTypeName: string;
    clothingType: string;

    constructor( @Inject(ServerAPI) private _serverAPI, private _clothingSvc: ClothingSvc, private _routeParams: RouteParams) {

        let instanceId = this._routeParams.get('instanceId');

        if (!instanceId) {
            alert(`No instanceId provided ... try entering one in the url, like so: http://localhost:3000/Identity?instanceId=22fcf440-d3d5-e511-8d7c-a0b3cc47d18e`);
        }

        var self = this;
        _serverAPI.getPersonByInstanceId(instanceId).subscribe(p => {
            self.selectedDude = p;
            self.clothingSizes = p.clothingSizes;
        }, error => alert(`Server error. Try again later`));
    }

    editClothingSizes(event, typeOfClothing) {
        event.preventDefault();

        this.clothingType = typeOfClothing;

        switch (typeOfClothing) {
            case "Shirt":
                this.clothingTypeName = "shirt";
                break;
            case "Pant":
                this.clothingTypeName = "pants";
                break;
            case "Shoe":
                this.clothingTypeName = "shoe";
                break;
            case "Belt":
                this.clothingTypeName = "belt";
                break;
            case "Head":
                this.clothingTypeName = "head";
                break;
            case "Dress":
                this.clothingTypeName = "dress";
                break;
            default:
                break;
        }

        $('#editClothingSize').modal('show');
    }

    saveClothing(event, newValue) {
        event.preventDefault();


        if (!this.clothingSizes[this.clothingType] && newValue) {
            //Add
            this._clothingSvc.addClothingSize(this.selectedDude.instanceId, newValue, this.clothingType + 'SizeApi').subscribe(result => {
                console.log(result);
                //this.saving = false;
                $('#editClothingSize').modal('hide');
            }, error => alert(`Server error. Try again later`));
        } else {
            //Edit
            this._clothingSvc.updateClothingSize(this.selectedDude.instanceId, newValue, this.clothingType + 'SizeApi').subscribe(result => {
                console.log(result);
                //this.saving = false;
                $('#editClothingSize').modal('hide');
            }, error => alert(`Server error. Try again later`));
        }

        this.clothingSizes[this.clothingType] = newValue;

        $('#editClothingSize').modal('hide');
    }

    closeClothingModal(event, txtEthnicity: HTMLInputElement) {
        event.preventDefault();

        txtEthnicity.value = this.clothingSizes[this.clothingType];
        $('#editClothingSize').modal('hide');
    }
}
