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
    degrees;
    schools;

    selectedCert = { Name: "", StartDate: "", EndDate: "", Issuer: "", InstanceId: "" };
    selectedDeg = { Name: "", IssueDate: "", Issuer: "", InstanceId: "" };
    selectedSchool = { SchoolName: "", StartDate: "", EndDate: "", InstanceId: "" };

    origCert;
    origDeg;
    origSchool;

    isAddCert;
    isAddDeg;
    isAddSchool;

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
            self.degrees = p.education.Degrees || [];
            self.schools = p.education.Schools || [];
            self.elvlv = p.education.EducationLevel;
        }, error => alert(`Server error. Try again later`));
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
    }

    //-------------------
    //--- Certificate ---
    //-------------------
    saveCertification(event, txtName, txtIssuedBy, txtStart, txtEnd) {
        event.preventDefault();

        if (this.isAddCert) {
            // Add new certificate
            var newCertification = { Name: txtName.value, Issuer: txtIssuedBy.value, StartDate: txtStart.value, EndDate: txtEnd.value, InstanceId: "" };
            this.certifications.push(newCertification);
            txtName.value = "";
            txtIssuedBy.value = "";
            txtStart.value = "";
            txtEnd.value = "";

            this._eduSvc.addCertificate(this.selectedDude.instanceId, newCertification).subscribe(result => {
                console.log(result);
                //this.saving = false;
            }, error => alert(`Server error. Try again later`));

        } else {
            // Editing existing certificate
            this.selectedCert.Name = txtName.value;
            this.selectedCert.Issuer = txtIssuedBy.value;
            this.selectedCert.StartDate = txtStart.value;
            this.selectedCert.EndDate = txtEnd.value;

            this._eduSvc.updateCertificate(this.selectedCert.InstanceId, this.selectedCert).subscribe(result => {
                console.log(result);
                //this.saving = false;

            }, error => alert(`Server error. Try again later`));
        }

        $('#editCertification').modal('hide');
    }

    editAddCertification(event, index) {
        //Open Edit/Add dialog 
        event.preventDefault();

        if (index === -1) {
            this.isAddCert = true;
            this.selectedCert = { Name: "", StartDate: "", EndDate: "", Issuer: "", InstanceId: "" };
        } else {
            this.isAddCert = false;
            //this.origCert = JSON.parse(JSON.stringify(this.certifications[index]));
            this.selectedCert = this.certifications[index];
        }

        $('#editCertification').modal('show');
    }

    closeCertModal(event, txtName, txtIssuedBy, txtStart, txtEnd) {
        event.preventDefault();

        if (this.isAddCert) {
            txtName.value = "";
            txtIssuedBy.value = "";
            txtStart.value = "";
            txtEnd.value = "";
        } else {
            txtName.value = this.selectedCert.Name;
            txtIssuedBy.value = this.selectedCert.Issuer;
            txtStart.value = this.selectedCert.StartDate;
            txtEnd.value = this.selectedCert.EndDate;
        }

        //this.selectedCert = this.origCert;

        $('#editCertification').modal('show');
    }

    deleteCertification(event, index) {
        event.preventDefault();

        let msg = `Do you want to delete the certification?`;

        this._modalService.activate(msg).then(responseOK => {
            if (responseOK) {
                this._eduSvc.archiveCertificate(this.certifications[index].InstanceId).subscribe(result => {
                    console.log(result);
                }, error => alert(`Server error. Try again later`));

                this.certifications.splice(index, 1);
            }
        });
    }

    //--------------
    //--- Degree ---
    //--------------
    saveDegree($event, txtDeg, txtDegIssuedBy, txtIssueDate) {
        event.preventDefault();

        if (this.isAddDeg) {
            // Add new certificate
            var newDegree = {
                Name: txtDeg.value,
                Issuer: txtDegIssuedBy.value,
                IssueDate: txtIssueDate.value,
                InstanceId: ""
            };
            this.degrees.push(newDegree);

            txtDeg.value = "";
            txtDegIssuedBy.value = "";
            txtIssueDate.value = "";

            this._eduSvc.addDegree(this.selectedDude.instanceId, newDegree).subscribe(result => {
                console.log(result);
                //this.saving = false;
            }, error => alert(`Server error. Try again later`));

        } else {
            // Editing existing certificate
            this.selectedDeg.Name = txtDeg.value;
            this.selectedDeg.Issuer = txtDegIssuedBy.value;
            this.selectedDeg.IssueDate = txtIssueDate.value;

            this._eduSvc.updateDegree(this.selectedDeg.InstanceId, this.selectedDeg).subscribe(result => {
                console.log(result);
                //this.saving = false;
            }, error => alert(`Server error. Try again later`));
        }

        $('#editDegrees').modal('hide');
    }

    editAddDegree(event, index) {
        //Open Edit/Add dialog 
        event.preventDefault();

        if (index === -1) {
            this.isAddDeg = true;
            this.selectedDeg = { Name: "", IssueDate: "", Issuer: "", InstanceId: "" };
        } else {
            this.isAddCert = false;
            //this.origCert = JSON.parse(JSON.stringify(this.certifications[index]));
            this.selectedDeg = this.degrees[index];
        }

        $('#editDegrees').modal('show');
    }

    closeDegModal(event, txtName, txtIssuedBy, txtIssueDate) {
        event.preventDefault();

        if (this.isAddCert) {
            txtName.value = "";
            txtIssuedBy.value = "";
            txtIssueDate.value = "";
        } else {
            txtName.value = this.selectedDeg.Name;
            txtIssuedBy.value = this.selectedDeg.Issuer;
            txtIssueDate.value = this.selectedDeg.IssueDate;
        }

        $('#editDegrees').modal('show');
    }

    deleteDegree(event, index) {
        event.preventDefault();

        let msg = `Do you want to delete the degree?`;

        this._modalService.activate(msg).then(responseOK => {
            if (responseOK) {
                this._eduSvc.archiveDegree(this.degrees[index].InstanceId).subscribe(result => {
                    console.log(result);
                }, error => alert(`Server error. Try again later`));

                this.degrees.splice(index, 1);
            }
        });
    }

    //--------------
    //--- School ---
    //--------------
    saveSchool($event, txtSchool, txtStart, txtEnd) {
        event.preventDefault();

        if (this.isAddSchool) {
            // Add new certificate
            var newSchool = {
                SchoolName: txtSchool.value,
                StartDate: txtStart.value,
                EndDate: txtEnd.value,
                InstanceId: ""
            };
            this.schools.push(newSchool);

            txtSchool.value = "";
            txtStart.value = "";
            txtEnd.value = "";

            this._eduSvc.addSchool(this.selectedDude.instanceId, newSchool).subscribe(result => {
                console.log(result);
            }, error => alert(`Server error. Try again later`));

        } else {
            // Editing existing certificate
            this.selectedSchool.SchoolName = txtSchool.value;
            this.selectedSchool.StartDate = txtStart.value;
            this.selectedSchool.EndDate = txtEnd.value;

            this._eduSvc.updateSchool(this.selectedSchool.InstanceId, this.selectedSchool).subscribe(result => {
                console.log(result);
            }, error => alert(`Server error. Try again later`));
        }

        $('#editSchool').modal('hide');
    }

    editAddSchool(event, index) {
        //Open Edit/Add dialog 
        event.preventDefault();

        if (index === -1) {
            this.isAddSchool = true;
            this.selectedSchool = { SchoolName: "", StartDate: "", EndDate: "", InstanceId: "" };
        } else {
            this.isAddSchool = false;
            this.selectedSchool = this.schools[index];
        }

        $('#editSchool').modal('show');
    }

    closeSchoolModal(event, txtSchool, txtStart, txtEnd) {
        event.preventDefault();

        if (this.isAddSchool) {
            txtSchool.value = "";
            txtStart.value = "";
            txtEnd.value = "";
        } else {
            txtSchool.value = this.selectedSchool.SchoolName;
            txtStart.value = this.selectedSchool.StartDate;
            txtEnd.value = this.selectedSchool.EndDate;
        }

        $('#editSchool').modal('show');
    }

    deleteSchool(event, index) {
        event.preventDefault();

        let msg = `Do you want to delete the school?`;

        this._modalService.activate(msg).then(responseOK => {
            if (responseOK) {
                this._eduSvc.archiveSchool(this.schools[index].InstanceId).subscribe(result => {
                    console.log(result);
                }, error => alert(`Server error. Try again later`));

                this.schools.splice(index, 1);
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
