System.register(['angular2/core', '../services/ServerAPI.service', '../services/Education.service', '../directives/SelectedPerson.directive', 'angular2/router', '../pipes/eduLevel.pipe'], function(exports_1) {
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
    var core_1, ServerAPI_service_1, Education_service_1, SelectedPerson_directive_1, router_1, eduLevel_pipe_1;
    var EducationView;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ServerAPI_service_1_1) {
                ServerAPI_service_1 = ServerAPI_service_1_1;
            },
            function (Education_service_1_1) {
                Education_service_1 = Education_service_1_1;
            },
            function (SelectedPerson_directive_1_1) {
                SelectedPerson_directive_1 = SelectedPerson_directive_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (eduLevel_pipe_1_1) {
                eduLevel_pipe_1 = eduLevel_pipe_1_1;
            }],
        execute: function() {
            EducationView = (function () {
                function EducationView(_serverAPI, _eduSvc, _routeParams) {
                    this._serverAPI = _serverAPI;
                    this._eduSvc = _eduSvc;
                    this._routeParams = _routeParams;
                    this.selectedCert = { Name: "", StartDate: "", EndDate: "" };
                    this.EducationLevelValue = {
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
                    this.elvlVals = [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000];
                    this.elvlv = 0;
                    var instanceId = this._routeParams.get('instanceId');
                    if (!instanceId) {
                        alert("No instanceId provided ... try entering one in the url, like so: http://localhost:3000/Identity?instanceId=22fcf440-d3d5-e511-8d7c-a0b3cc47d18e");
                    }
                    var self = this;
                    _serverAPI.getPersonByInstanceId(instanceId).subscribe(function (p) {
                        self.selectedDude = p;
                        self.certifications = p.education.Certification || [];
                        self.elvlv = p.education.EducationLevel;
                    }, function (error) { return alert("Server error. Try again later"); });
                }
                EducationView.prototype.saveCertification = function (event, txtName, txtStart, txtEnd) {
                    event.preventDefault();
                    if (this.isAdd) {
                        var newCertification = { Name: txtName.value, StartDate: txtStart.value, EndDate: txtEnd.value };
                        this.certifications.push(newCertification);
                        txtName.value = "";
                        txtStart.value = "";
                        txtEnd.value = "";
                        this._eduSvc.addCertificate(this.selectedDude.instanceId, newCertification).subscribe(function (result) {
                            console.log(result);
                            //this.saving = false;
                            $('#editFinancialModal').modal('hide');
                        }, function (error) { return alert("Server error. Try again later"); });
                    }
                    else {
                        this.selectedCert.Name = txtName.value;
                        this.selectedCert.StartDate = txtStart.value;
                        this.selectedCert.EndDate = txtEnd.value;
                    }
                    $('#editCertification').modal('hide');
                };
                EducationView.prototype.editAddCertification = function (event, index) {
                    event.preventDefault();
                    if (index === -1) {
                        this.isAdd = true;
                        this.selectedCert = { Name: "", StartDate: "", EndDate: "" };
                    }
                    else {
                        this.isAdd = false;
                        //this.origCert = JSON.parse(JSON.stringify(this.certifications[index]));
                        this.selectedCert = this.certifications[index];
                    }
                    $('#editCertification').modal('show');
                };
                EducationView.prototype.closeCertModal = function (event, txtName, txtStart, txtEnd) {
                    event.preventDefault();
                    if (this.isAdd) {
                        txtName.value = "";
                        txtStart.value = "";
                        txtEnd.value = "";
                    }
                    else {
                        txtName.value = this.selectedCert.Name;
                        txtStart.value = this.selectedCert.StartDate;
                        txtEnd.value = this.selectedCert.EndDate;
                    }
                    //this.selectedCert = this.origCert;
                    $('#editCertification').modal('show');
                };
                EducationView.prototype.deleteCertification = function (event, index) {
                    event.preventDefault();
                    this._eduSvc.archiveCertificate(this.certifications[index].InstanceId).subscribe(function (result) {
                        console.log(result);
                    }, function (error) { return alert("Server error. Try again later"); });
                    this.certifications.splice(index, 1);
                };
                //---------------------------
                //------ Edit Edu Level -----
                //---------------------------
                EducationView.prototype.editEduLevel = function (event) {
                    event.preventDefault();
                    $('#editEduLevelModal').modal('show');
                };
                EducationView.prototype.changeEduLvl = function (event, elv) {
                    event.preventDefault();
                    this.elvlv = elv;
                };
                EducationView.prototype.saveEduLevel = function (event) {
                    event.preventDefault();
                    if (!this.selectedDude.education.EducationLevel && this.elvlv) {
                        //Add
                        this._eduSvc.addEducationLvl(this.selectedDude.instanceId, this.elvlv).subscribe(function (result) {
                            console.log(result);
                            //this.saving = false;
                            $('#editRelFreqModal').modal('hide');
                        }, function (error) { return alert("Server error. Try again later"); });
                    }
                    else {
                        //Edit
                        this._eduSvc.updateEducationLvl(this.selectedDude.instanceId, this.elvlv).subscribe(function (result) {
                            console.log(result);
                            //this.saving = false;
                            $('#editRelFreqModal').modal('hide');
                        }, function (error) { return alert("Server error. Try again later"); });
                    }
                    this.selectedDude.education.EducationLevel = this.elvlv;
                    $('#editEduLevelModal').modal('hide');
                };
                EducationView.prototype.closeEduLevel = function (event) {
                    event.preventDefault();
                    $('#editEduLevelModal').modal('hide');
                };
                EducationView = __decorate([
                    core_1.Component({
                        selector: 'edu',
                        templateUrl: '../app/templates/education.html',
                        directives: [SelectedPerson_directive_1.SelectedPersonDirective],
                        providers: [Education_service_1.EducationSvc],
                        pipes: [eduLevel_pipe_1.eduLevel]
                    }),
                    __param(0, core_1.Inject(ServerAPI_service_1.ServerAPI)), 
                    __metadata('design:paramtypes', [Object, Education_service_1.EducationSvc, router_1.RouteParams])
                ], EducationView);
                return EducationView;
            })();
            exports_1("EducationView", EducationView);
        }
    }
});
//# sourceMappingURL=EducationView.component.js.map