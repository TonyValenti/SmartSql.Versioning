import {Component, Input, Inject, OnInit, AfterViewInit} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
// import {NgForm}    from 'angular2/common';

import {Person} from '../models/Person';
import {eyeColors} from '../models/eyeColors';
import {hairColors} from '../models/hairColors';
import {Gidfull} from '../pipes/gidfull.pipe';

import {IdentitySvc} from '../services/Identity.service';

@Component({
    selector: 'person-detail',
    templateUrl: '../app/templates/person-detail.html',
    directives: [FORM_DIRECTIVES],
    providers: [IdentitySvc]
})
export class PersonDetailDirective implements OnInit, AfterViewInit {

    // Prop from parent component
    @Input() selectedPerson: Person;

    constructor(private _identitySvc: IdentitySvc) { }

    ngOnInit() {
        console.log("Working with", this.selectedPerson);

        if (this.selectedPerson.governmentId.length) {
            this.tempObjGovernmentId = JSON.parse(JSON.stringify(this.selectedPerson.governmentId[0]));
            this.tempSelectedGidType = this.tempObjGovernmentId && this.tempObjGovernmentId.name;
        }
    }

    ngAfterViewInit() {
        $(".modal").on('shown.bs.modal', function () {
            $(this).find('input:first:visible').focus();
        }); //Focus
    }

    // Person detail props
    eyeColorsArr;
    tempEyeColor;

    hairColorsArr;
    tempHairColor;

    tempSelectedGidType = "";
    tempObjGovernmentId = null;
    isAddGid = false;
    editingGidIx = -1;
    // --

    // state
    saving = false;

    //----------------------------
    //------ Edit Eye Color ------
    //----------------------------
    editEyeColor(event) {
        event.preventDefault();
        this.tempEyeColor = this.selectedPerson.eyeColor;
        this.eyeColorsArr = [];

        for (var property in eyeColors) {
            if (eyeColors.hasOwnProperty(property)) {
                this.eyeColorsArr.push(eyeColors[property]);
            }
        }

        $('#editEyeModal').modal('show');
    }

    changeEyeColor(event, ec) {
        event.preventDefault();
        this.tempEyeColor = ec;
    }

    saveEyeColor(event) {
        if (!this.tempEyeColor) {
            //No selection
            return;
        }

        this.saving = true;

        if (this.selectedPerson.eyeColor) {
            //Edit
            this._identitySvc.updateEyeColor(this.selectedPerson.instanceId, this.tempEyeColor).subscribe(result => {
                console.log(result);
                this.saving = false;
                $('#editEyeModal').modal('hide');
            }, error => alert(`Server error. Try again later`));
        } else {
            //Add
            this._identitySvc.addEyeColor(this.selectedPerson.instanceId, this.tempEyeColor).subscribe(result => {
                console.log(result);
                this.saving = false;
                $('#editEyeModal').modal('hide');
            }, error => alert(`Server error. Try again later`));
        }

        this.selectedPerson.eyeColor = this.tempEyeColor;
    }

    closeEyeModal(event) {
        $('#editEyeModal').modal('hide');
    }

    //-----------------------------
    //------ Edit Hair Color ------
    //-----------------------------
    editHairColor(event) {
        event.preventDefault();
        this.tempHairColor = this.selectedPerson.hairColor;
        this.hairColorsArr = [];

        for (var property in eyeColors) {
            if (eyeColors.hasOwnProperty(property)) {
                this.hairColorsArr.push(eyeColors[property]);
            }
        }

        $('#editHairModal').modal('show');
    }

    changeHairColor(event, hc) {
        event.preventDefault();
        this.tempHairColor = hc;
    }

    saveHairColor(event) {
        if (!this.tempHairColor) {
            //No selection
            return;
        }

        this.saving = true;

        if (this.selectedPerson.hairColor) {
            //Edit
            this._identitySvc.updateHairColor(this.selectedPerson.instanceId, this.tempHairColor).subscribe(result => {
                console.log(result);
                this.saving = false;
                $('#editHairModal').modal('hide');
            }, error => alert(`Server error. Try again later`));
        } else {
            //Add
            this._identitySvc.addHairColor(this.selectedPerson.instanceId, this.tempHairColor).subscribe(result => {
                console.log(result);
                this.saving = false;
                $('#editHairModal').modal('hide');
            }, error => alert(`Server error. Try again later`));
        }

        this.selectedPerson.hairColor = this.tempHairColor;
    }

    closeHairModal(event) {
        $('#editHairModal').modal('hide');
    }

    //---------------------------------
    //------ Edit Government IDs ------
    //---------------------------------
    addGID(event) {
        event.preventDefault();
        this.isAddGid = true;

        this.tempObjGovernmentId = { name: "", value: "" }
        this.tempSelectedGidType = "";

        setTimeout(function () {
            $('#editGIDModal').modal('show');
        }, 100);
    }

    editGID(event, index) { //selectedGidType = this.selectedPerson.governmentId[0].name) {
        event.preventDefault();
        this.isAddGid = false;

        //for (var i = 0; i < this.selectedPerson.governmentId.length; i++){
        //    if (this.selectedPerson.governmentId[i].name === selectedGidType) {
        //        this.editingGidIx = i;
        //        this.tempObjGovernmentId = JSON.parse(JSON.stringify(this.selectedPerson.governmentId[i]));
        //    }
        //}

        this.editingGidIx = index;
        this.tempObjGovernmentId = JSON.parse(JSON.stringify(this.selectedPerson.governmentId[index]));

        this.tempSelectedGidType = this.tempObjGovernmentId.name;

        $('#editGIDModal').modal('show');
    }

    //changeGidType(event, gidType) {
    //    event.preventDefault();
    //    this.tempSelectedGidType = gidType;
    //}

    deleteGID(event, index) {
        event.preventDefault();

        this._identitySvc.archiveGovId(this.selectedPerson.governmentId[index].instanceId)
            .subscribe(result => {
                console.log(result);
                $('#editGIDModal').modal('hide');
            }, error => alert(`Server error. Try again later`));

        this.selectedPerson.governmentId.splice(index, 1);
        this.tempObjGovernmentId = null;
    }

    saveGid(event) {
        event.preventDefault();
        this.saving = true;

        if (this.isAddGid) {
            //Add

            this.selectedPerson.governmentId.push(this.tempObjGovernmentId);

            this._identitySvc.addGovId(this.selectedPerson.instanceId, this.tempObjGovernmentId.value, this.tempObjGovernmentId.name)
                .subscribe(result => {
                    console.log(result);
                    this.saving = false;
                    $('#editGIDModal').modal('hide');
                }, error => alert(`Server error. Try again later`));
        } else {
            //Edit

            this.selectedPerson.governmentId[this.editingGidIx] = this.tempObjGovernmentId;
            this.tempObjGovernmentId = JSON.parse(JSON.stringify(this.selectedPerson.governmentId[this.editingGidIx]));

            this._identitySvc.editGovId(this.tempObjGovernmentId.instanceId, this.tempObjGovernmentId.value, this.tempObjGovernmentId.name)
                .subscribe(result => {
                    console.log(result);
                    this.saving = false;
                    $('#editGIDModal').modal('hide');
                }, error => alert(`Server error. Try again later`));

            $('#editGIDModal').modal('hide');
        }
    }

    closeGidModal(event) {
        event.preventDefault();

        //this.tempObjGovernmentId = JSON.parse(JSON.stringify(this.selectedPerson.governmentId[0]));
        $('#editGIDModal').modal('hide');
    }

    //----------------------------
    //------ Edit Ethnicity ------
    //----------------------------
    editEthnicity(event) {
        event.preventDefault();
        $('#editEthnicityModal').modal('show');
    }

    saveEthnicity(event, newEthnicity) {
        event.preventDefault();

        if (this.selectedPerson.ethnicity === newEthnicity) {
            $('#editEthnicityModal').modal('hide');
            return;
        }

        this.saving = true;

        if (this.selectedPerson.ethnicity) {
            //Edit
            this._identitySvc.updateEthnicity(this.selectedPerson.instanceId, newEthnicity).subscribe(result => {
                console.log(result);
                this.saving = false;
                $('#editEthnicityModal').modal('hide');
            }, error => alert(`Server error. Try again later`));
        } else {
            //Add
            this._identitySvc.addEthnicity(this.selectedPerson.instanceId, newEthnicity).subscribe(result => {
                console.log(result);
                this.saving = false;
                $('#editEthnicityModal').modal('hide');
            }, error => alert(`Server error. Try again later`));
        }

        this.selectedPerson.ethnicity = newEthnicity;
    }

    closeEthnicityModal(event, txtEthnicity: HTMLInputElement) {
        event.preventDefault();

        txtEthnicity.value = this.selectedPerson.ethnicity;

        $('#editEthnicityModal').modal('hide');
    }

    //--------------------------
    //----- Edit Birth Day -----
    //--------------------------
    editBDay(event) {
        event.preventDefault();
        $('#editBDayModal').modal('show');
    }

    saveBday(event, newBday) {
        event.preventDefault();

        if (this.selectedPerson.dob === newBday) {
            $('#editBDayModal').modal('hide');
            return;
        }

        this.saving = true;

        if (this.selectedPerson.dob) {
            //Edit
            this._identitySvc.updateDOB(this.selectedPerson.instanceId, newBday).subscribe(result => {
                console.log(result);
                this.saving = false;
                $('#editBDayModal').modal('hide');
            }, error => alert(`Server error. Try again later`));
        } else {
            //Add
            this._identitySvc.addDOB(this.selectedPerson.instanceId, newBday).subscribe(result => {
                console.log(result);
                this.saving = false;
                $('#editBDayModal').modal('hide');
            }, error => alert(`Server error. Try again later`));
        }

        this.selectedPerson.dob = newBday;
    }

    closeBdayyModal(event, txtDob: HTMLInputElement) {
        event.preventDefault();

        txtDob.value = this.selectedPerson.dob;

        $('#editBDayModal').modal('hide');
    }

}
