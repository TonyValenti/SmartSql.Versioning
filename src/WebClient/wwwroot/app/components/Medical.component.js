System.register(['angular2/core', '../services/ServerAPI.service', '../services/Medical.service', '../directives/SelectedPerson.directive', 'angular2/router', '../pipes/bloodtype.pipe'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, ServerAPI_service_1, Medical_service_1, SelectedPerson_directive_1, router_1, bloodtype_pipe_1;
    var Medical;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ServerAPI_service_1_1) {
                ServerAPI_service_1 = ServerAPI_service_1_1;
            },
            function (Medical_service_1_1) {
                Medical_service_1 = Medical_service_1_1;
            },
            function (SelectedPerson_directive_1_1) {
                SelectedPerson_directive_1 = SelectedPerson_directive_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (bloodtype_pipe_1_1) {
                bloodtype_pipe_1 = bloodtype_pipe_1_1;
            }],
        execute: function() {
            Medical = (function () {
                function Medical(_serverAPI, _medicalSvc, _routeParams) {
                    this._serverAPI = _serverAPI;
                    this._medicalSvc = _medicalSvc;
                    this._routeParams = _routeParams;
                    this.tempAllergie = { name: "", treatment: "", instanceId: "" };
                    this.isAddAllergie = true;
                    this.tempMedication = { name: "", description: "", usageText: "", instanceId: "" };
                    this.isAddMedication = true;
                    this.tempProcedure = { Name: "", Description: "", Date: "", InstanceId: "" };
                    this.isAddProcedure = true;
                    this.tempImmunization = { Name: "", Date: "", InstanceId: "" };
                    this.isAddImmunization = true;
                    this.tempIncident = { Name: "", Description: "", Date: "", InstanceId: "" };
                    this.isAddIncident = true;
                    this.tempCondition = { Name: "", Description: "", InstanceId: "" };
                    this.isAddCondition = true;
                    this.tempInsurance = { Name: "", Details: "", InstanceId: "" };
                    this.isAddInsurance = true;
                    this.tempEmergencyContact = { Name: "", Phone: "" };
                    this.isAddEmergencyContact = true;
                    this.tempSex = 0;
                    this.BTValues = {
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
                    this.tempBT = this.BTValues.Unknown;
                    this.heightUnit = 0; //Inches - 0 , Centimeters - 1
                    this.heightFeet = 0;
                    this.heightInches = 0;
                    this.heightCm = 0;
                    this.tempHeightVal = 0;
                    this.tempWeightVal = 0;
                    this.tempWeightUnit = 0; // pounds - 0, kilograms - 1
                }
                Medical.prototype.ngOnInit = function () {
                    var instanceId = this._routeParams.get('instanceId');
                    if (!instanceId) {
                        alert("No instanceId provided ... try entering one in the url, like so: http://localhost:3000/Identity?instanceId=22fcf440-d3d5-e511-8d7c-a0b3cc47d18e");
                    }
                    var self = this;
                    // Make an Ajax call to get person from DB .subscribe(person => { currPerson = person; }
                    this._serverAPI.getPersonByInstanceId(instanceId).subscribe(function (p) {
                        self.selectedDude = p;
                        self.tempSex = self.selectedDude.sex;
                        self.tempBT = self.selectedDude.bloodType;
                        self.heightUnit = self.selectedDude.height && self.selectedDude.height.unit || 0;
                        self.tempHeightVal = self.selectedDude.height && self.selectedDude.height.value || 0;
                        self.tempWeightVal = self.selectedDude.weight && self.selectedDude.weight.value || 0;
                        self.tempWeightUnit = self.selectedDude.weight && self.selectedDude.weight.unit || 0;
                    }, function (error) { return alert("Server error. Try again later"); }, function (done) { return console.log('getPersonByInstanceId done'); });
                };
                //--------------------------------
                //------ Add/Edit Allergies ------
                //--------------------------------
                Medical.prototype.editAllergie = function (event, allergie, isAdd) {
                    event.preventDefault();
                    this.isAddAllergie = isAdd;
                    if (isAdd) {
                        //Add
                        this.tempAllergie = { name: "", treatment: "", instanceId: "" };
                    }
                    else {
                        //Edit
                        this.tempAllergie = JSON.parse(JSON.stringify(allergie));
                        this.selectedAllergie = allergie;
                    }
                    $('#editAllergieModal').modal('show');
                };
                Medical.prototype.saveAllergiee = function (event) {
                    event.preventDefault();
                    if (this.isAddAllergie) {
                        this.selectedDude.allergies.push(this.tempAllergie);
                        this._medicalSvc.addAllergy(this.selectedDude.instanceId, this.tempAllergie).subscribe(function (result) {
                            console.log(result);
                            //this.saving = false;
                            $('#editAllergieModal').modal('hide');
                        }, function (error) { return alert("Server error. Try again later"); });
                    }
                    else {
                        if (this.selectedAllergie.name !== this.tempAllergie.name || this.selectedAllergie.treatment !== this.tempAllergie.treatment) {
                            this._medicalSvc.updateAllergy(this.tempAllergie.instanceId, this.tempAllergie).subscribe(function (result) {
                                console.log(result);
                                //this.saving = false;
                                $('#editAllergieModal').modal('hide');
                            }, function (error) { return alert("Server error. Try again later"); });
                        }
                        this.selectedAllergie.name = this.tempAllergie.name;
                        this.selectedAllergie.treatment = this.tempAllergie.treatment;
                    }
                    $('#editAllergieModal').modal('hide');
                };
                Medical.prototype.deletetAllergie = function (event, index) {
                    event.preventDefault();
                    this._medicalSvc.archiveAllergy(this.selectedDude.allergies[index].instanceId).subscribe(function (result) {
                        console.log(result);
                        //this.saving = false;
                        $('#editAllergieModal').modal('hide');
                    }, function (error) { return alert("Server error. Try again later"); });
                    this.selectedDude.allergies.splice(index, 1);
                };
                Medical.prototype.closeAllergie = function (event) {
                    event.preventDefault();
                    $('#editAllergieModal').modal('hide');
                };
                //--------------------------------
                //------ Add/Edit Medication ------
                //--------------------------------
                Medical.prototype.editMedication = function (event, medication, isAdd) {
                    event.preventDefault();
                    this.isAddMedication = isAdd;
                    if (isAdd) {
                        this.tempMedication = { name: "", description: "", usageText: "", instanceId: "" };
                    }
                    else {
                        this.tempMedication = JSON.parse(JSON.stringify(medication));
                        this.selectedMedication = medication;
                    }
                    $('#editMedicationModal').modal('show');
                };
                Medical.prototype.saveMedication = function (event) {
                    event.preventDefault();
                    if (this.isAddMedication) {
                        this.selectedDude.medications.push(this.tempMedication);
                        this._medicalSvc.addMedication(this.selectedDude.instanceId, this.tempMedication).subscribe(function (result) {
                            console.log(result);
                            //this.saving = false;
                            $('#editMedicationModal').modal('hide');
                        }, function (error) { return alert("Server error. Try again later"); });
                    }
                    else {
                        if (this.selectedMedication.name !== this.tempMedication.name || this.selectedMedication.description !== this.tempMedication.description || this.selectedMedication.usageText !== this.tempMedication.usageText) {
                            this._medicalSvc.updateMedication(this.tempMedication.instanceId, this.tempMedication).subscribe(function (result) {
                                console.log(result);
                                //this.saving = false;
                                $('#editMedicationModal').modal('hide');
                            }, function (error) { return alert("Server error. Try again later"); });
                        }
                        this.selectedMedication.name = this.tempMedication.name;
                        this.selectedMedication.description = this.tempMedication.description;
                        this.selectedMedication.usageText = this.tempMedication.usageText;
                    }
                    $('#editMedicationModal').modal('hide');
                };
                Medical.prototype.deletetMedication = function (event, index) {
                    event.preventDefault();
                    this._medicalSvc.archiveMedication(this.selectedDude.medications[index].instanceId).subscribe(function (result) {
                        console.log(result);
                        //this.saving = false;
                        $('#editMedicationModal').modal('hide');
                    }, function (error) { return alert("Server error. Try again later"); });
                    this.selectedDude.medications.splice(index, 1);
                };
                Medical.prototype.closeMedication = function (event) {
                    event.preventDefault();
                    $('#editMedicationModal').modal('hide');
                };
                //--------------------------------
                //------ Add/Edit Procedure ------
                //--------------------------------
                Medical.prototype.editProcedure = function (event, procedure, isAdd) {
                    event.preventDefault();
                    this.isAddProcedure = isAdd;
                    if (isAdd) {
                        this.tempProcedure = { Name: "", Description: "", Date: "", InstanceId: "" };
                    }
                    else {
                        this.tempProcedure = JSON.parse(JSON.stringify(procedure));
                        this.selectedProcedure = procedure;
                    }
                    $('#editProcedureModal').modal('show');
                };
                Medical.prototype.saveProcedure = function (event) {
                    event.preventDefault();
                    if (this.isAddProcedure) {
                        this.selectedDude.procedures.push(this.tempProcedure);
                        this._medicalSvc.addProcedure(this.selectedDude.instanceId, this.tempProcedure).subscribe(function (result) {
                            console.log(result);
                            //this.saving = false;
                            $('#editProcedureModal').modal('hide');
                        }, function (error) { return alert("Server error. Try again later"); });
                    }
                    else {
                        if (this.selectedProcedure.Name !== this.tempProcedure.Name || this.selectedProcedure.Description !== this.tempProcedure.Description || this.selectedProcedure.Date !== this.tempProcedure.Date) {
                            this._medicalSvc.updateProcedure(this.tempProcedure.InstanceId, this.tempProcedure).subscribe(function (result) {
                                console.log(result);
                                //this.saving = false;
                                $('#editProcedureModal').modal('hide');
                            }, function (error) { return alert("Server error. Try again later"); });
                        }
                        this.selectedProcedure.Name = this.tempProcedure.Name;
                        this.selectedProcedure.Description = this.tempProcedure.Description;
                        this.selectedProcedure.Date = this.tempProcedure.Date;
                    }
                    $('#editProcedureModal').modal('hide');
                };
                Medical.prototype.deletetProcedure = function (event, index) {
                    event.preventDefault();
                    this._medicalSvc.archiveProcedure(this.selectedDude.procedures[index].InstanceId).subscribe(function (result) {
                        console.log(result);
                        //this.saving = false;
                        $('#editProcedureModal').modal('hide');
                    }, function (error) { return alert("Server error. Try again later"); });
                    this.selectedDude.procedures.splice(index, 1);
                };
                Medical.prototype.closeProcedure = function (event) {
                    event.preventDefault();
                    $('#editProcedureModal').modal('hide');
                };
                //-----------------------------------
                //------ Add/Edit Immunization ------
                //-----------------------------------
                Medical.prototype.editImmunization = function (event, immunization, isAdd) {
                    event.preventDefault();
                    this.isAddImmunization = isAdd;
                    if (isAdd) {
                        this.tempImmunization = { Name: "", Date: "", InstanceId: "" };
                    }
                    else {
                        this.tempImmunization = JSON.parse(JSON.stringify(immunization));
                        this.selectedImmunization = immunization;
                    }
                    $('#editImmunizationModal').modal('show');
                };
                Medical.prototype.saveImmunization = function (event) {
                    event.preventDefault();
                    if (this.isAddImmunization) {
                        this.selectedDude.immunizations.push(this.tempImmunization);
                        this._medicalSvc.addImmunization(this.selectedDude.instanceId, this.tempImmunization).subscribe(function (result) {
                            console.log(result);
                            //this.saving = false;
                            $('#editImmunizationModal').modal('hide');
                        }, function (error) { return alert("Server error. Try again later"); });
                    }
                    else {
                        if (this.selectedImmunization.Name !== this.tempImmunization.Name || this.selectedImmunization.Date !== this.tempImmunization.Date) {
                            this._medicalSvc.updateImmunization(this.tempImmunization.InstanceId, this.tempImmunization).subscribe(function (result) {
                                console.log(result);
                                //this.saving = false;
                                $('#editImmunizationModal').modal('hide');
                            }, function (error) { return alert("Server error. Try again later"); });
                        }
                        this.selectedImmunization.Name = this.tempImmunization.Name;
                        this.selectedImmunization.Date = this.tempImmunization.Date;
                    }
                    $('#editImmunizationModal').modal('hide');
                };
                Medical.prototype.deletetImmunization = function (event, index) {
                    event.preventDefault();
                    this._medicalSvc.archiveImmunization(this.selectedDude.immunizations[index].InstanceId).subscribe(function (result) {
                        console.log(result);
                        //this.saving = false;
                        $('#editImmunizationModal').modal('hide');
                    }, function (error) { return alert("Server error. Try again later"); });
                    this.selectedDude.immunizations.splice(index, 1);
                };
                Medical.prototype.closeImmunization = function (event) {
                    event.preventDefault();
                    $('#editImmunizationModal').modal('hide');
                };
                //-------------------------------
                //------ Add/Edit Incident ------
                //-------------------------------
                Medical.prototype.editIncident = function (event, incident, isAdd) {
                    event.preventDefault();
                    this.isAddIncident = isAdd;
                    if (isAdd) {
                        this.tempIncident = { Name: "", Description: "", Date: "", InstanceId: "" };
                    }
                    else {
                        this.tempIncident = JSON.parse(JSON.stringify(incident));
                        this.selectedIncident = incident;
                    }
                    $('#editIncidentModal').modal('show');
                };
                Medical.prototype.saveIncident = function (event) {
                    event.preventDefault();
                    if (this.isAddIncident) {
                        this.selectedDude.incidents.push(this.tempIncident);
                        this._medicalSvc.addIncident(this.selectedDude.instanceId, this.tempIncident).subscribe(function (result) {
                            console.log(result);
                            //this.saving = false;
                            $('#editIncidentModal').modal('hide');
                        }, function (error) { return alert("Server error. Try again later"); });
                    }
                    else {
                        if (this.selectedIncident.Name !== this.tempIncident.Name ||
                            this.selectedIncident.Description !== this.tempIncident.Description ||
                            this.selectedIncident.Date !== this.tempIncident.Date) {
                            this._medicalSvc.updateIncident(this.tempIncident.InstanceId, this.tempIncident).subscribe(function (result) {
                                console.log(result);
                                //this.saving = false;
                                $('#editIncidentModal').modal('hide');
                            }, function (error) { return alert("Server error. Try again later"); });
                        }
                        this.selectedIncident.Name = this.tempIncident.Name;
                        this.selectedIncident.Description = this.tempIncident.Description;
                        this.selectedIncident.Date = this.tempIncident.Date;
                    }
                    $('#editIncidentModal').modal('hide');
                };
                Medical.prototype.deletetIncident = function (event, index) {
                    event.preventDefault();
                    this._medicalSvc.archiveIncident(this.selectedDude.incidents[index].InstanceId).subscribe(function (result) {
                        console.log(result);
                        //this.saving = false;
                        $('#editIncidentModal').modal('hide');
                    }, function (error) { return alert("Server error. Try again later"); });
                    this.selectedDude.incidents.splice(index, 1);
                };
                Medical.prototype.closeIncident = function (event) {
                    event.preventDefault();
                    $('#editIncidentModal').modal('hide');
                };
                //---------------------------------
                //------ Add/Edit Conditions ------
                //---------------------------------
                Medical.prototype.editCondition = function (event, condition, isAdd) {
                    event.preventDefault();
                    this.isAddCondition = isAdd;
                    if (isAdd) {
                        this.tempCondition = { Name: "", Description: "", InstanceId: "" };
                    }
                    else {
                        this.tempCondition = JSON.parse(JSON.stringify(condition));
                        this.selectedCondition = condition;
                    }
                    $('#editConditionModal').modal('show');
                };
                Medical.prototype.saveCondition = function (event) {
                    event.preventDefault();
                    if (this.isAddCondition) {
                        this.selectedDude.conditions.push(this.tempCondition);
                        this._medicalSvc.addCondition(this.selectedDude.instanceId, this.tempCondition).subscribe(function (result) {
                            console.log(result);
                            //this.saving = false;
                            $('#editConditionModal').modal('hide');
                        }, function (error) { return alert("Server error. Try again later"); });
                    }
                    else {
                        if (this.selectedCondition.Name !== this.tempCondition.Name ||
                            this.selectedCondition.Description !== this.tempCondition.Description) {
                            this._medicalSvc.updateCondition(this.tempCondition.InstanceId, this.tempCondition).subscribe(function (result) {
                                console.log(result);
                                //this.saving = false;
                                $('#editConditionModal').modal('hide');
                            }, function (error) { return alert("Server error. Try again later"); });
                            this.selectedCondition.Name = this.tempCondition.Name;
                            this.selectedCondition.Description = this.tempCondition.Description;
                        }
                    }
                    $('#editConditionModal').modal('hide');
                };
                Medical.prototype.deletetCondition = function (event, index) {
                    event.preventDefault();
                    this._medicalSvc.archiveCondition(this.selectedDude.conditions[index].InstanceId).subscribe(function (result) {
                        console.log(result);
                        //this.saving = false;
                        $('#editConditionModal').modal('hide');
                    }, function (error) { return alert("Server error. Try again later"); });
                    this.selectedDude.conditions.splice(index, 1);
                };
                Medical.prototype.closeCondition = function (event) {
                    event.preventDefault();
                    $('#editConditionModal').modal('hide');
                };
                //--------------------------------
                //------ Add/Edit Insurance ------
                //--------------------------------
                Medical.prototype.editInsurance = function (event, insurance, isAdd) {
                    event.preventDefault();
                    this.isAddInsurance = isAdd;
                    if (isAdd) {
                        this.tempInsurance = { Name: "", Details: "", InstanceId: "" };
                    }
                    else {
                        this.tempInsurance = JSON.parse(JSON.stringify(insurance));
                        this.selectedInsurance = insurance;
                    }
                    $('#editInsuranceModal').modal('show');
                };
                Medical.prototype.saveInsurance = function (event) {
                    event.preventDefault();
                    if (this.isAddInsurance) {
                        this.selectedDude.insurances.push(this.tempInsurance);
                        this._medicalSvc.addInsurance(this.selectedDude.instanceId, this.tempInsurance).subscribe(function (result) {
                            console.log(result);
                            //this.saving = false;
                            $('#editInsuranceModal').modal('hide');
                        }, function (error) { return alert("Server error. Try again later"); });
                    }
                    else {
                        if (this.selectedInsurance.Name !== this.tempInsurance.Name ||
                            this.selectedInsurance.Details !== this.tempInsurance.Details) {
                            this._medicalSvc.updateInsurance(this.tempInsurance.InstanceId, this.tempInsurance).subscribe(function (result) {
                                console.log(result);
                                //this.saving = false;
                                $('#editInsuranceModal').modal('hide');
                            }, function (error) { return alert("Server error. Try again later"); });
                            this.selectedInsurance.Name = this.tempInsurance.Name;
                            this.selectedInsurance.Details = this.tempInsurance.Details;
                        }
                    }
                    $('#editInsuranceModal').modal('hide');
                };
                Medical.prototype.deletetInsurance = function (event, index) {
                    event.preventDefault();
                    this._medicalSvc.archiveInsurance(this.selectedDude.insurances[index].InstanceId).subscribe(function (result) {
                        console.log(result);
                        //this.saving = false;
                        $('#editInsuranceModal').modal('hide');
                    }, function (error) { return alert("Server error. Try again later"); });
                    this.selectedDude.insurances.splice(index, 1);
                };
                Medical.prototype.closeInsurance = function (event) {
                    event.preventDefault();
                    $('#editInsuranceModal').modal('hide');
                };
                //-----------------------------------------
                //------ Add/Edit Emergency Contacts ------
                //-----------------------------------------
                Medical.prototype.editEmergencyContacts = function (event, emergencyContact, isAdd) {
                    event.preventDefault();
                    this.isAddEmergencyContact = isAdd;
                    if (isAdd) {
                        this.tempEmergencyContact = { Name: "", Phone: "" };
                    }
                    else {
                        this.tempEmergencyContact = JSON.parse(JSON.stringify(emergencyContact));
                        this.selectedEmergencyContact = emergencyContact;
                    }
                    $('#editEmergencyContactsModal').modal('show');
                };
                Medical.prototype.saveEmergencyContacts = function (event) {
                    event.preventDefault();
                    if (this.isAddEmergencyContact) {
                        this.selectedDude.emContacts.push(this.tempEmergencyContact);
                    }
                    else {
                        this.selectedEmergencyContact.Name = this.tempEmergencyContact.Name;
                        this.selectedEmergencyContact.Phone = this.tempEmergencyContact.Phone;
                    }
                    $('#editEmergencyContactsModal').modal('hide');
                };
                Medical.prototype.deletetEmergencyContacts = function (event, index) {
                    event.preventDefault();
                    this.selectedDude.emContacts.splice(index, 1);
                };
                Medical.prototype.closeEmergencyContacts = function (event) {
                    event.preventDefault();
                    $('#editEmergencyContactsModal').modal('hide');
                };
                //==========
                // Edit Sex
                //==========
                Medical.prototype.openEditSex = function (event) {
                    event.preventDefault();
                    this.tempSex = this.selectedDude.sex;
                    $('#editSexModal').modal('show');
                };
                Medical.prototype.closeEditSex = function (event) {
                    event.preventDefault();
                    $('#editSexModal').modal('hide');
                };
                Medical.prototype.saveSexChange = function (event) {
                    event.preventDefault();
                    if (!this.tempSex || this.selectedDude.sex === this.tempSex) {
                        //No change so just exit
                        $('#editSexModal').modal('hide');
                        return;
                    }
                    //this.saving = true;
                    if (this.selectedDude.sex === null && this.tempSex && this.selectedDude.sex !== this.tempSex) {
                        // Add
                        this._medicalSvc.addSex(this.selectedDude.instanceId, this.tempSex).subscribe(function (result) {
                            console.log(result);
                            //this.saving = false;
                            $('#editSexModal').modal('hide');
                        }, function (error) { return alert("Server error. Try again later"); });
                    }
                    else {
                        // Update
                        this._medicalSvc.updateSex(this.selectedDude.instanceId, this.tempSex).subscribe(function (result) {
                            console.log(result);
                            //this.saving = false;
                            $('#editSexModal').modal('hide');
                        }, function (error) { return alert("Server error. Try again later"); });
                    }
                    this.selectedDude.sex = this.tempSex;
                };
                Medical.prototype.changeSex = function (event, val) {
                    event.preventDefault();
                    this.tempSex = val;
                };
                //=================
                // Edit Blood Type
                //=================
                Medical.prototype.openBloodType = function (event) {
                    event.preventDefault();
                    this.tempBT = this.selectedDude.bloodType;
                    $('#editBloodType').modal('show');
                };
                Medical.prototype.closeBloodType = function (event) {
                    event.preventDefault();
                    $('#editBloodType').modal('hide');
                };
                Medical.prototype.saveBloodType = function (event) {
                    event.preventDefault();
                    if (!this.tempBT || this.selectedDude.bloodType === this.tempBT) {
                        // No Change so just exit
                        $('#editBloodType').modal('hide');
                        return;
                    }
                    //this.saving = true;
                    if (this.selectedDude.bloodType === undefined && this.tempBT && this.selectedDude.bloodType !== this.tempBT) {
                        // Add
                        this._medicalSvc.addBloodType(this.selectedDude.instanceId, this.tempBT).subscribe(function (result) {
                            console.log(result);
                            //this.saving = false;
                            $('#editBloodType').modal('hide');
                        }, function (error) { return alert("Server error. Try again later"); });
                    }
                    else {
                        // Update
                        this._medicalSvc.updateBloodType(this.selectedDude.instanceId, this.tempBT).subscribe(function (result) {
                            console.log(result);
                            //this.saving = false;
                            $('#editBloodType').modal('hide');
                        }, function (error) { return alert("Server error. Try again later"); });
                    }
                    this.selectedDude.bloodType = this.tempBT;
                };
                Medical.prototype.changeBloodType = function (event, val) {
                    event.preventDefault();
                    this.tempBT = val;
                };
                // ============
                // Edit Height
                // ============
                Medical.prototype.getHeight = function () {
                    if (this.heightUnit === 0) {
                        //Feet/inches :: Value is stored as inches
                        this.heightFeet = Math.floor(this.selectedDude.height.value / 12);
                        this.heightInches = this.selectedDude.height.value % 12;
                        if (this.heightFeet === 0 && this.heightInches === 0) {
                            return 'Empty';
                        }
                        else {
                            return this.heightFeet + ' ft ' + this.heightInches + ' in';
                        }
                    }
                    else {
                        //Cm
                        this.heightCm = this.selectedDude.height.value;
                        if (this.heightCm === 0) {
                            return 'Empty';
                        }
                        else {
                            return this.heightCm + ' Cm';
                        }
                    }
                };
                Medical.prototype.toFeet = function (cm) {
                    var realFeet = ((cm * 0.393700) / 12);
                    var feet = Math.floor(realFeet);
                    var inches = Math.round((realFeet - feet) * 12);
                    return feet + "'" + inches + "\"";
                };
                Medical.prototype.toCm = function (feet, inches) {
                    feet = feet || 0;
                    return Math.round(((feet * 12) + inches) * 2.54);
                };
                Medical.prototype.changeHeightUnit = function (event, unit) {
                    event.preventDefault();
                    this.heightUnit = unit;
                };
                Medical.prototype.openEditHeight = function (event) {
                    event.preventDefault();
                    $('#editHeight').modal('show');
                };
                Medical.prototype.closeHeight = function (event) {
                    event.preventDefault();
                    $('#editHeight').modal('hide');
                };
                Medical.prototype.saveHeight = function (event, txtFeet, txtInches, txtCm) {
                    event.preventDefault();
                    if (this.heightUnit === 0) {
                        //Inches
                        this.tempHeightVal = txtFeet * 12 + txtInches * 1;
                        this.heightFeet = txtFeet;
                        this.heightInches = txtInches;
                    }
                    else {
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
                        this._medicalSvc.addHeight(this.selectedDude.instanceId, this.heightUnit, this.tempHeightVal).subscribe(function (result) {
                            console.log(result);
                            //this.saving = false;
                            $('#editHeight').modal('hide');
                        }, function (error) { return alert("Server error. Try again later"); });
                    }
                    else {
                        // Update
                        this._medicalSvc.updateHeight(this.selectedDude.instanceId, this.heightUnit, this.tempHeightVal).subscribe(function (result) {
                            console.log(result);
                            //this.saving = false;
                            $('#editHeight').modal('hide');
                        }, function (error) { return alert("Server error. Try again later"); });
                    }
                    this.selectedDude.height.value = this.tempHeightVal;
                };
                //========
                // Weight
                //========
                Medical.prototype.getWeight = function () {
                    if (this.tempWeightUnit === 0) {
                        // Pounds
                        if (this.selectedDude.weight.value === 0) {
                            return 'Empty';
                        }
                        else {
                            return this.selectedDude.weight.value + ' pounds';
                        }
                    }
                    else {
                        // Kg
                        if (this.selectedDude.weight.value === 0) {
                            return 'Empty';
                        }
                        else {
                            return this.selectedDude.weight.value + ' Kg';
                        }
                    }
                };
                Medical.prototype.openEditWeight = function (event) {
                    event.preventDefault();
                    $('#editWeight').modal('show');
                };
                Medical.prototype.closeWeight = function (event) {
                    event.preventDefault();
                    $('#editWeight').modal('hide');
                };
                Medical.prototype.changeWeightUnit = function (event, unit) {
                    event.preventDefault();
                    this.tempWeightUnit = unit;
                };
                Medical.prototype.saveWeight = function (event, pounds, kg) {
                    event.preventDefault();
                    this.selectedDude.weight.unit = this.tempWeightUnit;
                    if (this.tempWeightUnit === 0) {
                        //Pounds
                        this.tempWeightVal = pounds * 1;
                    }
                    else {
                        //Kg
                        this.tempWeightVal = kg * 1;
                    }
                    if (!this.tempWeightVal || this.selectedDude.weight.value === this.tempWeightVal) {
                        // No Change so just exit
                        $('#editWeight').modal('hide');
                        return;
                    }
                    this.selectedDude.weight.value = this.tempWeightVal;
                    //this.saving = true;
                    if (this.selectedDude.weight.value === 0 && this.tempWeightVal && this.selectedDude.weight.value !== this.tempWeightVal) {
                        // Add
                        this._medicalSvc.addWeight(this.selectedDude.instanceId, this.tempWeightUnit, this.tempWeightVal).subscribe(function (result) {
                            console.log(result);
                            //this.saving = false;
                            $('#editWeight').modal('hide');
                        }, function (error) { return alert("Server error. Try again later"); });
                    }
                    else {
                        // Update
                        this._medicalSvc.updateWeight(this.selectedDude.instanceId, this.tempWeightUnit, this.tempWeightVal).subscribe(function (result) {
                            console.log(result);
                            //this.saving = false;
                            $('#editWeight').modal('hide');
                        }, function (error) { return alert("Server error. Try again later"); });
                    }
                };
                Medical = __decorate([
                    core_1.Component({
                        selector: 'medical',
                        templateUrl: '../app/templates/medicalComp.html',
                        pipes: [bloodtype_pipe_1.bloodtype],
                        directives: [SelectedPerson_directive_1.SelectedPersonDirective],
                        providers: [Medical_service_1.MedicalSvc]
                    }),
                    __param(0, core_1.Inject(ServerAPI_service_1.ServerAPI)), 
                    __metadata('design:paramtypes', [Object, Medical_service_1.MedicalSvc, router_1.RouteParams])
                ], Medical);
                return Medical;
            })();
            exports_1("Medical", Medical);
        }
    }
});
//# sourceMappingURL=Medical.component.js.map