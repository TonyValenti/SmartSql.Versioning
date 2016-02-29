System.register(['angular2/core', 'angular2/common', '../models/Person', '../models/eyeColors', '../pipes/gidfull.pipe', '../services/Identity.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, Person_1, eyeColors_1, gidfull_pipe_1, Identity_service_1;
    var PersonDetailDirective;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (Person_1_1) {
                Person_1 = Person_1_1;
            },
            function (eyeColors_1_1) {
                eyeColors_1 = eyeColors_1_1;
            },
            function (gidfull_pipe_1_1) {
                gidfull_pipe_1 = gidfull_pipe_1_1;
            },
            function (Identity_service_1_1) {
                Identity_service_1 = Identity_service_1_1;
            }],
        execute: function() {
            PersonDetailDirective = (function () {
                function PersonDetailDirective(_identitySvc) {
                    this._identitySvc = _identitySvc;
                    this.tempSelectedGidType = "";
                    this.tempObjGovernmentId = null;
                    this.isAddGid = false;
                    this.editingGidIx = -1;
                    // --
                    // state
                    this.saving = false;
                }
                PersonDetailDirective.prototype.ngOnInit = function () {
                    console.log("Working with", this.selectedPerson);
                    this.tempObjGovernmentId = this.selectedPerson.governmentId && JSON.parse(JSON.stringify(this.selectedPerson.governmentId[0]));
                    this.tempSelectedGidType = this.tempObjGovernmentId.name;
                };
                //----------------------------
                //------ Edit Eye Color ------
                //----------------------------
                PersonDetailDirective.prototype.editEyeColor = function (event) {
                    event.preventDefault();
                    this.tempEyeColor = this.selectedPerson.eyeColor;
                    this.eyeColorsArr = [];
                    for (var property in eyeColors_1.eyeColors) {
                        if (eyeColors_1.eyeColors.hasOwnProperty(property)) {
                            this.eyeColorsArr.push(eyeColors_1.eyeColors[property]);
                        }
                    }
                    $('#editEyeModal').modal('show');
                };
                PersonDetailDirective.prototype.changeEyeColor = function (event, ec) {
                    event.preventDefault();
                    this.tempEyeColor = ec;
                };
                PersonDetailDirective.prototype.saveEyeColor = function (event) {
                    var _this = this;
                    if (!this.tempEyeColor) {
                        //No selection
                        return;
                    }
                    this.saving = true;
                    if (this.selectedPerson.eyeColor) {
                        //Edit
                        this._identitySvc.updateEyeColor(this.selectedPerson.instanceId, this.tempEyeColor).subscribe(function (result) {
                            console.log(result);
                            _this.saving = false;
                            $('#editEyeModal').modal('hide');
                        }, function (error) { return alert("Server error. Try again later"); });
                    }
                    else {
                        //Add
                        this._identitySvc.addEyeColor(this.selectedPerson.instanceId, this.tempEyeColor).subscribe(function (result) {
                            console.log(result);
                            _this.saving = false;
                            $('#editEyeModal').modal('hide');
                        }, function (error) { return alert("Server error. Try again later"); });
                    }
                    this.selectedPerson.eyeColor = this.tempEyeColor;
                };
                PersonDetailDirective.prototype.closeEyeModal = function (event) {
                    $('#editEyeModal').modal('hide');
                };
                //-----------------------------
                //------ Edit Hair Color ------
                //-----------------------------
                PersonDetailDirective.prototype.editHairColor = function (event) {
                    event.preventDefault();
                    this.tempHairColor = this.selectedPerson.hairColor;
                    this.hairColorsArr = [];
                    for (var property in eyeColors_1.eyeColors) {
                        if (eyeColors_1.eyeColors.hasOwnProperty(property)) {
                            this.hairColorsArr.push(eyeColors_1.eyeColors[property]);
                        }
                    }
                    $('#editHairModal').modal('show');
                };
                PersonDetailDirective.prototype.changeHairColor = function (event, hc) {
                    event.preventDefault();
                    this.tempHairColor = hc;
                };
                PersonDetailDirective.prototype.saveHairColor = function (event) {
                    var _this = this;
                    if (!this.tempHairColor) {
                        //No selection
                        return;
                    }
                    this.saving = true;
                    if (this.selectedPerson.hairColor) {
                        //Edit
                        this._identitySvc.updateHairColor(this.selectedPerson.instanceId, this.tempHairColor).subscribe(function (result) {
                            console.log(result);
                            _this.saving = false;
                            $('#editHairModal').modal('hide');
                        }, function (error) { return alert("Server error. Try again later"); });
                    }
                    else {
                        //Add
                        this._identitySvc.addHairColor(this.selectedPerson.instanceId, this.tempHairColor).subscribe(function (result) {
                            console.log(result);
                            _this.saving = false;
                            $('#editHairModal').modal('hide');
                        }, function (error) { return alert("Server error. Try again later"); });
                    }
                    this.selectedPerson.hairColor = this.tempHairColor;
                };
                PersonDetailDirective.prototype.closeHairModal = function (event) {
                    $('#editHairModal').modal('hide');
                };
                //---------------------------------
                //------ Edit Government IDs ------
                //---------------------------------
                PersonDetailDirective.prototype.addGID = function (event) {
                    event.preventDefault();
                    this.isAddGid = true;
                    this.tempObjGovernmentId = { name: "", value: "" };
                    this.tempSelectedGidType = "";
                    $('#editGIDModal').modal('show');
                };
                PersonDetailDirective.prototype.editGID = function (event, index) {
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
                };
                //changeGidType(event, gidType) {
                //    event.preventDefault();
                //    this.tempSelectedGidType = gidType;
                //}
                PersonDetailDirective.prototype.deleteGID = function (event, index) {
                    event.preventDefault();
                    this._identitySvc.archiveGovId(this.selectedPerson.governmentId[index].instanceId)
                        .subscribe(function (result) {
                        console.log(result);
                        $('#editGIDModal').modal('hide');
                    }, function (error) { return alert("Server error. Try again later"); });
                    this.selectedPerson.governmentId.splice(index, 1);
                    this.tempObjGovernmentId = null;
                };
                PersonDetailDirective.prototype.saveGid = function (event) {
                    var _this = this;
                    event.preventDefault();
                    this.saving = true;
                    if (this.isAddGid) {
                        //Add
                        this.selectedPerson.governmentId.push(this.tempObjGovernmentId);
                        this._identitySvc.addGovId(this.selectedPerson.instanceId, this.tempObjGovernmentId.value, this.tempObjGovernmentId.name)
                            .subscribe(function (result) {
                            console.log(result);
                            _this.saving = false;
                            $('#editGIDModal').modal('hide');
                        }, function (error) { return alert("Server error. Try again later"); });
                    }
                    else {
                        //Edit
                        this.selectedPerson.governmentId[this.editingGidIx] = this.tempObjGovernmentId;
                        this.tempObjGovernmentId = JSON.parse(JSON.stringify(this.selectedPerson.governmentId[this.editingGidIx]));
                        this._identitySvc.editGovId(this.tempObjGovernmentId.instanceId, this.tempObjGovernmentId.value, this.tempObjGovernmentId.name)
                            .subscribe(function (result) {
                            console.log(result);
                            _this.saving = false;
                            $('#editGIDModal').modal('hide');
                        }, function (error) { return alert("Server error. Try again later"); });
                        $('#editGIDModal').modal('hide');
                    }
                };
                PersonDetailDirective.prototype.closeGidModal = function (event) {
                    event.preventDefault();
                    //this.tempObjGovernmentId = JSON.parse(JSON.stringify(this.selectedPerson.governmentId[0]));
                    $('#editGIDModal').modal('hide');
                };
                //----------------------------
                //------ Edit Ethnicity ------
                //----------------------------
                PersonDetailDirective.prototype.editEthnicity = function (event) {
                    event.preventDefault();
                    $('#editEthnicityModal').modal('show');
                };
                PersonDetailDirective.prototype.saveEthnicity = function (event, newEthnicity) {
                    var _this = this;
                    event.preventDefault();
                    if (this.selectedPerson.ethnicity === newEthnicity) {
                        $('#editEthnicityModal').modal('hide');
                        return;
                    }
                    this.saving = true;
                    if (this.selectedPerson.ethnicity) {
                        //Edit
                        this._identitySvc.updateEthnicity(this.selectedPerson.instanceId, newEthnicity).subscribe(function (result) {
                            console.log(result);
                            _this.saving = false;
                            $('#editEthnicityModal').modal('hide');
                        }, function (error) { return alert("Server error. Try again later"); });
                    }
                    else {
                        //Add
                        this._identitySvc.addEthnicity(this.selectedPerson.instanceId, newEthnicity).subscribe(function (result) {
                            console.log(result);
                            _this.saving = false;
                            $('#editEthnicityModal').modal('hide');
                        }, function (error) { return alert("Server error. Try again later"); });
                    }
                    this.selectedPerson.ethnicity = newEthnicity;
                };
                PersonDetailDirective.prototype.closeEthnicityModal = function (event, txtEthnicity) {
                    event.preventDefault();
                    txtEthnicity.value = this.selectedPerson.ethnicity;
                    $('#editEthnicityModal').modal('hide');
                };
                //--------------------------
                //----- Edit Birth Day -----
                //--------------------------
                PersonDetailDirective.prototype.editBDay = function (event) {
                    event.preventDefault();
                    $('#editBDayModal').modal('show');
                };
                PersonDetailDirective.prototype.saveBday = function (event, newBday) {
                    var _this = this;
                    event.preventDefault();
                    if (this.selectedPerson.dob === newBday) {
                        $('#editBDayModal').modal('hide');
                        return;
                    }
                    this.saving = true;
                    if (this.selectedPerson.dob) {
                        //Edit
                        this._identitySvc.updateDOB(this.selectedPerson.instanceId, newBday).subscribe(function (result) {
                            console.log(result);
                            _this.saving = false;
                            $('#editBDayModal').modal('hide');
                        }, function (error) { return alert("Server error. Try again later"); });
                    }
                    else {
                        //Add
                        this._identitySvc.addDOB(this.selectedPerson.instanceId, newBday).subscribe(function (result) {
                            console.log(result);
                            _this.saving = false;
                            $('#editBDayModal').modal('hide');
                        }, function (error) { return alert("Server error. Try again later"); });
                    }
                    this.selectedPerson.dob = newBday;
                };
                PersonDetailDirective.prototype.closeBdayyModal = function (event, txtDob) {
                    event.preventDefault();
                    txtDob.value = this.selectedPerson.dob;
                    $('#editBDayModal').modal('hide');
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Person_1.Person)
                ], PersonDetailDirective.prototype, "selectedPerson", void 0);
                PersonDetailDirective = __decorate([
                    core_1.Component({
                        selector: 'person-detail',
                        templateUrl: '../app/templates/person-detail.html',
                        pipes: [gidfull_pipe_1.Gidfull],
                        directives: [common_1.FORM_DIRECTIVES],
                        providers: [Identity_service_1.IdentitySvc]
                    }), 
                    __metadata('design:paramtypes', [Identity_service_1.IdentitySvc])
                ], PersonDetailDirective);
                return PersonDetailDirective;
            })();
            exports_1("PersonDetailDirective", PersonDetailDirective);
        }
    }
});
//# sourceMappingURL=PersonDetail.directive.js.map