System.register(['angular2/core', '../services/ServerAPI.service', '../directives/SelectedPerson.directive'], function(exports_1) {
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
    var core_1, ServerAPI_service_1, SelectedPerson_directive_1;
    var Dislikes;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ServerAPI_service_1_1) {
                ServerAPI_service_1 = ServerAPI_service_1_1;
            },
            function (SelectedPerson_directive_1_1) {
                SelectedPerson_directive_1 = SelectedPerson_directive_1_1;
            }],
        execute: function() {
            Dislikes = (function () {
                function Dislikes(_serverAPI) {
                    var _this = this;
                    this._serverAPI = _serverAPI;
                    this.dislikesProps = [];
                    _serverAPI.getAllPeople().subscribe(function (people) {
                        _this.selectedDude = people[0];
                        _this.dislikesData = people[0].dislikes;
                        for (var prop in _this.dislikesData) {
                            if (_this.dislikesData.hasOwnProperty(prop)) {
                                _this.dislikesProps.push([prop]);
                            }
                        }
                    }, function (error) { return alert("Server error. Try again later"); });
                }
                Dislikes.prototype.editDisLikes = function (event, editTypeOfDisLike) {
                    event.preventDefault();
                    this.editTypeOfDisLike = editTypeOfDisLike;
                    $('#editDisLikes').modal('show');
                };
                Dislikes.prototype.saveDisLike = function ($event, newValue) {
                    event.preventDefault();
                    this.dislikesData[this.editTypeOfDisLike] = newValue;
                    $('#editDisLikes').modal('hide');
                };
                Dislikes.prototype.closeDisLikeModal = function (event, txtDisLike) {
                    event.preventDefault();
                    txtDisLike.value = this.dislikesData[this.editTypeOfDisLike];
                    $('#editDisLikes').modal('hide');
                };
                Dislikes.prototype.deleteDisLikes = function ($event, typeOfLike) {
                    event.preventDefault();
                    this.dislikesData[typeOfLike] = "";
                    $('#editDisLikes').modal('hide');
                };
                Dislikes = __decorate([
                    core_1.Component({
                        selector: 'dislikes',
                        templateUrl: '../app/templates/dislikes.html',
                        directives: [SelectedPerson_directive_1.SelectedPersonDirective]
                    }),
                    __param(0, core_1.Inject(ServerAPI_service_1.ServerAPI)), 
                    __metadata('design:paramtypes', [Object])
                ], Dislikes);
                return Dislikes;
            })();
            exports_1("Dislikes", Dislikes);
        }
    }
});
//# sourceMappingURL=Dislikes.component.js.map