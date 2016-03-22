import {Component, Inject, AfterViewInit} from 'angular2/core';

import { BaseComponent } from '../components/Base.component';
import {Person} from '../models/Person';
import {ServerAPI} from '../services/ServerAPI.service';
import { PsychSvc } from '../services/Psych.service';
import {SelectedPersonDirective} from '../directives/SelectedPerson.directive';
import { Router, RouteParams } from 'angular2/router';
import { religiousFreq } from '../pipes/religiousFreq.pipe';

@Component({
    selector: 'psychology',
    templateUrl: '../app/templates/psych.html',
    directives: [SelectedPersonDirective],
    providers: [PsychSvc],
    pipes: [religiousFreq]
})
export class PsychologyView extends BaseComponent implements AfterViewInit {

    selectedDude: Person;
    psychology;

    religiousFrequencyValues = {
        Never: 0,
        SeveralTimesPerYear: 1000,
        OnceOrTwicePerMonth: 2000,
        EveryWeek: 3000
    };
    rfVals = [0, 1000, 2000, 3000];
    rfv = 0;

    isAddLL: boolean = true;
    isAddAL: boolean = true;

    la: Object = null;

    constructor( @Inject(ServerAPI) private _serverAPI, private _psychSvc: PsychSvc, private _routeParams: RouteParams) {
        super();

        let instanceId = this._routeParams.get('instanceId');

        if (!instanceId) {
            alert(`No instanceId provided ... try entering one in the url, like so: http://localhost:3000/Identity?instanceId=22fcf440-d3d5-e511-8d7c-a0b3cc47d18e`);
        }

        var self = this;

        _serverAPI.getPersonByInstanceId(instanceId).subscribe(p => {
            self.selectedDude = p;
            self.psychology = p.psychology;

            self.rfv = self.selectedDude.psychology.ReligiousFrequency;

            self._serverAPI.getLA().subscribe(lajsn => {

                for (var prop in lajsn.Love) {
                    lajsn.Love[prop] = lajsn.Love[prop].replace(/\n/g, '<br>').replace(new RegExp("\\[NAME\\]", 'g'), self.selectedDude.name.split(" ")[0]);
                }

                for (var prop in lajsn.Anger) {
                    lajsn.Anger[prop] = lajsn.Anger[prop].replace(/\n/g, '<br>').replace(new RegExp("\\[NAME\\]", 'g'), self.selectedDude.name.split(" ")[0]);
                }

                self.la = lajsn
            }, error => alert(`Server error. Try again later`));
        }, error => alert(`Server error. Try again later`));
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
    }

    // ------------------------------
    // ----- Sexual Orientation -----
    // ------------------------------
    editSexOri(event) {
        event.preventDefault();
        $('#editSexOriModal').modal('show');
    }

    saveSexOri(event, newSexOri) {
        event.preventDefault();

        if (!this.psychology.SexualOrientation && newSexOri) {
            //Add
            this._psychSvc.addSexualOri(this.selectedDude.instanceId, newSexOri).subscribe(result => {
                console.log(result);
                //this.saving = false;
                $('#editSexOriModal').modal('hide');
            }, error => alert(`Server error. Try again later`));
        } else {
            //Edit
            this._psychSvc.updateSexualOri(this.selectedDude.instanceId, newSexOri).subscribe(result => {
                console.log(result);
                //this.saving = false;
                $('#editSexOriModal').modal('hide');
            }, error => alert(`Server error. Try again later`));
        }

        this.psychology.SexualOrientation = newSexOri;

        $('#editSexOriModal').modal('hide');
    }

    closeSexOri(event, txtSexOri: HTMLInputElement) {
        event.preventDefault();

        txtSexOri.value = this.psychology.SexualOrientation;

        $('#editSexOriModal').modal('hide');
    }

    //---------------------------
    //------ Edit Religion ------
    //---------------------------
    editReligion(event) {
        event.preventDefault();
        $('#editReligionModal').modal('show');
    }

    saveReligion(event, newReligion) {
        event.preventDefault();

        if (!this.psychology.Religion && newReligion) {
            //Add
            this._psychSvc.addReligion(this.selectedDude.instanceId, newReligion).subscribe(result => {
                console.log(result);
                //this.saving = false;
                $('#editReligionModal').modal('hide');
            }, error => alert(`Server error. Try again later`));
        } else {
            //Edit
            this._psychSvc.updateReligion(this.selectedDude.instanceId, newReligion).subscribe(result => {
                console.log(result);
                //this.saving = false;
                $('#editReligionModal').modal('hide');
            }, error => alert(`Server error. Try again later`));
        }

        this.psychology.Religion = newReligion;

        $('#editReligionModal').modal('hide');
    }

    closeRelgionModal(event, txtReligion: HTMLInputElement) {
        event.preventDefault();

        txtReligion.value = this.psychology.Religion;

        $('#editReligionModal').modal('hide');
    }

    //---------------------------
    //------ Edit Politics ------
    //---------------------------
    editPolAff(event) {
        event.preventDefault();
        $('#editPolAffModal').modal('show');
    }

    savePolAff(event, newPolAff) {
        event.preventDefault();

        if (!this.psychology.PoliticalAffiliation && newPolAff) {
            //Add
            this._psychSvc.addPoliticAff(this.selectedDude.instanceId, newPolAff).subscribe(result => {
                console.log(result);
                //this.saving = false;
                $('#editPolAffModal').modal('hide');
            }, error => alert(`Server error. Try again later`));
        } else {
            //Edit
            this._psychSvc.updatePoliticAff(this.selectedDude.instanceId, newPolAff).subscribe(result => {
                console.log(result);
                //this.saving = false;
                $('#editPolAffModal').modal('hide');
            }, error => alert(`Server error. Try again later`));
        }

        this.psychology.PoliticalAffiliation = newPolAff;

        $('#editPolAffModal').modal('hide');
    }

    closePolAff(event, txtPolAff: HTMLInputElement) {
        event.preventDefault();

        txtPolAff.value = this.psychology.PoliticalAffiliation;

        $('#editPolAffModal').modal('hide');
    }

    //-----------------------------
    //------ Edit Rel. Freq. ------
    //-----------------------------
    changeRf(event, rf) {
        event.preventDefault();
        this.rfv = rf;
    }

    editRelFreq(event) {
        event.preventDefault();
        $('#editRelFreqModal').modal('show');
    }

    saveRelFreq(event) {
        event.preventDefault();

        if (!this.psychology.ReligiousFrequency && this.rfv) {
            //Add
            this._psychSvc.addReligiousFreq(this.selectedDude.instanceId, this.rfv).subscribe(result => {
                console.log(result);
                //this.saving = false;
                $('#editRelFreqModal').modal('hide');
            }, error => alert(`Server error. Try again later`));
        } else {
            //Edit
            this._psychSvc.updateReligiousFreq(this.selectedDude.instanceId, this.rfv).subscribe(result => {
                console.log(result);
                //this.saving = false;
                $('#editRelFreqModal').modal('hide');
            }, error => alert(`Server error. Try again later`));
        }

        this.psychology.ReligiousFrequency = this.rfv;

        $('#editRelFreqModal').modal('hide');
    }

    closeRelFreq(event, txtRelFreq: HTMLInputElement) {
        event.preventDefault();

        $('#editRelFreqModal').modal('hide');
    }

    //---------------------------------------
    //--------- Love/Anger language ---------
    //---------------------------------------

    changell(event, wordsOfAff, actsOfService, receivingGifts, qualityTime, wphysicakTouch) {
        event.preventDefault();

        this.psychology.LoveLanguage.wof = wordsOfAff;
        this.psychology.LoveLanguage.aos = actsOfService;
        this.psychology.LoveLanguage.rg = receivingGifts;
        this.psychology.LoveLanguage.qt = qualityTime;
        this.psychology.LoveLanguage.pt = wphysicakTouch;

        this.isAddLL = this.psychology.LoveLanguage.wof === null &&
            this.psychology.LoveLanguage.aos === null &&
            this.psychology.LoveLanguage.rg === null &&
            this.psychology.LoveLanguage.qt === null &&
            this.psychology.LoveLanguage.pt === null;


        console.log(JSON.stringify(this.psychology.LoveLanguage));
        var mappedLL = {
            HasWordsOfAffirmation: this.psychology.LoveLanguage.wof,
            HasActsOfService: this.psychology.LoveLanguage.aos,
            HasReceivingGifts: this.psychology.LoveLanguage.rg,
            HasQualityTime: this.psychology.LoveLanguage.qt,
            HasPhysicalTouch: this.psychology.LoveLanguage.pt
        }

        if (this.isAddLL) {
            //Add
            this._psychSvc.addLL(this.selectedDude.instanceId, mappedLL).subscribe(result => {
                console.log(result);
                $('#chooseLL').modal('hide');
            }, error => alert(`Server error. Try again later`));
        } else {
            //Update
            this._psychSvc.updateLL(this.selectedDude.instanceId, mappedLL).subscribe(result => {
                console.log(result);
                $('#chooseLL').modal('hide');
            }, error => alert(`Server error. Try again later`));
        }
    }

    changeAl(event, reactive, passiveAgressive, avoidant, direct) {
        event.preventDefault();

        this.psychology.AngerLanguage.r = reactive;
        this.psychology.AngerLanguage.pa = passiveAgressive;
        this.psychology.AngerLanguage.av = avoidant;
        this.psychology.AngerLanguage.d = direct;

        this.isAddAL = this.psychology.AngerLanguage.r === null &&
            this.psychology.AngerLanguage.pa === null &&
            this.psychology.AngerLanguage.av === null &&
            this.psychology.AngerLanguage.d === null;

        console.log(JSON.stringify(this.psychology.AngerLanguage));
        var mappedAL = {
            HasReactive: this.psychology.AngerLanguage.r,
            HasPassiveAggressive: this.psychology.AngerLanguage.pa,
            HasAvoidant: this.psychology.AngerLanguage.av,
            HasAssertive: this.psychology.AngerLanguage.d
        }

        if (this.isAddAL) {
            //Add
            this._psychSvc.addAL(this.selectedDude.instanceId, mappedAL).subscribe(result => {
                console.log(result);
                $('#chooseAL').modal('hide');
            }, error => alert(`Server error. Try again later`));
        } else {
            //Update
            this._psychSvc.updateAL(this.selectedDude.instanceId, mappedAL).subscribe(result => {
                console.log(result);
                $('#chooseAL').modal('hide');
            }, error => alert(`Server error. Try again later`));
        }
    }

    choosell(event) {
        event.preventDefault();

        $('#chooseLL').modal('show');
    }

    chooseal(event) {
        event.preventDefault();

        $('#chooseAL').modal('show');
    }
}
