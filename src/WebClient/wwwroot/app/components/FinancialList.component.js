System.register(['angular2/core', '../services/ServerAPI.service', '../services/Finance.service', '../directives/SelectedPerson.directive', '../models/Financial', 'angular2/router'], function(exports_1) {
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
    var core_1, ServerAPI_service_1, Finance_service_1, SelectedPerson_directive_1, Financial_1, router_1;
    var FinancialList;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ServerAPI_service_1_1) {
                ServerAPI_service_1 = ServerAPI_service_1_1;
            },
            function (Finance_service_1_1) {
                Finance_service_1 = Finance_service_1_1;
            },
            function (SelectedPerson_directive_1_1) {
                SelectedPerson_directive_1 = SelectedPerson_directive_1_1;
            },
            function (Financial_1_1) {
                Financial_1 = Financial_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            FinancialList = (function () {
                function FinancialList(_serverAPI, _finSvc, _routeParams) {
                    var _this = this;
                    this._serverAPI = _serverAPI;
                    this._finSvc = _finSvc;
                    this._routeParams = _routeParams;
                    this.selectedIndex = -1;
                    this.tempFinancial = new Financial_1.Financial("", "", "", "", "");
                    var instanceId = this._routeParams.get('instanceId');
                    if (!instanceId) {
                        alert("No instanceId provided ... try entering one in the url, like so: http://localhost:3000/Identity?instanceId=22fcf440-d3d5-e511-8d7c-a0b3cc47d18e");
                    }
                    var self = this;
                    _serverAPI.getPersonByInstanceId(instanceId).subscribe(function (p) {
                        self.selectedDude = p;
                        self.financialArr = _this.selectedDude.financials;
                    }, function (error) { return alert("Server error. Try again later"); });
                }
                FinancialList.prototype.editFinancial = function (event, i, isAddFinancial) {
                    event.preventDefault();
                    this.selectedIndex = i;
                    if (isAddFinancial) {
                        this.tempFinancial = new Financial_1.Financial("", "", "", "", "");
                    }
                    else {
                        this.tempFinancial = new Financial_1.Financial(this.financialArr[i].Name, this.financialArr[i].AccountNumber, this.financialArr[i].Description, this.financialArr[i].Institution, this.financialArr[i].InstanceId);
                    }
                    $('#editFinancialModal').modal("show");
                };
                FinancialList.prototype.saveFinancial = function (event) {
                    event.preventDefault();
                    if (this.selectedIndex === -1) {
                        // is Add
                        var fin = new Financial_1.Financial(this.tempFinancial.AccountName, this.tempFinancial.AccountNumber, this.tempFinancial.AccountDescription, this.tempFinancial.AccountInstitution, "");
                        this.financialArr.push(fin);
                        this._finSvc.addFinancial(this.selectedDude.instanceId, fin).subscribe(function (result) {
                            console.log(result);
                            //this.saving = false;
                            $('#editFinancialModal').modal('hide');
                        }, function (error) { return alert("Server error. Try again later"); });
                    }
                    else {
                        // is Edit
                        if (this.financialArr[this.selectedIndex] !== this.tempFinancial) {
                            this.financialArr[this.selectedIndex] = this.tempFinancial;
                            this._finSvc.updateFinancial(this.tempFinancial.InstanceId, this.tempFinancial).subscribe(function (result) {
                                console.log(result);
                                //this.saving = false;
                                $('#editFinancialModal').modal('hide');
                            }, function (error) { return alert("Server error. Try again later"); });
                        }
                    }
                    $('#editFinancialModal').modal("hide");
                };
                FinancialList.prototype.closeFinancialEdit = function (event) {
                    event.preventDefault();
                    this.tempFinancial = {};
                    $('#editFinancialModal').modal("hide");
                };
                FinancialList.prototype.deleteFinancial = function (event, index) {
                    event.preventDefault();
                    this._finSvc.archiveFinancial(this.financialArr[index].InstanceId).subscribe(function (result) {
                        console.log(result);
                    }, function (error) { return alert("Server error. Try again later"); });
                    this.financialArr.splice(index, 1);
                    $('#editFinancialModal').modal("hide");
                };
                FinancialList = __decorate([
                    core_1.Component({
                        selector: 'financial',
                        templateUrl: '../app/templates/financial.html',
                        directives: [SelectedPerson_directive_1.SelectedPersonDirective],
                        providers: [Finance_service_1.FinanceSvc]
                    }),
                    __param(0, core_1.Inject(ServerAPI_service_1.ServerAPI)), 
                    __metadata('design:paramtypes', [Object, Finance_service_1.FinanceSvc, router_1.RouteParams])
                ], FinancialList);
                return FinancialList;
            })();
            exports_1("FinancialList", FinancialList);
        }
    }
});
//# sourceMappingURL=FinancialList.component.js.map