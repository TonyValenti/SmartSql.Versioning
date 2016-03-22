import { Component, Inject, AfterViewInit} from 'angular2/core';

import { BaseComponent } from '../components/Base.component';
import { Person } from '../models/Person';
import { ServerAPI } from '../services/ServerAPI.service';
import { EducationSvc } from '../services/Education.service';
import { SelectedPersonDirective } from '../directives/SelectedPerson.directive';
import { Router, RouteParams } from 'angular2/router';
import { eduLevel } from '../pipes/eduLevel.pipe';
import { ModalConfirmSvc} from '../common/ModalConfirmAll';

@Component({
    selector: 'edu',
    templateUrl: '../app/templates/education.html',
    directives: [SelectedPersonDirective],
    providers: [EducationSvc],
    pipes: [eduLevel]
})
export class EducationView extends BaseComponent implements AfterViewInit {

    selectedDude: Person;
    certifications;
    selectedCert = { Name: "", StartDate: "", EndDate: "" };
    origCert;
    isAdd;

    EducationLevelValue = {
        None: 0,
        HighSchool: 1000,
        TechnicalSchool: 2000,
        SomeCollege: 3000,
        AssociatesDegree: 4000,
        BatchelorsDegree: 5000,
        GraduateStudent: 6000,
        MastersDegree: 7000,
        DoctoralDegree: 8000
    };

    elvlVals = [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000];
    elvlv = 0;

    constructor(
        @Inject(ServerAPI) private _serverAPI,
        private _eduSvc: EducationSvc,
        private _modalService: ModalConfirmSvc,
        private _routeParams: RouteParams) {

        super();

        let instanceId = this._routeParams.get('instanceId');

        if (!instanceId) {
            alert(`No instanceId provided ... try entering one in the url, like so: http://localhost:3000/Identity?instanceId=22fcf440-d3d5-e511-8d7c-a0b3cc47d18e`);
        }

        var self = this;

        _serverAPI.getPersonByInstanceId(instanceId).subscribe(p => {
            self.selectedDude = p;
            self.certifications = p.education.Certification || [];
            self.elvlv = p.education.EducationLevel;
        }, error => alert(`Server error. Try again later`));
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
    }

    saveCertification(event, txtName, txtStart, txtEnd) {
        event.preventDefault();

        if (this.isAdd) {
            var newCertification = { Name: txtName.value, StartDate: txtStart.value, EndDate: txtEnd.value, InstanceId: "" };
            this.certifications.push(newCertification);
            txtName.value = "";
            txtStart.value = "";
            txtEnd.value = "";

            this._eduSvc.addCertificate(this.selectedDude.instanceId, newCertification).subscribe(result => {
                console.log(result);
                //this.saving = false;
                $('#editFinancialModal').modal('hide');
            }, error => alert(`Server error. Try again later`));

        } else {
            this.selectedCert.Name = txtName.value;
            this.selectedCert.StartDate = txtStart.value;
            this.selectedCert.EndDate = txtEnd.value;
        }

        $('#editCertification').modal('hide');
    }

    editAddCertification(event, index) {
        event.preventDefault();

        if (index === -1) {
            this.isAdd = true;
            this.selectedCert = { Name: "", StartDate: "", EndDate: "" };
        } else {
            this.isAdd = false;
            //this.origCert = JSON.parse(JSON.stringify(this.certifications[index]));
            this.selectedCert = this.certifications[index];
        }

        $('#editCertification').modal('show');
    }

    closeCertModal(event, txtName, txtStart, txtEnd) {
        event.preventDefault();

        if (this.isAdd) {
            txtName.value = "";
            txtStart.value = "";
            txtEnd.value = "";
        } else {
            txtName.value = this.selectedCert.Name;
            txtStart.value = this.selectedCert.StartDate;
            txtEnd.value = this.selectedCert.EndDate;
        }

        //this.selectedCert = this.origCert;

        $('#editCertification').modal('show');
    }

    deleteCertification(event, index) {
        event.preventDefault();

        let msg = `Do you want to delete certification?`;

        this._modalService.activate(msg).then(responseOK => {
            if (responseOK) {
                this._eduSvc.archiveCertificate(this.certifications[index].InstanceId).subscribe(result => {
                    console.log(result);
                }, error => alert(`Server error. Try again later`));

                this.certifications.splice(index, 1);
            }
        });
    }

    //---------------------------
    //------ Edit Edu Level -----
    //---------------------------
    editEduLevel(event) {
        event.preventDefault();
        $('#editEduLevelModal').modal('show');
    }

    changeEduLvl(event, elv) {
        event.preventDefault();
        this.elvlv = elv;
    }

    saveEduLevel(event) {
        event.preventDefault();

        if (!this.selectedDude.education.EducationLevel && this.elvlv) {
            //Add
            this._eduSvc.addEducationLvl(this.selectedDude.instanceId, this.elvlv).subscribe(result => {
                console.log(result);
                //this.saving = false;
                $('#editRelFreqModal').modal('hide');
            }, error => alert(`Server error. Try again later`));
        } else {
            //Edit
            this._eduSvc.updateEducationLvl(this.selectedDude.instanceId, this.elvlv).subscribe(result => {
                console.log(result);
                //this.saving = false;
                $('#editRelFreqModal').modal('hide');
            }, error => alert(`Server error. Try again later`));
        }

        this.selectedDude.education.EducationLevel = this.elvlv;

        $('#editEduLevelModal').modal('hide');
    }

    closeEduLevel(event) {
        event.preventDefault();

        $('#editEduLevelModal').modal('hide');
    }
}
