System.register(['angular2/core', '../services/ServerAPI.service', '../services/Psych.service', '../directives/SelectedPerson.directive', 'angular2/router', '../pipes/religiousFreq.pipe'], function(exports_1) {
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
    var core_1, ServerAPI_service_1, Psych_service_1, SelectedPerson_directive_1, router_1, religiousFreq_pipe_1;
    var PsychologyView;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ServerAPI_service_1_1) {
                ServerAPI_service_1 = ServerAPI_service_1_1;
            },
            function (Psych_service_1_1) {
                Psych_service_1 = Psych_service_1_1;
            },
            function (SelectedPerson_directive_1_1) {
                SelectedPerson_directive_1 = SelectedPerson_directive_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (religiousFreq_pipe_1_1) {
                religiousFreq_pipe_1 = religiousFreq_pipe_1_1;
            }],
        execute: function() {
            PsychologyView = (function () {
                function PsychologyView(_serverAPI, _psychSvc, _routeParams) {
                    this._serverAPI = _serverAPI;
                    this._psychSvc = _psychSvc;
                    this._routeParams = _routeParams;
                    this.religiousFrequencyValues = {
                        Never: 0,
                        SeveralTimesPerYear: 1000,
                        OnceOrTwicePerMonth: 2000,
                        EveryWeek: 3000
                    };
                    this.rfVals = [0, 1000, 2000, 3000];
                    this.rfv = 0;
                    this.isAddLL = true;
                    this.isAddAL = true;
                    var instanceId = this._routeParams.get('instanceId');
                    if (!instanceId) {
                        alert("No instanceId provided ... try entering one in the url, like so: http://localhost:3000/Identity?instanceId=22fcf440-d3d5-e511-8d7c-a0b3cc47d18e");
                    }
                    var self = this;
                    _serverAPI.getPersonByInstanceId(instanceId).subscribe(function (p) {
                        self.selectedDude = p;
                        self.psychology = p.psychology;
                        self.rfv = self.selectedDude.psychology.ReligiousFrequency;
                    }, function (error) { return alert("Server error. Try again later"); });
                }
                //---------------------------
                //------ Edit Religion ------
                //---------------------------
                PsychologyView.prototype.editReligion = function (event) {
                    event.preventDefault();
                    $('#editReligionModal').modal('show');
                };
                PsychologyView.prototype.saveReligion = function (event, newReligion) {
                    event.preventDefault();
                    if (!this.psychology.Religion && newReligion) {
                        //Add
                        this._psychSvc.addReligion(this.selectedDude.instanceId, newReligion).subscribe(function (result) {
                            console.log(result);
                            //this.saving = false;
                            $('#editReligionModal').modal('hide');
                        }, function (error) { return alert("Server error. Try again later"); });
                    }
                    else {
                        //Edit
                        this._psychSvc.updateReligion(this.selectedDude.instanceId, newReligion).subscribe(function (result) {
                            console.log(result);
                            //this.saving = false;
                            $('#editReligionModal').modal('hide');
                        }, function (error) { return alert("Server error. Try again later"); });
                    }
                    this.psychology.Religion = newReligion;
                    $('#editReligionModal').modal('hide');
                };
                PsychologyView.prototype.closeRelgionModal = function (event, txtReligion) {
                    event.preventDefault();
                    txtReligion.value = this.psychology.Religion;
                    $('#editReligionModal').modal('hide');
                };
                //---------------------------
                //------ Edit Politics ------
                //---------------------------
                PsychologyView.prototype.editPolAff = function (event) {
                    event.preventDefault();
                    $('#editPolAffModal').modal('show');
                };
                PsychologyView.prototype.savePolAff = function (event, newPolAff) {
                    event.preventDefault();
                    if (!this.psychology.PoliticalAffiliation && newPolAff) {
                        //Add
                        this._psychSvc.addPoliticAff(this.selectedDude.instanceId, newPolAff).subscribe(function (result) {
                            console.log(result);
                            //this.saving = false;
                            $('#editPolAffModal').modal('hide');
                        }, function (error) { return alert("Server error. Try again later"); });
                    }
                    else {
                        //Edit
                        this._psychSvc.updatePoliticAff(this.selectedDude.instanceId, newPolAff).subscribe(function (result) {
                            console.log(result);
                            //this.saving = false;
                            $('#editPolAffModal').modal('hide');
                        }, function (error) { return alert("Server error. Try again later"); });
                    }
                    this.psychology.PoliticalAffiliation = newPolAff;
                    $('#editPolAffModal').modal('hide');
                };
                PsychologyView.prototype.closePolAff = function (event, txtPolAff) {
                    event.preventDefault();
                    txtPolAff.value = this.psychology.PoliticalAffiliation;
                    $('#editPolAffModal').modal('hide');
                };
                //-----------------------------
                //------ Edit Rel. Freq. ------
                //-----------------------------
                PsychologyView.prototype.changeRf = function (event, rf) {
                    event.preventDefault();
                    this.rfv = rf;
                };
                PsychologyView.prototype.editRelFreq = function (event) {
                    event.preventDefault();
                    $('#editRelFreqModal').modal('show');
                };
                PsychologyView.prototype.saveRelFreq = function (event) {
                    event.preventDefault();
                    if (!this.psychology.ReligiousFrequency && this.rfv) {
                        //Add
                        this._psychSvc.addReligiousFreq(this.selectedDude.instanceId, this.rfv).subscribe(function (result) {
                            console.log(result);
                            //this.saving = false;
                            $('#editRelFreqModal').modal('hide');
                        }, function (error) { return alert("Server error. Try again later"); });
                    }
                    else {
                        //Edit
                        this._psychSvc.updateReligiousFreq(this.selectedDude.instanceId, this.rfv).subscribe(function (result) {
                            console.log(result);
                            //this.saving = false;
                            $('#editRelFreqModal').modal('hide');
                        }, function (error) { return alert("Server error. Try again later"); });
                    }
                    this.psychology.ReligiousFrequency = this.rfv;
                    $('#editRelFreqModal').modal('hide');
                };
                PsychologyView.prototype.closeRelFreq = function (event, txtRelFreq) {
                    event.preventDefault();
                    $('#editRelFreqModal').modal('hide');
                };
                PsychologyView.prototype.changell = function (event) {
                    event.preventDefault();
                    this.isAddLL = this.psychology.LoveLanguage.wof === null &&
                        this.psychology.LoveLanguage.aos === null &&
                        this.psychology.LoveLanguage.rg === null &&
                        this.psychology.LoveLanguage.qt === null &&
                        this.psychology.LoveLanguage.pt === null;
                    var sf = (function () {
                        console.log(JSON.stringify(this.psychology.LoveLanguage));
                        var mappedLL = {
                            HasWordsOfAffirmation: this.psychology.LoveLanguage.wof,
                            HasActsOfService: this.psychology.LoveLanguage.aos,
                            HasReceivingGifts: this.psychology.LoveLanguage.rg,
                            HasQualityTime: this.psychology.LoveLanguage.qt,
                            HasPhysicalTouch: this.psychology.LoveLanguage.pt
                        };
                        if (this.isAddLL) {
                            //Add
                            this._psychSvc.addLL(this.selectedDude.instanceId, mappedLL).subscribe(function (result) {
                                console.log(result);
                            }, function (error) { return alert("Server error. Try again later"); });
                        }
                        else {
                            //Update
                            this._psychSvc.updateLL(this.selectedDude.instanceId, mappedLL).subscribe(function (result) {
                                console.log(result);
                            }, function (error) { return alert("Server error. Try again later"); });
                        }
                    }).bind(this);
                    setTimeout(sf, 50);
                };
                PsychologyView.prototype.changeAl = function (event) {
                    event.preventDefault();
                    this.isAddAL = this.psychology.AngerLanguage.r === null &&
                        this.psychology.AngerLanguage.pa === null &&
                        this.psychology.AngerLanguage.av === null &&
                        this.psychology.AngerLanguage.d === null;
                    var sf = (function () {
                        console.log(JSON.stringify(this.psychology.AngerLanguage));
                        var mappedAL = {
                            HasReactive: this.psychology.AngerLanguage.r,
                            HasPassiveAggressive: this.psychology.AngerLanguage.pa,
                            HasAvoidant: this.psychology.AngerLanguage.av,
                            HasDirect: this.psychology.AngerLanguage.d
                        };
                        if (this.isAddAL) {
                            //Add
                            this._psychSvc.addAL(this.selectedDude.instanceId, mappedAL).subscribe(function (result) {
                                console.log(result);
                            }, function (error) { return alert("Server error. Try again later"); });
                        }
                        else {
                            //Update
                            this._psychSvc.updateAL(this.selectedDude.instanceId, mappedAL).subscribe(function (result) {
                                console.log(result);
                            }, function (error) { return alert("Server error. Try again later"); });
                        }
                    }).bind(this);
                    setTimeout(sf, 50);
                };
                PsychologyView = __decorate([
                    core_1.Component({
                        selector: 'psychology',
                        templateUrl: '../app/templates/psych.html',
                        directives: [SelectedPerson_directive_1.SelectedPersonDirective],
                        providers: [Psych_service_1.PsychSvc],
                        pipes: [religiousFreq_pipe_1.religiousFreq]
                    }),
                    __param(0, core_1.Inject(ServerAPI_service_1.ServerAPI)), 
                    __metadata('design:paramtypes', [Object, Psych_service_1.PsychSvc, router_1.RouteParams])
                ], PsychologyView);
                return PsychologyView;
            })();
            exports_1("PsychologyView", PsychologyView);
        }
    }
});
//# sourceMappingURL=PsychologyView.component.js.map