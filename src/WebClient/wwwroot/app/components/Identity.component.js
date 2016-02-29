System.register(['angular2/core', '../directives/PersonDetail.directive', '../directives/SelectedPerson.directive', '../services/ServerAPI.service', 'angular2/router'], function(exports_1) {
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
    var core_1, PersonDetail_directive_1, SelectedPerson_directive_1, ServerAPI_service_1, router_1;
    var Identity;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (PersonDetail_directive_1_1) {
                PersonDetail_directive_1 = PersonDetail_directive_1_1;
            },
            function (SelectedPerson_directive_1_1) {
                SelectedPerson_directive_1 = SelectedPerson_directive_1_1;
            },
            function (ServerAPI_service_1_1) {
                ServerAPI_service_1 = ServerAPI_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            Identity = (function () {
                function Identity(_serverAPI, _routeParams) {
                    this._serverAPI = _serverAPI;
                    this._routeParams = _routeParams;
                }
                Identity.prototype.ngOnInit = function () {
                    var _this = this;
                    var instanceId = this._routeParams.get('instanceId');
                    console.log("Looking for Person with InstanceId: " + instanceId);
                    if (!instanceId) {
                        alert("No instanceId provided ... try entering one in the url, like so: http://localhost:3000/Identity?instanceId=22fcf440-d3d5-e511-8d7c-a0b3cc47d18e");
                    }
                    // Make an Ajax call to get person from DB
                    this._serverAPI.getPersonByInstanceId(instanceId).subscribe(function (person) {
                        _this.selectedDude = person;
                    }, function (error) { return alert("Server error. Try again later"); });
                };
                Identity.prototype.selectDude = function (element, dude) {
                    this.activePersonEl = element;
                    this.selectedDude = dude;
                };
                Identity = __decorate([
                    core_1.Component({
                        selector: 'identity',
                        templateUrl: '../app/templates/identityComp.html',
                        directives: [PersonDetail_directive_1.PersonDetailDirective, SelectedPerson_directive_1.SelectedPersonDirective]
                    }),
                    __param(0, core_1.Inject(ServerAPI_service_1.ServerAPI)), 
                    __metadata('design:paramtypes', [Object, router_1.RouteParams])
                ], Identity);
                return Identity;
            })();
            exports_1("Identity", Identity);
        }
    }
});
//# sourceMappingURL=Identity.component.js.map