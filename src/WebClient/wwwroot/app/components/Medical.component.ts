import { Component, Inject, OnInit, AfterViewInit} from 'angular2/core';

import { BaseComponent } from '../components/Base.component';
import { ServerAPI } from '../services/ServerAPI.service';
import { MedicalSvc } from '../services/Medical.service';
import { SelectedPersonDirective } from '../directives/SelectedPerson.directive';
import { Person } from '../models/Person';
import { Router, RouteParams } from 'angular2/router';
import { bloodtype } from '../pipes/bloodtype.pipe';
import { ModalConfirmSvc} from '../common/ModalConfirmAll';

import {TYPEAHEAD_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
    selector: 'medical',
    templateUrl: '../app/templates/medicalComp.html',
    pipes: [bloodtype],
    directives: [SelectedPersonDirective, TYPEAHEAD_DIRECTIVES],
    providers: [MedicalSvc]
})
export class Medical extends BaseComponent implements OnInit, AfterViewInit {

    selectedDude: Person;

    //allergies
    selectedAllergie;
    tempAllergie = { name: "", treatment: "", instanceId: "" };
    isAddAllergie = true;

    //medications
    selectedMedication;
    tempMedication = { name: "", description: "", usageText: "", instanceId: "" };
    isAddMedication = true;

    //procedures
    selectedProcedure;
    tempProcedure = { Name: "", Description: "", Date: "", InstanceId: "" };
    isAddProcedure = true;

    //immunizations
    selectedImmunization;
    tempImmunization = { Name: "", Date: "", InstanceId: "" };
    isAddImmunization = true;

    //incidents
    selectedIncident;
    tempIncident = { Name: "", Description: "", Date: "", InstanceId: "" };
    isAddIncident = true;

    //conditions
    selectedCondition;
    tempCondition = { Name: "", Description: "", InstanceId: "" };
    isAddCondition = true;

    //insurance
    selectedInsurance;
    tempInsurance = { Name: "", Details: "", InstanceId: "" };
    isAddInsurance = true;

    //emergency Contacts
    loadingPeople = true;
    peopleEC = [];
    selectedEmergencyContact = null;
    selectedECName = '';
    tempEmergencyContact = null;
    isAddEmergencyContact = true;

    tempSex = 0;

    BTValues = {
        Unknown: 0,
        APositive: 1100,
        ANegative: 1200,
        BPositive: 2100,
        BNegative: 2200,
        ABPositive: 3100,
        ABNegative: 3200,
        OPositive: 4100,
        ONegative: 4200
    };

    tempBT = this.BTValues.Unknown;

    heightUnit = 0; //Inches - 0 , Centimeters - 1
    heightFeet = 0;
    heightInches = 0;
    heightCm = 0;
    tempHeightVal = 0;

    tempWeightVal = 0;
    tempWeightUnit = 0; // pounds - 0, kilograms - 1

    constructor(
        @Inject(ServerAPI) private _serverAPI,
        private _modalService: ModalConfirmSvc,
        private _medicalSvc: MedicalSvc,
        private _routeParams: RouteParams) { super(); }

    ngAfterViewInit() {
        $(".modal").on('shown.bs.modal', function () {
            $(this).find('input:first:visible').focus();
        }); //Focus
    }

    ngOnInit() {
        let instanceId = this._routeParams.get('instanceId');

        if (!instanceId) {
            alert(`No instanceId provided ... try entering one in the url, like so: http://localhost:3000/Identity?instanceId=22fcf440-d3d5-e511-8d7c-a0b3cc47d18e`);
        }

        var self = this;

        // Make an Ajax call to get person from DB .subscribe(person => { currPerson = person; }
        this._serverAPI.getPersonByInstanceId(instanceId).subscribe(p => {
            self.selectedDude = p;

            self.tempSex = self.selectedDude.sex;
            self.tempBT = self.selectedDude.bloodType;

            self.heightUnit = self.selectedDude.height && self.selectedDude.height.unit || 0;
            self.tempHeightVal = self.selectedDude.height && self.selectedDude.height.value || 0;

            self.tempWeightVal = self.selectedDude.weight && self.selectedDude.weight.value || 0;
            self.tempWeightUnit = self.selectedDude.weight && self.selectedDude.weight.unit || 0;

            if (self.selectedDude.emergencyContact.length > 0) {
                // Get the Emergency Contact
                this._serverAPI.getPersonByInstanceIdNoDetails(self.selectedDude.emergencyContact[0].EmergencyContactEntityId).subscribe(pec => {
                    console.log("getPersonByInstanceIdNoDetails", JSON.stringify(pec));
                    if (pec) {
                        self.selectedEmergencyContact = pec;
                        self.selectedECName = pec.Name;
                    }
                }
                , error => alert(`Server error. Try again later`)
                , done => console.log('emergencyContact::getPersonByInstanceId done'));
            }
        }
            , error => alert(`Server error. Try again later`)
            , done => console.log('getPersonByInstanceId done'));
    }

    //--------------------------------
    //------ Add/Edit Allergies ------
    //--------------------------------
    editAllergie(event, allergie, isAdd) {
        event.preventDefault();

        this.isAddAllergie = isAdd;

        if (isAdd) {
            //Add
            this.tempAllergie = { name: "", treatment: "", instanceId: "" };
        } else {
            //Edit
            this.tempAllergie = JSON.parse(JSON.stringify(allergie));
            this.selectedAllergie = allergie;
        }

        $('#editAllergieModal').modal('show');
    }

    saveAllergiee(event) {
        event.preventDefault();
        if (this.isAddAllergie) {
            this.selectedDude.allergies.push(this.tempAllergie);

            this._medicalSvc.addAllergy(this.selectedDude.instanceId, this.tempAllergie).subscribe(result => {
                console.log(result);
                //this.saving = false;
                $('#editAllergieModal').modal('hide');
            }, error => alert(`Server error. Try again later`));
        } else {

            if (this.selectedAllergie.name !== this.tempAllergie.name || this.selectedAllergie.treatment !== this.tempAllergie.treatment) {
                this._medicalSvc.updateAllergy(this.tempAllergie.instanceId, this.tempAllergie).subscribe(result => {
                    console.log(result);
                    //this.saving = false;
                    $('#editAllergieModal').modal('hide');
                }, error => alert(`Server error. Try again later`));
            }

            this.selectedAllergie.name = this.tempAllergie.name;
            this.selectedAllergie.treatment = this.tempAllergie.treatment;
        }

        $('#editAllergieModal').modal('hide');
    }

    deletetAllergie(event, index) {
        event.preventDefault();

        let msg = `Do you want to delete Allergy?`;

        this._modalService.activate(msg).then(responseOK => {
            if (responseOK) {
                this._medicalSvc.archiveAllergy(this.selectedDude.allergies[index].instanceId).subscribe(result => {
                    console.log(result);
                    //this.saving = false;
                    $('#editAllergieModal').modal('hide');

                }, error => alert(`Server error. Try again later`));

                this.selectedDude.allergies.splice(index, 1);
            }
        });
    }

    closeAllergie(event) {
        event.preventDefault();

        $('#editAllergieModal').modal('hide');
    }

    //--------------------------------
    //------ Add/Edit Medication ------
    //--------------------------------
    editMedication(event, medication, isAdd) {
        event.preventDefault();

        this.isAddMedication = isAdd;

        if (isAdd) {
            this.tempMedication = { name: "", description: "", usageText: "", instanceId: "" };
        } else {
            this.tempMedication = JSON.parse(JSON.stringify(medication));
            this.selectedMedication = medication;
        }

        $('#editMedicationModal').modal('show');
    }

    saveMedication(event) {
        event.preventDefault();
        if (this.isAddMedication) {
            this.selectedDude.medications.push(this.tempMedication);

            this._medicalSvc.addMedication(this.selectedDude.instanceId, this.tempMedication).subscribe(result => {
                console.log(result);
                //this.saving = false;
                $('#editMedicationModal').modal('hide');
            }, error => alert(`Server error. Try again later`));
        } else {
            if (this.selectedMedication.name !== this.tempMedication.name || this.selectedMedication.description !== this.tempMedication.description || this.selectedMedication.usageText !== this.tempMedication.usageText) {
                this._medicalSvc.updateMedication(this.tempMedication.instanceId, this.tempMedication).subscribe(result => {
                    console.log(result);
                    //this.saving = false;
                    $('#editMedicationModal').modal('hide');
                }, error => alert(`Server error. Try again later`));
            }

            this.selectedMedication.name = this.tempMedication.name;
            this.selectedMedication.description = this.tempMedication.description;
            this.selectedMedication.usageText = this.tempMedication.usageText;
        }

        $('#editMedicationModal').modal('hide');
    }

    deletetMedication(event, index) {
        event.preventDefault();

        let msg = `Do you want to delete Medication?`;

        this._modalService.activate(msg).then(responseOK => {
            if (responseOK) {
                this._medicalSvc.archiveMedication(this.selectedDude.medications[index].instanceId).subscribe(result => {
                    console.log(result);
                    //this.saving = false;
                    $('#editMedicationModal').modal('hide');

                }, error => alert(`Server error. Try again later`));

                this.selectedDude.medications.splice(index, 1);
            }
        });
    }

    closeMedication(event) {
        event.preventDefault();

        $('#editMedicationModal').modal('hide');
    }

    //--------------------------------
    //------ Add/Edit Procedure ------
    //--------------------------------
    editProcedure(event, procedure, isAdd) {
        event.preventDefault();

        this.isAddProcedure = isAdd;

        if (isAdd) {
            this.tempProcedure = { Name: "", Description: "", Date: "", InstanceId: "" };
        } else {
            this.tempProcedure = JSON.parse(JSON.stringify(procedure));
            this.selectedProcedure = procedure;
        }

        $('#editProcedureModal').modal('show');
    }

    saveProcedure(event) {
        event.preventDefault();
        if (this.isAddProcedure) {
            this.selectedDude.procedures.push(this.tempProcedure);
            this._medicalSvc.addProcedure(this.selectedDude.instanceId, this.tempProcedure).subscribe(result => {
                console.log(result);
                //this.saving = false;
                $('#editProcedureModal').modal('hide');
            }, error => alert(`Server error. Try again later`));
        } else {
            if (this.selectedProcedure.Name !== this.tempProcedure.Name || this.selectedProcedure.Description !== this.tempProcedure.Description || this.selectedProcedure.Date !== this.tempProcedure.Date) {
                this._medicalSvc.updateProcedure(this.tempProcedure.InstanceId, this.tempProcedure).subscribe(result => {
                    console.log(result);
                    //this.saving = false;
                    $('#editProcedureModal').modal('hide');
                }, error => alert(`Server error. Try again later`));
            }
            this.selectedProcedure.Name = this.tempProcedure.Name;
            this.selectedProcedure.Description = this.tempProcedure.Description;
            this.selectedProcedure.Date = this.tempProcedure.Date;
        }

        $('#editProcedureModal').modal('hide');
    }

    deletetProcedure(event, index) {
        event.preventDefault();

        let msg = `Do you want to delete procedure?`;

        this._modalService.activate(msg).then(responseOK => {
            if (responseOK) {
                this._medicalSvc.archiveProcedure(this.selectedDude.procedures[index].InstanceId).subscribe(result => {
                    console.log(result);
                    //this.saving = false;
                    $('#editProcedureModal').modal('hide');

                }, error => alert(`Server error. Try again later`));

                this.selectedDude.procedures.splice(index, 1);
            }
        });
    }

    closeProcedure(event) {
        event.preventDefault();

        $('#editProcedureModal').modal('hide');
    }

    //-----------------------------------
    //------ Add/Edit Immunization ------
    //-----------------------------------
    editImmunization(event, immunization, isAdd) {
        event.preventDefault();

        this.isAddImmunization = isAdd;

        if (isAdd) {
            this.tempImmunization = { Name: "", Date: "", InstanceId: "" };

        } else {
            this.tempImmunization = JSON.parse(JSON.stringify(immunization));
            this.selectedImmunization = immunization;
        }

        $('#editImmunizationModal').modal('show');
    }

    saveImmunization(event) {
        event.preventDefault();
        if (this.isAddImmunization) {
            this.selectedDude.immunizations.push(this.tempImmunization);

            this._medicalSvc.addImmunization(this.selectedDude.instanceId, this.tempImmunization).subscribe(result => {
                console.log(result);
                //this.saving = false;
                $('#editImmunizationModal').modal('hide');
            }, error => alert(`Server error. Try again later`));

        } else {
            if (this.selectedImmunization.Name !== this.tempImmunization.Name || this.selectedImmunization.Date !== this.tempImmunization.Date) {
                this._medicalSvc.updateImmunization(this.tempImmunization.InstanceId, this.tempImmunization).subscribe(result => {
                    console.log(result);
                    //this.saving = false;
                    $('#editImmunizationModal').modal('hide');
                }, error => alert(`Server error. Try again later`));
            }

            this.selectedImmunization.Name = this.tempImmunization.Name;
            this.selectedImmunization.Date = this.tempImmunization.Date;
        }

        $('#editImmunizationModal').modal('hide');
    }

    deletetImmunization(event, index) {
        event.preventDefault();

        let msg = `Do you want to delete immunization?`;

        this._modalService.activate(msg).then(responseOK => {
            if (responseOK) {
                this._medicalSvc.archiveImmunization(this.selectedDude.immunizations[index].InstanceId).subscribe(result => {
                    console.log(result);
                    //this.saving = false;
                    $('#editImmunizationModal').modal('hide');

                }, error => alert(`Server error. Try again later`));

                this.selectedDude.immunizations.splice(index, 1);
            }
        });
    }

    closeImmunization(event) {
        event.preventDefault();

        $('#editImmunizationModal').modal('hide');
    }

    //-------------------------------
    //------ Add/Edit Incident ------
    //-------------------------------
    editIncident(event, incident, isAdd) {
        event.preventDefault();

        this.isAddIncident = isAdd;

        if (isAdd) {
            this.tempIncident = { Name: "", Description: "", Date: "", InstanceId: "" };
        } else {
            this.tempIncident = JSON.parse(JSON.stringify(incident));
            this.selectedIncident = incident;
        }

        $('#editIncidentModal').modal('show');
    }

    saveIncident(event) {
        event.preventDefault();
        if (this.isAddIncident) {
            this.selectedDude.incidents.push(this.tempIncident);

            this._medicalSvc.addIncident(this.selectedDude.instanceId, this.tempIncident).subscribe(result => {
                console.log(result);
                //this.saving = false;
                $('#editIncidentModal').modal('hide');
            }, error => alert(`Server error. Try again later`));
        } else {
            if (this.selectedIncident.Name !== this.tempIncident.Name ||
                this.selectedIncident.Description !== this.tempIncident.Description ||
                this.selectedIncident.Date !== this.tempIncident.Date) {

                this._medicalSvc.updateIncident(this.tempIncident.InstanceId, this.tempIncident).subscribe(result => {
                    console.log(result);
                    //this.saving = false;
                    $('#editIncidentModal').modal('hide');
                }, error => alert(`Server error. Try again later`));
            }

            this.selectedIncident.Name = this.tempIncident.Name;
            this.selectedIncident.Description = this.tempIncident.Description;
            this.selectedIncident.Date = this.tempIncident.Date;
        }

        $('#editIncidentModal').modal('hide');
    }

    deletetIncident(event, index) {
        event.preventDefault();

        let msg = `Do you want to delete incident?`;

        this._modalService.activate(msg).then(responseOK => {
            if (responseOK) {
                this._medicalSvc.archiveIncident(this.selectedDude.incidents[index].InstanceId).subscribe(result => {
                    console.log(result);
                    //this.saving = false;
                    $('#editIncidentModal').modal('hide');

                }, error => alert(`Server error. Try again later`));

                this.selectedDude.incidents.splice(index, 1);
            }
        });
    }

    closeIncident(event) {
        event.preventDefault();

        $('#editIncidentModal').modal('hide');
    }

    //---------------------------------
    //------ Add/Edit Conditions ------
    //---------------------------------
    editCondition(event, condition, isAdd) {
        event.preventDefault();

        this.isAddCondition = isAdd;

        if (isAdd) {
            this.tempCondition = { Name: "", Description: "", InstanceId: "" };
        } else {
            this.tempCondition = JSON.parse(JSON.stringify(condition));
            this.selectedCondition = condition;
        }

        $('#editConditionModal').modal('show');
    }

    saveCondition(event) {
        event.preventDefault();
        if (this.isAddCondition) {
            this.selectedDude.conditions.push(this.tempCondition);

            this._medicalSvc.addCondition(this.selectedDude.instanceId, this.tempCondition).subscribe(result => {
                console.log(result);
                //this.saving = false;
                $('#editConditionModal').modal('hide');
            }, error => alert(`Server error. Try again later`));

        } else {
            if (this.selectedCondition.Name !== this.tempCondition.Name ||
                this.selectedCondition.Description !== this.tempCondition.Description) {

                this._medicalSvc.updateCondition(this.tempCondition.InstanceId, this.tempCondition).subscribe(result => {
                    console.log(result);
                    //this.saving = false;
                    $('#editConditionModal').modal('hide');
                }, error => alert(`Server error. Try again later`));

                this.selectedCondition.Name = this.tempCondition.Name;
                this.selectedCondition.Description = this.tempCondition.Description;
            }
        }

        $('#editConditionModal').modal('hide');
    }

    deletetCondition(event, index) {
        event.preventDefault();

        let msg = `Do you want to delete condition?`;

        this._modalService.activate(msg).then(responseOK => {
            if (responseOK) {
                this._medicalSvc.archiveCondition(this.selectedDude.conditions[index].InstanceId).subscribe(result => {
                    console.log(result);
                    //this.saving = false;
                    $('#editConditionModal').modal('hide');
                }, error => alert(`Server error. Try again later`));

                this.selectedDude.conditions.splice(index, 1);
            }
        });
    }

    closeCondition(event) {
        event.preventDefault();

        $('#editConditionModal').modal('hide');
    }

    //--------------------------------
    //------ Add/Edit Insurance ------
    //--------------------------------
    editInsurance(event, insurance, isAdd) {
        event.preventDefault();

        this.isAddInsurance = isAdd;

        if (isAdd) {
            this.tempInsurance = { Name: "", Details: "", InstanceId: "" };
        } else {
            this.tempInsurance = JSON.parse(JSON.stringify(insurance));
            this.selectedInsurance = insurance;
        }

        $('#editInsuranceModal').modal('show');
    }

    saveInsurance(event) {
        event.preventDefault();
        if (this.isAddInsurance) {
            this.selectedDude.insurances.push(this.tempInsurance);

            this._medicalSvc.addInsurance(this.selectedDude.instanceId, this.tempInsurance).subscribe(result => {
                console.log(result);
                //this.saving = false;
                $('#editInsuranceModal').modal('hide');
            }, error => alert(`Server error. Try again later`));

        } else {
            if (this.selectedInsurance.Name !== this.tempInsurance.Name ||
                this.selectedInsurance.Details !== this.tempInsurance.Details) {
                this._medicalSvc.updateInsurance(this.tempInsurance.InstanceId, this.tempInsurance).subscribe(result => {
                    console.log(result);
                    //this.saving = false;
                    $('#editInsuranceModal').modal('hide');
                }, error => alert(`Server error. Try again later`));

                this.selectedInsurance.Name = this.tempInsurance.Name;
                this.selectedInsurance.Details = this.tempInsurance.Details;
            }
        }

        $('#editInsuranceModal').modal('hide');
    }

    deletetInsurance(event, index) {
        event.preventDefault();

        let msg = `Do you want to delete insurance?`;

        this._modalService.activate(msg).then(responseOK => {
            if (responseOK) {
                this._medicalSvc.archiveInsurance(this.selectedDude.insurances[index].InstanceId).subscribe(result => {
                    console.log(result);
                    //this.saving = false;
                    $('#editInsuranceModal').modal('hide');
                }, error => alert(`Server error. Try again later`));

                this.selectedDude.insurances.splice(index, 1);
            }
        });
    }

    closeInsurance(event) {
        event.preventDefault();

        $('#editInsuranceModal').modal('hide');
    }

    //-----------------------------------------
    //------ Add/Edit Emergency Contacts ------
    //-----------------------------------------
    editEmergencyContacts(event, emergencyContact, isAdd) {
        event.preventDefault();

        $('#editEmergencyContactsModal').modal('show');

        this.loadingPeople = true;
        this.isAddEmergencyContact = isAdd;

        var self = this;

        this._serverAPI.getAllPeople().subscribe(result => {
            function filterByCurrent(item, index, array) {
                return item.IsCurrent;
            }

            var filtered = result.filter(filterByCurrent);

            self.peopleEC = filtered;

            if (isAdd) {
                self.selectedEmergencyContact = null;
                self.selectedECName = '';
                //{
                //    "AuthorId": "",
                //    "AuthorName": null,
                //    "CreatedDateUtc": "",
                //    "InstanceId": "",
                //    "IsArchived": false,
                //    "IsCurrent": true,
                //    "IsOriginal": true,
                //    "Name": "",
                //    "RevisionDateUtc": "",
                //    "RevisionId": ""
                //};
            } else {
                self.tempEmergencyContact = JSON.parse(JSON.stringify(emergencyContact));
                self.selectedECName = emergencyContact.Name;
            }

            self.loadingPeople = false;

        }, error => alert(`Server error. Try again later`));


    }

    selectEMCont(event) {
        this.tempEmergencyContact = JSON.parse(JSON.stringify(event.item));
        this.selectedECName = event.item.Name;

        console.log(JSON.stringify(event.item));
    }

    saveEmergencyContacts(event) {
        event.preventDefault();
        this.selectedEmergencyContact = JSON.parse(JSON.stringify(this.tempEmergencyContact));

        var newEC = {
            "EmergencyContactEntityId": this.selectedEmergencyContact.InstanceId,
            "EntityId": this.selectedDude.instanceId,
            "InstanceId": null,
            "RevisionId": null,
            "AuthorId": null,
            "AuthorName": null,
            "RevisionDateUtc": null,
            "CreatedDateUtc": null,
            "IsArchived": false,
            "IsCurrent": true,
            "IsOriginal": true
        };

        console.log('New EC', newEC);

        var self = this;
        if (this.isAddEmergencyContact){
            this._medicalSvc.addEC(this.selectedDude.instanceId, newEC).subscribe(result => {
                console.log("newEC", result);

                self.selectedDude.emergencyContact = [{
                    EmergencyContactEntityId: result.EmergencyContactEntityId,
                    EntityId: result.EntityId,
                    InstanceId: result.InstanceId
                }];

                // Get the Emergency Contact
                self._serverAPI.getPersonByInstanceIdNoDetails(result.EmergencyContactEntityId).subscribe(pec => {
                    console.log("getPersonByInstanceIdNoDetails", JSON.stringify(pec));
                    if (pec) {
                        self.selectedEmergencyContact = pec;
                        self.selectedECName = pec.Name;
                    }
                }
                    , error => alert(`Server error. Try again later`)
                    , done => console.log('emergencyContact::getPersonByInstanceId done'));

                $('#editEmergencyContactsModal').modal('hide');

            }, error => alert(`Server error. Try again later`));
        } else {
            this._medicalSvc.updateEC(this.selectedDude.emergencyContact[0].InstanceId, newEC).subscribe(result => {

                console.log("newEC", result);

                // Get the Emergency Contact
                self._serverAPI.getPersonByInstanceIdNoDetails(result.EmergencyContactEntityId).subscribe(pec => {
                    console.log("getPersonByInstanceIdNoDetails", JSON.stringify(pec));
                    if (pec) {
                        self.selectedEmergencyContact = pec;
                        self.selectedECName = pec.Name;
                    }
                }
                    , error => alert(`Server error. Try again later`)
                    , done => console.log('emergencyContact::getPersonByInstanceId done'));

                $('#editEmergencyContactsModal').modal('hide');

            }, error => alert(`Server error. Try again later`));
        }

    }

    deletetEmergencyContacts(event) {
        event.preventDefault();

        let msg = `Do you want to delete contact?`;

        var self = this;

        this._modalService.activate(msg).then(responseOK => {
            if (responseOK) {
                self._medicalSvc.archiveEC(self.selectedDude.emergencyContact[0].InstanceId).subscribe(result => {

                    self.selectedDude.emergencyContact = null;
                    self.selectedEmergencyContact = null;
                    self.tempEmergencyContact = null;
                    self.selectedECName = null;

                    console.log(result);
                    $('#editEmergencyContactsModal').modal('hide');

                }, error => alert(`Server error. Try again later`));

            }
        });
    }

    closeEmergencyContacts(event) {
        event.preventDefault();

        this.selectedDude.emergencyContact = JSON.parse(JSON.stringify(this.tempEmergencyContact));;
        this.selectedEmergencyContact = JSON.parse(JSON.stringify(this.tempEmergencyContact));;

        $('#editEmergencyContactsModal').modal('hide');
    }

    //==========
    // Edit Sex
    //==========
    openEditSex(event) {
        event.preventDefault();
        this.tempSex = this.selectedDude.sex;
        $('#editSexModal').modal('show');
    }

    closeEditSex(event) {
        event.preventDefault();

        $('#editSexModal').modal('hide');
    }

    saveSexChange(event) {
        event.preventDefault();

        if (!this.tempSex || this.selectedDude.sex === this.tempSex) {
            //No change so just exit
            $('#editSexModal').modal('hide');
            return;
        }

        //this.saving = true;

        if (this.selectedDude.sex === null && this.tempSex && this.selectedDude.sex !== this.tempSex) {
            // Add
            this._medicalSvc.addSex(this.selectedDude.instanceId, this.tempSex).subscribe(result => {
                console.log(result);
                //this.saving = false;
                $('#editSexModal').modal('hide');
            }, error => alert(`Server error. Try again later`));
        } else {
            // Update
            this._medicalSvc.updateSex(this.selectedDude.instanceId, this.tempSex).subscribe(result => {
                console.log(result);
                //this.saving = false;
                $('#editSexModal').modal('hide');
            }, error => alert(`Server error. Try again later`));
        }

        this.selectedDude.sex = this.tempSex;
    }

    changeSex(event, val) {
        event.preventDefault();
        this.tempSex = val;
    }

    //=================
    // Edit Blood Type
    //=================
    openBloodType(event) {
        event.preventDefault();
        this.tempBT = this.selectedDude.bloodType;
        $('#editBloodType').modal('show');
    }

    closeBloodType(event) {
        event.preventDefault();

        $('#editBloodType').modal('hide');
    }

    saveBloodType(event) {
        event.preventDefault();

        if (!this.tempBT || this.selectedDude.bloodType === this.tempBT) {
            // No Change so just exit
            $('#editBloodType').modal('hide');
            return;
        }

        //this.saving = true;

        if (this.selectedDude.bloodType === undefined && this.tempBT && this.selectedDude.bloodType !== this.tempBT) {
            // Add
            this._medicalSvc.addBloodType(this.selectedDude.instanceId, this.tempBT).subscribe(result => {
                console.log(result);
                //this.saving = false;
                $('#editBloodType').modal('hide');
            }, error => alert(`Server error. Try again later`));
        } else {
            // Update
            this._medicalSvc.updateBloodType(this.selectedDude.instanceId, this.tempBT).subscribe(result => {
                console.log(result);
                //this.saving = false;
                $('#editBloodType').modal('hide');
            }, error => alert(`Server error. Try again later`));
        }

        this.selectedDude.bloodType = this.tempBT;
    }

    changeBloodType(event, val) {
        event.preventDefault();

        this.tempBT = val;
    }

    // ============
    // Edit Height
    // ============
    getHeight() {

        if (this.heightUnit === 0) {
            //Feet/inches :: Value is stored as inches
            this.heightFeet = Math.floor(this.selectedDude.height.value / 12);
            this.heightInches = this.selectedDude.height.value % 12;

            if (this.heightFeet === 0 && this.heightInches === 0) {
                return '';
            } else {
                return this.heightFeet + ' ft ' + this.heightInches + ' in';
            }
        } else {
            //Cm
            this.heightCm = this.selectedDude.height.value;

            if (this.heightCm === 0) {
                return ''
            } else {
                return this.heightCm + ' Cm';
            }
        }
    }

    toFeet(cm) {
        var realFeet = ((cm * 0.393700) / 12);
        var feet = Math.floor(realFeet);
        var inches = Math.round((realFeet - feet) * 12);
        return feet + "'" + inches + "\"";
    }

    toCm(feet, inches) {
        feet = feet || 0;

        return Math.round(((feet * 12) + inches) * 2.54);
    }

    changeHeightUnit(event, unit) {
        event.preventDefault();

        this.heightUnit = unit;
    }

    openEditHeight(event) {
        event.preventDefault();
        $('#editHeight').modal('show');
    }

    closeHeight(event) {
        event.preventDefault();
        $('#editHeight').modal('hide');
    }

    saveHeight(event, txtFeet, txtInches, txtCm) {
        event.preventDefault();

        if (this.heightUnit === 0) {
            //Inches
            this.tempHeightVal = txtFeet * 12 + txtInches * 1;
            this.heightFeet = txtFeet;
            this.heightInches = txtInches;
        } else {
            //Cm
            this.tempHeightVal = txtCm;
            this.heightCm = txtCm;
        }


        if (!this.tempHeightVal || this.selectedDude.height.value === this.tempHeightVal) {
            // No Change so just exit
            $('#editHeight').modal('hide');
            return;
        }

        //this.saving = true;

        if (this.selectedDude.height.value === 0 && this.tempHeightVal && this.selectedDude.height.value !== this.tempHeightVal) {
            // Add
            this._medicalSvc.addHeight(this.selectedDude.instanceId, this.heightUnit, this.tempHeightVal).subscribe(result => {
                console.log(result);
                //this.saving = false;
                $('#editHeight').modal('hide');
            }, error => alert(`Server error. Try again later`));
        } else {
            // Update
            this._medicalSvc.updateHeight(this.selectedDude.instanceId, this.heightUnit, this.tempHeightVal).subscribe(result => {
                console.log(result);
                //this.saving = false;
                $('#editHeight').modal('hide');
            }, error => alert(`Server error. Try again later`));
        }

        this.selectedDude.height.value = this.tempHeightVal;
    }

    //========
    // Weight
    //========
    getWeight() {
        if (this.tempWeightUnit === 0) {
            // Pounds
            if (this.selectedDude.weight.value === 0) {
                return '';
            } else {
                return this.selectedDude.weight.value + ' pounds';
            }
        } else {
            // Kg
            if (this.selectedDude.weight.value === 0) {
                return '';
            } else {
                return this.selectedDude.weight.value + ' Kg';
            }
        }
    }

    openEditWeight(event) {
        event.preventDefault();
        $('#editWeight').modal('show');
    }

    closeWeight(event) {
        event.preventDefault();
        $('#editWeight').modal('hide');
    }

    changeWeightUnit(event, unit) {
        event.preventDefault();

        this.tempWeightUnit = unit;
    }

    saveWeight(event, weight) {
        event.preventDefault();

        this.selectedDude.weight.unit = this.tempWeightUnit;

        //if (this.tempWeightUnit === 0) {
        //    //Pounds
        //    this.tempWeightVal = pounds * 1;
        //} else {
        //    //Kg
        //    this.tempWeightVal = kg * 1;
        //}

        this.tempWeightVal = weight * 1;

        if (!this.tempWeightVal || this.selectedDude.weight.value === this.tempWeightVal) {
            // No Change so just exit
            $('#editWeight').modal('hide');
            return;
        }

        //this.saving = true;

        if (this.selectedDude.weight.value === 0 && this.tempWeightVal && this.selectedDude.weight.value !== this.tempWeightVal) {
            // Add
            this._medicalSvc.addWeight(this.selectedDude.instanceId, this.tempWeightUnit, this.tempWeightVal).subscribe(result => {
                console.log(result);
                //this.saving = false;
                $('#editWeight').modal('hide');
            }, error => alert(`Server error. Try again later`));
        } else {
            // Update
            this._medicalSvc.updateWeight(this.selectedDude.instanceId, this.tempWeightUnit, this.tempWeightVal).subscribe(result => {
                console.log(result);
                //this.saving = false;
                $('#editWeight').modal('hide');
            }, error => alert(`Server error. Try again later`));
        }

        this.selectedDude.weight.value = this.tempWeightVal;
    }
}
